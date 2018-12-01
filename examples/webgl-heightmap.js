import { createGrid } from './utils/webgl/mesh-utils';

let gl = null;
let canvas = null;
let container = null;
let glProgram = null;
let fragmentShader = null;
let vertexShader = null;

let vertexPositionAttribute = null;
const buffers = {
  trianglesVerticesBuffer: null,
  vertexIndexBuffer: null,
};

let texture = null;
let textureImage = null;

let pMatrix = mat4.create();
let mvMatrix = mat4.create();
let normalMatrix = mat3.create();

let angle = 0.0;

let paused = false;

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
    createGrid(gl, buffers);
    getMatrixUniforms();
    loadTexture();

    vertexPositionAttribute = gl.getAttribLocation(glProgram, 'aVertexPosition');
    gl.enableVertexAttribArray(vertexPositionAttribute);

    (function animLoop() {

      if (!paused) {
        setupWebGL();
        setMatrixUniforms();
        drawScene();
      }

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
  mat4.translate(mvMatrix, mvMatrix, [0.25, 0.25, -5.0]);
  mat4.rotate(mvMatrix, mvMatrix, angle, [1.0, 0.0, 0.0]);
  mat4.rotate(mvMatrix, mvMatrix, angle, [0.0, 1.0, 0.0]);
  mat4.rotate(mvMatrix, mvMatrix, angle, [0.0, 0.0, 1.0]);
  angle += 0.01;

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

    uniform mat4 uPMatrix;    
    uniform mat4 uMVMatrix;
    uniform sampler2D uSampler;
    
    varying highp float height;
    
    void main(void) {
      height = texture2D( uSampler, vec2(aVertexPosition.xz )).r;
      gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition.x, height, aVertexPosition.z, 1.0);
    }
  `;
}

function fragmentShaderSource() {
  return `
    varying highp float height;
    
    void main(void) {
      gl_FragColor = vec4(height, height, height, 1.0);
    }
  `;
}

function drawScene() {
  gl.bindBuffer(gl.ARRAY_BUFFER, buffers.trianglesVerticesBuffer);
  gl.vertexAttribPointer(vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.vertexIndexBuffer);
  gl.drawElements(gl.TRIANGLE_STRIP, buffers.vertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
  //gl.drawElements(gl.POINTS, vertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
}

function getMatrixUniforms() {
  glProgram.pMatrixUniform = gl.getUniformLocation(glProgram, 'uPMatrix');
  glProgram.mvMatrixUniform = gl.getUniformLocation(glProgram, 'uMVMatrix');
  glProgram.samplerUniform = gl.getUniformLocation(glProgram, 'uSampler');
}

function setMatrixUniforms() {
  gl.uniformMatrix4fv(glProgram.pMatrixUniform, false, pMatrix);
  gl.uniformMatrix4fv(glProgram.mvMatrixUniform, false, mvMatrix);
}

function loadTexture() {
  textureImage = new Image();
  textureImage.onload = () => {
    setupTexture();
  };
  textureImage.src = 'data/img/hf-512px.jpg';
}

function setupTexture() {
  texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, textureImage);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

  gl.uniform1i(glProgram.samplerUniform, 0);

  if (!gl.isTexture(texture)) {
    console.error('Error: Texture is invalid');
  }

}
