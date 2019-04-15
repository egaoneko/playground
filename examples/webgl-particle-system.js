import { Particle } from './utils/graphics/webgl/object-utils';

let gl = null;
let canvas = null;
let container = null;
let glProgram = null;
let fragmentShader = null;
let vertexShader = null;

let vertexPositionAttribute = null;
let vertexColorAttribute = null;
let particles = [];
let positions = [];
let colors = [];

let pointLocationBuffer = null;
let pointColorBuffer = null;

let pMatrix = mat4.create();
let mvMatrix = mat4.create();
let normalMatrix = mat3.create();

let paused = false;

let NUM_PARTICLES = 10000;

const volume = document.querySelector('#volume');
const volumeLabel = document.querySelector('#volume_label');

volume.value = NUM_PARTICLES;
changeParticleSize(NUM_PARTICLES);

volume.addEventListener('change', (e) => {
  changeParticleSize(e.target.value);
});

function changeParticleSize(value) {
  NUM_PARTICLES = value;
  volumeLabel.innerHTML = value;

  setupParticles(NUM_PARTICLES);
}

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
    setupParticles(NUM_PARTICLES);
    getMatrixUniforms();

    vertexPositionAttribute = gl.getAttribLocation(glProgram, 'aVertexPosition');
    vertexColorAttribute = gl.getAttribLocation(glProgram, 'aVertexColor');
    gl.enableVertexAttribArray(vertexPositionAttribute);
    gl.enableVertexAttribArray(vertexColorAttribute);

    pointLocationBuffer = gl.createBuffer();
    pointColorBuffer = gl.createBuffer();

    (function animLoop() {

      if (!paused) {
        setupWebGL();

        adjustParticles();
        setBufferData();
        setMatrixUniforms();
        drawScene();
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
  mat4.translate(mvMatrix, mvMatrix, [0.0, 0.0, -4.0]);

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
    attribute vec3 aVertexPosition;
    attribute vec4 aVertexColor;

    uniform mat4 uPMatrix;
    uniform mat4 uMVMatrix;

    varying vec4 color;

    void main(void) {
      color = aVertexColor;
      gl_PointSize = 3.0;
      gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition.xyz, 1.0);
    }
  `;
}

function fragmentShaderSource() {
  return `
    varying highp vec4 color;

    void main(void) {   
      gl_FragColor = color;
    }
  `;
}

function drawScene() {
  gl.bindBuffer(gl.ARRAY_BUFFER, pointLocationBuffer);
  gl.vertexAttribPointer(vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
  gl.bindBuffer(gl.ARRAY_BUFFER, pointColorBuffer);
  gl.vertexAttribPointer(vertexColorAttribute, 4, gl.FLOAT, false, 0, 0);
  gl.drawArrays(gl.POINTS, 0, positions.length / 3);
}

function getMatrixUniforms() {
  glProgram.pMatrixUniform = gl.getUniformLocation(glProgram, 'uPMatrix');
  glProgram.mvMatrixUniform = gl.getUniformLocation(glProgram, 'uMVMatrix');
}

function setMatrixUniforms() {
  gl.uniformMatrix4fv(glProgram.pMatrixUniform, false, pMatrix);
  gl.uniformMatrix4fv(glProgram.mvMatrixUniform, false, mvMatrix);
}

function setupParticles(num) {
  particles = [];
  for (let n = 0; n < num; ++n) {
    particles[n] = new Particle();
  }

  positions = [];
  for (let n = 0; n < particles.length; ++n) {
    positions.push(particles[n].position[0]);
    positions.push(particles[n].position[1]);
    positions.push(particles[n].position[2]);
  }

  colors = [];
  for (let n = 0; n < particles.length; ++n) {
    colors.push(particles[n].color[0]);
    colors.push(particles[n].color[1]);
    colors.push(particles[n].color[2]);
    colors.push(particles[n].color[3]);
  }
}

function adjustParticles() {
  for (let n = 0; n < particles.length; ++n) {
    particles[n].update();
  }

  positions = [];
  for (let n = 0; n < particles.length; ++n) {
    positions.push(particles[n].position[0]);
    positions.push(particles[n].position[1]);
    positions.push(particles[n].position[2]);
  }

  colors = [];
  for (let n = 0; n < particles.length; ++n) {
    colors.push(particles[n].color[0]);
    colors.push(particles[n].color[1]);
    colors.push(particles[n].color[2]);
    colors.push(particles[n].color[3]);
  }
}

function setBufferData() {
  gl.bindBuffer(gl.ARRAY_BUFFER, pointLocationBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
  pointLocationBuffer.itemSize = 3;
  pointLocationBuffer.numItems = positions.length / 3;
  gl.bindBuffer(gl.ARRAY_BUFFER, pointColorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
  pointColorBuffer.itemSize = 4;
  pointColorBuffer.numItems = colors.length / 4;
}
