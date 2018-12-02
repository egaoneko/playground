let gl = null;
let canvas = null;
let container = null;
let glProgram = null;
let fragmentShader = null;
let vertexShader = null;

let vertexPositionAttribute = null;
let vertexNormalAttribute = null;
let vertexTexCoordAttribute = null;
const trianglesVerticeBuffers = [];
const trianglesNormalBuffers = [];
const trianglesTexCoordBuffers = [];
const vertexIndexBuffers = [];

const spherePositions = [];
const textures = [];
const textureImages = [];
const textureFilenames = [
  'sun.png',
  'earth.jpg',
  'mars.jpg',
  'moon.jpg',
  'jupiter.jpg',
  'saturn.jpg',
];
const topHalf = [1, 2, 4, 5];
const texture_directory = 'data/img/';

for (let i = 0; i < textureFilenames.length; ++i) {
  textureFilenames[i] = texture_directory + textureFilenames[i];
}

let pMatrix = mat4.create();
let mvMatrix = mat4.create();
let normalMatrix = mat3.create();

const num_spheres = 1000;
let paused = false;

class SpherePosition {
  constructor() {
    this.x_offset_orig = 10.0 - Math.random() * 20.0;
    this.y_offset_orig = 10.0 - Math.random() * 20.0;
    this.z_offset_orig = -25.0 + Math.random() * 12.0;

    this.x_offset = this.x_offset_orig;
    this.y_offset = this.y_offset_orig;
    this.z_offset = this.z_offset_orig;

    this.x_angle = Math.random() * 360;
    this.y_angle = Math.random() * 360;
    this.z_angle = Math.random() * 360;
    this.angle = 0.005;
    this.radius = 0.1 + Math.random() * .2;
  }
}

for (let i = 0; i < num_spheres; ++i) {
  spherePositions.push(new SpherePosition());
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
    setupSphereData();

    getMatrixUniforms();
    loadTextures();

    (function animLoop() {

      if (!paused) {
        setupWebGL();
        drawScene();
      }

      requestAnimationFrame(animLoop);
    })();
  }
}

function setupWebGL() {
  // set the clear color to a shade of green
  gl.clearColor(0.1, 0.5, 0.1, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  gl.enable(gl.DEPTH_TEST);

  gl.viewport(0, 0, canvas.width, canvas.height);
  mat4.perspective(pMatrix, 45, canvas.width / canvas.height, 0.1, 100.0);
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
    attribute vec3 aVertexNormal;
    attribute vec2 aVertexTexCoord;
    
    uniform mat3 uNormalMatrix;
    uniform mat4 uMVMatrix;
    uniform mat4 uPMatrix;
    
    varying highp float vLight;
    varying highp vec2 vTextureCoord;
    
    void main(void) {
      gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
      vTextureCoord = aVertexTexCoord;
      
      vec3 pointLightPosition = vec3(1.0,2.0,-1.0);
      vec3 pointLightDirection = normalize(vec3(pointLightPosition.xyz - aVertexPosition.xyz));
       
      vec3 L = vec3(uPMatrix * uMVMatrix * vec4(pointLightDirection, 1.0));
      vec3 N = uNormalMatrix * aVertexNormal;
      float lambert = max(dot(normalize(N), normalize(L)), 0.0);
      vLight = 0.1 + lambert;
    }
  `;
}

function fragmentShaderSource() {
  return `
    varying highp float vLight;
    varying highp vec2 vTextureCoord;
    
    uniform sampler2D uSampler;
    
    void main(void) {
      highp vec4 textureColor = texture2D(uSampler, vec2(vTextureCoord.st));
      gl_FragColor = vec4(textureColor.xyz * vLight, textureColor.a);
    }
  `;
}

function setMvMatrix(sp) {
  mat4.identity(mvMatrix);
  mat4.identity(normalMatrix);
  mat4.translate(mvMatrix, mvMatrix, [sp.x_offset, sp.y_offset, sp.z_offset]);
  mat4.rotate(mvMatrix, mvMatrix, sp.angle, [sp.x_angle, sp.y_angle, sp.z_angle]);

  const invertedMatrix = mat3.create();
  mat3.fromMat4(invertedMatrix, mvMatrix);
  mat3.invert(normalMatrix, invertedMatrix);
  mat3.transpose(normalMatrix, normalMatrix);

  sp.x_angle += Math.random();
  sp.y_angle += Math.random();
  sp.z_angle += Math.random();
  sp.x_offset = (Math.cos(sp.angle) * sp.x_offset_orig);
  sp.y_offset = (Math.sin(sp.angle) * sp.y_offset_orig);
  sp.z_offset = -25.0 + 12.0 * Math.sin(sp.angle);
  sp.angle += 0.005;
}

function drawScene() {
  for (let i = 0; i < num_spheres; ++i) {
    setMvMatrix(spherePositions[i]);
    setMatrixUniforms();

    const active_num = i % textures.length;

    vertexPositionAttribute = gl.getAttribLocation(glProgram, 'aVertexPosition');
    gl.enableVertexAttribArray(vertexPositionAttribute);
    gl.bindBuffer(gl.ARRAY_BUFFER, trianglesVerticeBuffers[i]);
    gl.vertexAttribPointer(vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
    vertexNormalAttribute = gl.getAttribLocation(glProgram, 'aVertexNormal');
    gl.enableVertexAttribArray(vertexNormalAttribute);
    gl.bindBuffer(gl.ARRAY_BUFFER, trianglesNormalBuffers[i]);
    gl.vertexAttribPointer(vertexNormalAttribute, 3, gl.FLOAT, false, 0, 0);

    vertexTexCoordAttribute = gl.getAttribLocation(glProgram, 'aVertexTexCoord');
    gl.activeTexture(gl.TEXTURE0 + active_num);
    gl.uniform1i(glProgram.samplerUniform, active_num);//textures[active_num]);

    gl.enableVertexAttribArray(vertexTexCoordAttribute);
    gl.bindBuffer(gl.ARRAY_BUFFER, trianglesTexCoordBuffers[i]);
    gl.vertexAttribPointer(vertexTexCoordAttribute, 2, gl.FLOAT, false, 0, 0);
    gl.drawElements(gl.TRIANGLES, vertexIndexBuffers[i].numItems, gl.UNSIGNED_SHORT, 0);
  }
}

//modified from http://learningwebgl.com/cookbook/index.php/How_to_draw_a_sphere
function setupSphereData() {
  for (let i = 0; i < num_spheres; ++i) {
    let tex_scale_x = 1;
    let tex_scale_y = 1;
    let tex_start_x = 0;
    let tex_start_y = 0;

    const active_num = i % textureFilenames.length;
    if (topHalf.indexOf(active_num) !== -1) {
      tex_start_y = 0.5;
      tex_scale_y = 0.5;
    }

    const latitudeBands = 30;
    const longitudeBands = 30;
    const radius = spherePositions[i].radius;

    const vertexPositionData = [];
    const normalData = [];
    const textureCoordData = [];
    const indexData = [];

    for (let latNumber = 0; latNumber <= latitudeBands; latNumber++) {
      const theta = latNumber * Math.PI / latitudeBands;
      const sinTheta = Math.sin(theta);
      const cosTheta = Math.cos(theta);

      for (let longNumber = 0; longNumber <= longitudeBands; longNumber++) {
        const phi = longNumber * 2 * Math.PI / longitudeBands;
        const sinPhi = Math.sin(phi);
        const cosPhi = Math.cos(phi);

        const x = cosPhi * sinTheta;
        const y = cosTheta;
        const z = sinPhi * sinTheta;
        const u = 1 - (longNumber / longitudeBands);
        const v = latNumber / latitudeBands;

        normalData.push(x);
        normalData.push(y);
        normalData.push(z);
        textureCoordData.push(u * tex_scale_x + tex_start_x);
        textureCoordData.push(v * tex_scale_y + tex_start_y);
        vertexPositionData.push(radius * x);
        vertexPositionData.push(radius * y);
        vertexPositionData.push(radius * z);
      }
    }

    for (let latNumber = 0; latNumber < latitudeBands; latNumber++) {
      for (let longNumber = 0; longNumber < longitudeBands; longNumber++) {
        const first = (latNumber * (longitudeBands + 1)) + longNumber;
        const second = first + longitudeBands + 1;
        indexData.push(first);
        indexData.push(second);
        indexData.push(first + 1);

        indexData.push(second);
        indexData.push(second + 1);
        indexData.push(first + 1);
      }
    }
    trianglesNormalBuffers[i] = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, trianglesNormalBuffers[i]);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normalData), gl.STATIC_DRAW);
    trianglesNormalBuffers[i].itemSize = 3;
    trianglesNormalBuffers[i].numItems = normalData.length / 3;

    trianglesTexCoordBuffers[i] = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, trianglesTexCoordBuffers[i]);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordData), gl.STATIC_DRAW);
    trianglesTexCoordBuffers[i].itemSize = 2;
    trianglesTexCoordBuffers[i].numItems = textureCoordData.length / 2;

    trianglesVerticeBuffers[i] = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, trianglesVerticeBuffers[i]);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexPositionData), gl.STATIC_DRAW);
    trianglesVerticeBuffers[i].itemSize = 3;
    trianglesVerticeBuffers[i].numItems = vertexPositionData.length / 3;

    vertexIndexBuffers[i] = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, vertexIndexBuffers[i]);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indexData), gl.STREAM_DRAW);
    vertexIndexBuffers[i].itemSize = 3;
    vertexIndexBuffers[i].numItems = indexData.length;
  }
}

function getMatrixUniforms() {
  glProgram.pMatrixUniform = gl.getUniformLocation(glProgram, 'uPMatrix');
  glProgram.mvMatrixUniform = gl.getUniformLocation(glProgram, 'uMVMatrix');
  glProgram.normalMatrixUniform = gl.getUniformLocation(glProgram, 'uNormalMatrix');
  glProgram.samplerUniform = gl.getUniformLocation(glProgram, 'uSampler');
}

function setMatrixUniforms() {
  gl.uniformMatrix4fv(glProgram.pMatrixUniform, false, pMatrix);
  gl.uniformMatrix4fv(glProgram.mvMatrixUniform, false, mvMatrix);
  gl.uniformMatrix3fv(glProgram.normalMatrixUniform, false, normalMatrix);
}

function loadTextures() {
  for (let i = 0; i < textureFilenames.length; ++i) {
    loadTexture(i);
  }
  gl.uniform1i(glProgram.samplerUniform, textures[0]);
}

function loadTexture(i) {
  textureImages[i] = new Image();
  textureImages[i].onload = function () {
    setupTexture(i);
  };
  textureImages[i].src = textureFilenames[i];
}

function setupTexture(i) {
  gl.activeTexture(gl.TEXTURE0 + i);
  textures[i] = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, textures[i]);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, textureImages[i]);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);

  if (!gl.isTexture(textures[i])) {
    console.error('Error: Texture is invalid');
  }
}
