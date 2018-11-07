let gl = null;
let canvas = null;
let container = null;
let glProgram = null;
let fragmentShader = null;
let vertexShader = null;

let vertexPositionAttribute = null;
let trianglesVerticesBuffer = null;
let vertexColorAttribute = null;
let trianglesColorBuffer = null;

let angle = 0.0;

window.addEventListener('load', initWebGL);

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
    setupBuffers();
    (function animLoop() {
      setupWebGL();
      setupDynamicBuffers();
      drawScene();
      requestAnimationFrame(animLoop);
    })();
  }
}

function setupWebGL() {
  // set the clear color to a shade of green
  gl.clearColor(0.1, 0.5, 0.1, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  gl.viewport(0, 0, canvas.width, canvas.height);
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
    attribute vec3 aVertexColor;
    
    varying highp vec4 vColor;
    
    void main(void) {
      gl_Position = vec4(aVertexPosition, 1.0);
      vColor = vec4(aVertexColor, 1.0);
    }
  `;
}

function fragmentShaderSource() {
  return `
    varying highp vec4 vColor;
    
    void main(void) {
      gl_FragColor = vColor;
    }
  `;
}

function setupBuffers() {
  const triangleVerticesColors = [
    // left triangle
    1.0, 0.0, 0.0,
    1.0, 1.0, 1.0,
    1.0, 0.0, 0.0,

    // right triangle
    0.0, 0.0, 1.0,
    1.0, 1.0, 1.0,
    0.0, 0.0, 1.0,
  ];

  trianglesColorBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, trianglesColorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleVerticesColors), gl.STATIC_DRAW);
}

function setupDynamicBuffers() {
  // limit translation amount to -0.5 to 0.5
  const xTranslation = Math.sin(angle) / 2.0;

  const triangleVertices = [
    // left triangle
    -0.5 + xTranslation, 0.5, 0.0,
    0.0 + xTranslation, 0.0, 0.0,
    -0.5 + xTranslation, -0.5, 0.0,

    // right triangle
    0.5 + xTranslation, 0.5, 0.0,
    0.0 + xTranslation, 0.0, 0.0,
    0.5 + xTranslation, -0.5, 0.0,
  ];
  angle += 0.01;

  trianglesVerticesBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, trianglesVerticesBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleVertices), gl.DYNAMIC_DRAW);
}

function drawScene() {
  vertexPositionAttribute = gl.getAttribLocation(glProgram, 'aVertexPosition');
  gl.enableVertexAttribArray(vertexPositionAttribute);
  gl.bindBuffer(gl.ARRAY_BUFFER, trianglesVerticesBuffer);
  gl.vertexAttribPointer(vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);

  vertexColorAttribute = gl.getAttribLocation(glProgram, 'aVertexColor');
  gl.enableVertexAttribArray(vertexColorAttribute);
  gl.bindBuffer(gl.ARRAY_BUFFER, trianglesColorBuffer);
  gl.vertexAttribPointer(vertexColorAttribute, 3, gl.FLOAT, false, 0, 0);

  gl.drawArrays(gl.TRIANGLES, 0, 6);
}
