let gl = null;
let canvas = null;
let glProgram = null;
let fragmentShader = null;
let vertexShader = null;

let vertexPositionAttribute = null;
let trianglesVerticesBuffer = null;
let vertexColorAttribute = null;
let trianglesColorBuffer = null;
let triangleVerticesIndexBuffer = null;

let pMatrix = mat4.create();
let mvMatrix = mat4.create();

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
  }

  if (gl) {
    initShaders();
    setupBuffers();
    getMatrixUniforms();
    (function animLoop() {
      setupWebGL();
      setMatrixUniforms();
      drawScene();
      requestAnimationFrame(animLoop);
    })();
  }
}

function setupWebGL() {
  // set the clear color to a shade of green
  gl.clearColor(0.1, 0.5, 0.1, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.enable(gl.DEPTH_TEST);

  gl.viewport(0, 0, canvas.width, canvas.height);
  mat4.perspective(pMatrix, 45, canvas.width / canvas.height, 0.1, 100.0);
  mat4.identity(mvMatrix);
  mat4.translate(mvMatrix, mvMatrix, [-1.0, -1.0, -7.0]);
  mat4.rotate(mvMatrix, mvMatrix, angle, [0.0, 1.0, 0.0]);
  angle += 0.01;
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

    uniform mat4 uPMatrix;    
    uniform mat4 uMVMatrix;
    
    varying highp vec4 vColor;
    
    void main(void) {
      gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
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
    // front face
    0.0, 0.0, 1.0,
    1.0, 1.0, 1.0,
    0.0, 0.0, 1.0,
    0.0, 0.0, 1.0,
    0.0, 0.0, 1.0,
    1.0, 1.0, 1.0,

    // real face
    0.0, 1.0, 1.0,
    1.0, 1.0, 1.0,
    0.0, 1.0, 1.0,
    0.0, 1.0, 1.0,
    0.0, 1.0, 1.0,
    1.0, 1.0, 1.0,
  ];

  trianglesColorBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, trianglesColorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleVerticesColors), gl.STATIC_DRAW);

  // 12 vertices
  const triangleVertices = [
    // front face
    // bottom left to right, to top
    0.0, 0.0, 0.0,
    1.0, 0.0, 0.0,
    2.0, 0.0, 0.0,
    0.5, 1.0, 0.0,
    1.5, 1.0, 0.0,
    1.0, 2.0, 0.0,

    // rear face
    0.0, 0.0, -2.0,
    1.0, 0.0, -2.0,
    2.0, 0.0, -2.0,
    0.5, 1.0, -2.0,
    1.5, 1.0, -2.0,
    1.0, 2.0, -2.0,
  ];
  trianglesVerticesBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, trianglesVerticesBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleVertices), gl.STATIC_DRAW);

  // setup vertices buffer
  // 18 triangles
  const triangleVertexIndices = [
    // front face
    0, 1, 3,
    1, 3, 4,
    1, 2, 4,
    3, 4, 5,

    // rear face
    6, 7, 9,
    7, 9, 10,
    7, 8, 10,
    9, 10, 11,

    // left face
    0, 3, 6,
    3, 6, 9,
    3, 5, 9,
    5, 9, 11,

    // right face
    2, 4, 8,
    4, 8, 10,
    4, 5, 10,
    5, 10, 11,

    // bottom face
    0, 6, 8,
    8, 2, 0,
  ];
  triangleVerticesIndexBuffer = gl.createBuffer();
  triangleVerticesIndexBuffer.numberVertexPoints = triangleVertexIndices.length;
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, triangleVerticesIndexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(triangleVertexIndices), gl.STATIC_DRAW);
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

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, triangleVerticesIndexBuffer);
  gl.drawElements(gl.TRIANGLES, triangleVerticesIndexBuffer.numberVertexPoints, gl.UNSIGNED_SHORT, 0);
}

function getMatrixUniforms() {
  glProgram.pMatrixUniform = gl.getUniformLocation(glProgram, 'uPMatrix');
  glProgram.mvMatrixUniform = gl.getUniformLocation(glProgram, 'uMVMatrix');
}

function setMatrixUniforms() {
  gl.uniformMatrix4fv(glProgram.pMatrixUniform, false, pMatrix);
  gl.uniformMatrix4fv(glProgram.mvMatrixUniform, false, mvMatrix);
}
