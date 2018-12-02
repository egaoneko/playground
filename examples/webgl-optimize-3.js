let gl = null;
let canvas = null;
let container = null;
let glProgram = null;
let fragmentShader = null;
let vertexShader = null;

let vertexPositionAttribute = null;
let vertexNormalAttribute = null;
let vertexTexCoordAttribute = null;
const trianglesInterleavedBuffers = [];
const vertexIndexBuffers = [];

const spherePositions = [];
let texture = null;
let textureImage = null;
let textureFilename = "texture_atlas.jpg";
// x_offset, y_offset, x_scale, y_scale
const textureAtlasAreas = [
  [0.0, 0.0, 0.5, 0.5], //moon
  [0.5, 0.0, 0.5, 0.5], //sun
  [0.0, 0.5, 0.25, 0.25], //saturn
  [0.0, 0.75, 0.25, 0.25], //jupiter
  [0.5, 0.5, 0.25, 0.25], //earth
  [0.5, 0.75, 0.25, 0.25] //mars
];
const texture_directory = 'data/img/';

textureFilename = texture_directory + textureFilename;

let pMatrix = mat4.create();
let mvMatrix = mat4.create();
let normalMatrix = mat3.create();

const num_spheres = 2000;
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
    loadTexture();

    gl.viewport(0, 0, canvas.width, canvas.height);
    mat4.perspective(pMatrix, 45, canvas.width / canvas.height, 0.1, 100.0);
    gl.uniformMatrix4fv(glProgram.pMatrixUniform, false, pMatrix);
    vertexPositionAttribute = gl.getAttribLocation(glProgram, 'aVertexPosition');
    vertexNormalAttribute = gl.getAttribLocation(glProgram, 'aVertexNormal');
    vertexTexCoordAttribute = gl.getAttribLocation(glProgram, 'aVertexTexCoord');
    gl.enableVertexAttribArray(vertexPositionAttribute);
    gl.enableVertexAttribArray(vertexNormalAttribute);
    gl.enableVertexAttribArray(vertexTexCoordAttribute);


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

    gl.bindBuffer(gl.ARRAY_BUFFER, trianglesInterleavedBuffers[i]);
    gl.vertexAttribPointer(vertexPositionAttribute, 3, gl.FLOAT, false,
      8 * Float32Array.BYTES_PER_ELEMENT, 0);
    gl.vertexAttribPointer(vertexNormalAttribute, 3, gl.FLOAT, false,
      8 * Float32Array.BYTES_PER_ELEMENT,
      3 * Float32Array.BYTES_PER_ELEMENT);
    gl.vertexAttribPointer(vertexTexCoordAttribute, 2, gl.FLOAT, false,
      8 * Float32Array.BYTES_PER_ELEMENT,
      6 * Float32Array.BYTES_PER_ELEMENT);
    gl.drawElements(gl.TRIANGLES, vertexIndexBuffers[i].numItems, gl.UNSIGNED_SHORT, 0);
  }
}

//modified from http://learningwebgl.com/cookbook/index.php/How_to_draw_a_sphere
function setupSphereData() {
  for (let i = 0; i < num_spheres; ++i) {
    const active_num = i % 6;
    const tex_start_x = textureAtlasAreas[active_num][0];
    const tex_start_y = textureAtlasAreas[active_num][1];
    const tex_scale_x = textureAtlasAreas[active_num][2];
    const tex_scale_y = textureAtlasAreas[active_num][3];

    const latitudeBands = 30;
    const longitudeBands = 30;
    const radius = spherePositions[i].radius;

    const interleavedData = [];
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
        const first = (latNumber * (longitudeBands + 1)) + longNumber;
        const second = first + longitudeBands + 1;

        //position
        interleavedData.push(radius * x);
        interleavedData.push(radius * y);
        interleavedData.push(radius * z);

        //normal
        interleavedData.push(x);
        interleavedData.push(y);
        interleavedData.push(z);

        //texture coordinates
        interleavedData.push(u * tex_scale_x + tex_start_x);
        interleavedData.push(v * tex_scale_y + tex_start_y);

        //indices
        if ((latNumber < latitudeBands) && (longNumber < longitudeBands)) {
          indexData.push(first);
          indexData.push(second);
          indexData.push(first + 1);

          indexData.push(second);
          indexData.push(second + 1);
          indexData.push(first + 1);
        }
      }
    }

    trianglesInterleavedBuffers[i] = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, trianglesInterleavedBuffers[i]);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(interleavedData), gl.STATIC_DRAW);
    trianglesInterleavedBuffers[i].itemSize = 8;
    trianglesInterleavedBuffers[i].numItems = interleavedData.length / 8;

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
  gl.uniformMatrix4fv(glProgram.mvMatrixUniform, false, mvMatrix);
  gl.uniformMatrix3fv(glProgram.normalMatrixUniform, false, normalMatrix);
}

function loadTexture() {
  textureImage = new Image();
  textureImage.onload = function () {
    setupTexture();
  };
  textureImage.src = textureFilename;
}

function setupTexture() {
  gl.activeTexture(gl.TEXTURE0);
  texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, textureImage);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.generateMipmap(gl.TEXTURE_2D);
  if (!gl.isTexture(texture)) {
    console.error("Error: Texture is invalid");
  }
}
