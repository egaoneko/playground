let gl = null;
let canvas = null;
let container = null;
let glProgram = null;
let fragmentShader = null;
let vertexShader = null;

let vertexPositionAttribute = null;
let vertexVelocityAttribute = null;
let particles = []; //x,y,z,age, velx, vely, size
const PARTICLE_COMPONENTS = 7;

let pointBuffer = null;

let pMatrix = mat4.create();
let mvMatrix = mat4.create();
let normalMatrix = mat3.create();

let paused = false;

const MAX_NUMBER_OF_PARTICLES = 10000;
const MAX_SPAWN_PER_FRAME = 10;
const LIFESPAN = 240.0;
const START_Y = -10.0;

let currentNumberParticles = 0;
let d = new Date();

window.addEventListener('load', initWebGL);
document.addEventListener('keyup', (evt) => {
  switch (evt.keyCode) {
    case 80: // 'p'
      paused = !paused;
      break;
  }
});

function initWebGL() {
  canvas = document.querySelector('#canvas');
  container = document.querySelector('#container');
  canvas.width = container.clientWidth;
  canvas.height = container.clientHeight;

  try {
    gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  } catch (e) {
    console.error(e);
  }

  if (gl) {
    initShaders();

    getMatrixUniforms();

    vertexPositionAttribute = gl.getAttribLocation(glProgram, 'aVertexPosition');
    vertexVelocityAttribute = gl.getAttribLocation(glProgram, 'aVertexVelocity');
    gl.enableVertexAttribArray(vertexPositionAttribute);
    gl.enableVertexAttribArray(vertexVelocityAttribute);

    adjustParticles();

    pointBuffer = gl.createBuffer();

    (function animLoop() {

      if (!paused) {
        setupWebGL();
        setMatrixUniforms();
        drawScene();
        adjustParticles();
      }

      requestAnimationFrame(animLoop);
    })();
  }
}

function setupWebGL() {
  // set the clear color to a shade of green
  gl.clearColor(0.1, 0.1, 0.1, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.enable(gl.DEPTH_TEST);
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

  gl.viewport(0, 0, canvas.width, canvas.height);
  mat4.perspective(pMatrix, 45, canvas.width / canvas.height, 0.1, 100.0);
  mat4.identity(mvMatrix);
  mat4.translate(mvMatrix, mvMatrix, [0.0, -5.0, -30.0]);

  const invertedMatrix = mat3.create();
  mat3.fromMat4(invertedMatrix, mvMatrix);
  mat3.invert(normalMatrix, invertedMatrix);
  mat3.transpose(normalMatrix, normalMatrix);
}

function initShaders() {
  // get shader source
  const vsSource = vertexShaderSource();
  const fsSource = fragmentShaderSource();

  // compile shaders
  vertexShader = makeShader(vsSource, gl.VERTEX_SHADER);
  fragmentShader = makeShader(fsSource, gl.FRAGMENT_SHADER);

  // create program
  glProgram = gl.createProgram();

  // attach and link shaders to the program
  gl.attachShader(glProgram, vertexShader);
  gl.attachShader(glProgram, fragmentShader);
  gl.linkProgram(glProgram);

  if (!gl.getProgramParameter(glProgram, gl.LINK_STATUS)) {
    alert('Unable to initialize the shader program.');
  }

  // use program
  gl.useProgram(glProgram);
}

function makeShader(source, type) {
  // compile the shader
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    alert(`Error compiling shader: ${gl.getShaderInfoLog(shader)}`);
  }

  return shader;
}

function vertexShaderSource() {
  return `
    attribute vec4 aVertexPosition;
    attribute vec4 aVertexVelocity;
    
    uniform mat4 uPMatrix;
    uniform mat4 uMVMatrix;
    
    varying highp float parametricTime;
    
    void main(void) {
      parametricTime = (aVertexPosition.w/100.0);
      
      vec3 currentPosition = vec3(
        aVertexPosition.x + (aVertexVelocity.x * parametricTime),
        aVertexPosition.y + (aVertexVelocity.y * parametricTime),
        aVertexPosition.z + (aVertexVelocity.x * parametricTime)
      );
      
      currentPosition.y -= 4.9*parametricTime*parametricTime;
      
      gl_Position = uPMatrix * uMVMatrix * vec4(currentPosition.xyz, 1.0);
      gl_PointSize = aVertexVelocity.z;
    }
  `;
}

function fragmentShaderSource() {
  return `
    varying highp float parametricTime;
    
    void main(void) {   
      gl_FragColor = vec4(parametricTime*.8, parametricTime*.8, 1.0, 0.9-(parametricTime*.4));
    }
  `;
}

function drawScene() {
  gl.uniform1f(glProgram.timeUniform, d.getTime());

  pointBuffer.itemSize = PARTICLE_COMPONENTS;
  pointBuffer.numItems = currentNumberParticles;
  gl.bindBuffer(gl.ARRAY_BUFFER, pointBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(particles), gl.STATIC_DRAW);
  gl.vertexAttribPointer(
    vertexPositionAttribute,
    4,
    gl.FLOAT,
    false,
    PARTICLE_COMPONENTS * Float32Array.BYTES_PER_ELEMENT,
    0 * Float32Array.BYTES_PER_ELEMENT
  );
  gl.vertexAttribPointer(
    vertexVelocityAttribute,
    3,
    gl.FLOAT,
    false,
    PARTICLE_COMPONENTS * Float32Array.BYTES_PER_ELEMENT,
    4 * Float32Array.BYTES_PER_ELEMENT
  );
  gl.drawArrays(gl.POINTS, 0, currentNumberParticles);
}

function getMatrixUniforms() {
  glProgram.pMatrixUniform = gl.getUniformLocation(glProgram, 'uPMatrix');
  glProgram.mvMatrixUniform = gl.getUniformLocation(glProgram, 'uMVMatrix');
  glProgram.timeUniform = gl.getUniformLocation(glProgram, 'uTime');
}

function setMatrixUniforms() {
  gl.uniformMatrix4fv(glProgram.pMatrixUniform, false, pMatrix);
  gl.uniformMatrix4fv(glProgram.mvMatrixUniform, false, mvMatrix);
}


function adjustParticles() {
  const particlesOld = particles.slice(); //copy
  particles = [];

  for (let i = 0; i < particlesOld.length; i += PARTICLE_COMPONENTS) {
    // remove old particles
    // if past lifespan or below the start position, do not read particle
    if ((particlesOld[i + 3] < LIFESPAN) &&
      (particlesOld[i + 1] > (START_Y - 0.001))
    ) {
      const old = particlesOld.slice(i, i + PARTICLE_COMPONENTS);
      old[3] += 1.0; //age
      particles = particles.concat(old);
    }
  }
  currentNumberParticles = particles.length / PARTICLE_COMPONENTS;

  // spawn new particles
  if (currentNumberParticles + MAX_SPAWN_PER_FRAME < MAX_NUMBER_OF_PARTICLES) {
    for (let n = 0; n < MAX_SPAWN_PER_FRAME; ++n) {
      particles.push(.5 * Math.random() - .25); //X
      particles.push(START_Y); //Y
      particles.push(Math.random() - .5); //Z
      particles.push(0.0); //age
      particles.push(5.0 * Math.random() - 10.0); //velX
      particles.push(14.0 + 12.0 * Math.random()); //velY
      particles.push(0.5 + Math.random() * 4.0); //size
      ++currentNumberParticles;
    }
  }
}
