let gl = null;
let canvas = null;
let container = null;
let glProgram = null;
let fragmentShader = null;
let vertexShader = null;

let vertexPositionAttribute = null;
let trianglesVerticesBuffer = null;
let vertexTexCoordAttribute = null;
let trianglesTexCoordBuffer = null;
let vertexNormalAttribute = null;
let trianglesNormalBuffer = null;

const STONE_TEXTURE = 0;
const WEBGL_LOGO_TEXTURE = 1;
const textures = [];
const textureImages = [];

let pMatrix = mat4.create();
let mvMatrix = mat4.create();
let normalMatrix = mat3.create();

let angle = 0.0;

let paused = false;
let useTexture = false;
let useLighting = false;

window.addEventListener('load', initWebGL);
document.addEventListener('keyup', (evt) => {
  switch (evt.keyCode) {
    case 80: // 'p'
      paused = !paused;
      break;
    case 84: // 't'
      useTexture = !useTexture;

      if (useTexture) {
        gl.uniform1i(glProgram.uDoTexturing, 1);
      } else {
        gl.uniform1i(glProgram.uDoTexturing, 0);
      }
      break;
    case 76: // 'l'
      useLighting = !useLighting;
      break;
    default:
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
    setupBuffers();
    getMatrixUniforms();
    loadTexture();

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
  mat4.translate(mvMatrix, mvMatrix, [-1.0, -1.0, -7.0]);
  mat4.rotate(mvMatrix, mvMatrix, angle, [0.0, 1.0, 0.0]);
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
    attribute vec2 aVertexTexCoord;
    attribute vec3 aVertexNormal;

    uniform mat4 uPMatrix;    
    uniform mat4 uMVMatrix;
    uniform mat3 uNormalMatrix;
    
    varying highp vec2 vTextureCoord;
    varying highp vec3 vLight;
    
    void main(void) {
      gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
      vTextureCoord = aVertexTexCoord;
      
      // lighting
      vec3 ambientLight = vec3(0.3, 0.3, 0.3);
      vec3 transformedNormal = uNormalMatrix * aVertexNormal;
      vec3 lightColor = vec3(0.5, 0.5, 0.5);
      
      // vec3 directionalLightPosition = normalize(vec3(10.0, 10.0, 5.0));
      // vec3 light = vec3(uPMatrix * uMVMatrix * vec4(directionalLightPosition, 1.0));
      
      vec3 pointLightPosition = vec3(1.0,2.0,-1.0);
      vec3 pointLightDirection = normalize(vec3(pointLightPosition.xyz - aVertexPosition.xyz));
      vec3 light = vec3(uPMatrix * uMVMatrix * vec4(pointLightDirection, 1.0));
      
      float diffuseLightAmount = max(dot(normalize(transformedNormal), normalize(light)), 0.0);
      vLight = ambientLight + (diffuseLightAmount * lightColor);
    }
  `;
}

function fragmentShaderSource() {
  return `
    varying highp vec2 vTextureCoord;
    varying highp vec3 vLight;
    
    uniform sampler2D uSampler0;
    uniform sampler2D uSampler1;
    uniform int uDoTexturing;
    
    void main(void) {
      if (uDoTexturing == 1) {
        highp vec4 stoneColor = texture2D(uSampler0, vec2(vTextureCoord.st));
        highp vec4 webglLogoColor = texture2D(uSampler1, vec2(vTextureCoord.st));
        
        // highp vec4 vColor = mix(stoneColor, webglLogoColor, 0.5);
        highp vec4 vColor = mix(stoneColor, webglLogoColor, webglLogoColor.a);
        // highp vec4 vColor = mix(stoneColor, webglLogoColor, 1.0 - webglLogoColor.a);
        
        gl_FragColor = vec4(vColor.xyz * vLight, vColor.a);
      } else {
        gl_FragColor = vec4(vec3(1.0, 0.1, 0.1) * vLight, 1.0);
      }
    }
  `;
}

function setupBuffers() {
  // 12 vertices
  const triangleVerticesOriginal = [
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

  // setup vertices buffer
  // 16 triangles
  const triangleVertexIndices = [
    //front face
    0, 1, 3,
    1, 4, 3, //flipped
    1, 2, 4,
    3, 4, 5,

    //rear face
    6, 9, 7,
    7, 9, 10, //flipped
    7, 10, 8,
    9, 11, 10,

    //left side
    0, 3, 6,
    3, 9, 6, //flipped
    3, 5, 9,
    5, 11, 9, //flipped

    //right side
    2, 8, 4, //flipped
    4, 8, 10,
    4, 10, 5, //flipped
    5, 10, 11,
  ];

  //48 vertices
  const triangleVertices = [];
  const triangleTexCoords = [];
  for (let i = 0; i < triangleVertexIndices.length; ++i) {
    var a = triangleVertexIndices[i];
    triangleVertices.push(triangleVerticesOriginal[a * 3]);
    triangleVertices.push(triangleVerticesOriginal[a * 3 + 1]);
    triangleVertices.push(triangleVerticesOriginal[a * 3 + 2]);
    if (i >= 24) {
      triangleTexCoords.push(triangleVerticesOriginal[a * 3 + 1]);
      triangleTexCoords.push(triangleVerticesOriginal[a * 3 + 2]);
    } else {
      triangleTexCoords.push(triangleVerticesOriginal[a * 3]);
      triangleTexCoords.push(triangleVerticesOriginal[a * 3 + 1]);
    }
  }

  trianglesVerticesBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, trianglesVerticesBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleVertices), gl.STATIC_DRAW);
  trianglesTexCoordBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, trianglesTexCoordBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleTexCoords), gl.STATIC_DRAW);

  const triangleNormals = [];
  for (let i = 0; i < triangleVertexIndices.length; i += 3) {
    const a = triangleVertexIndices[i];
    const b = triangleVertexIndices[i + 1];
    const c = triangleVertexIndices[i + 2];
    //normal is the cross product
    const v1 = [
      triangleVerticesOriginal[a * 3] - triangleVerticesOriginal[b * 3],
      triangleVerticesOriginal[a * 3 + 1] - triangleVerticesOriginal[b * 3 + 1],
      triangleVerticesOriginal[a * 3 + 2] - triangleVerticesOriginal[b * 3 + 2],
    ];
    const v2 = [
      triangleVerticesOriginal[a * 3] - triangleVerticesOriginal[c * 3],
      triangleVerticesOriginal[a * 3 + 1] - triangleVerticesOriginal[c * 3 + 1],
      triangleVerticesOriginal[a * 3 + 2] - triangleVerticesOriginal[c * 3 + 2],
    ];
    const cross = [
      v1[1] * v2[2] - v1[2] * v2[1],
      v1[2] * v2[0] - v1[0] * v2[2],
      v1[0] * v2[1] - v1[1] * v2[0]
    ];
    //same value for each of the three vertices
    triangleNormals.push.apply(triangleNormals, cross);
    triangleNormals.push.apply(triangleNormals, cross);
    triangleNormals.push.apply(triangleNormals, cross);
  }

  trianglesNormalBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, trianglesNormalBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleNormals), gl.STATIC_DRAW);
}

function drawScene() {
  vertexPositionAttribute = gl.getAttribLocation(glProgram, 'aVertexPosition');
  gl.enableVertexAttribArray(vertexPositionAttribute);
  gl.bindBuffer(gl.ARRAY_BUFFER, trianglesVerticesBuffer);
  gl.vertexAttribPointer(vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);

  vertexTexCoordAttribute = gl.getAttribLocation(glProgram, 'aVertexTexCoord');
  gl.enableVertexAttribArray(vertexTexCoordAttribute);
  gl.bindBuffer(gl.ARRAY_BUFFER, trianglesTexCoordBuffer);
  gl.vertexAttribPointer(vertexTexCoordAttribute, 2, gl.FLOAT, false, 0, 0);

  vertexNormalAttribute = gl.getAttribLocation(glProgram, "aVertexNormal");
  gl.enableVertexAttribArray(vertexNormalAttribute);
  gl.bindBuffer(gl.ARRAY_BUFFER, trianglesNormalBuffer);
  gl.vertexAttribPointer(vertexNormalAttribute, 3, gl.FLOAT, false, 0, 0);

  gl.drawArrays(gl.TRIANGLES, 0, 16 * 3);
}

function getMatrixUniforms() {
  glProgram.pMatrixUniform = gl.getUniformLocation(glProgram, 'uPMatrix');
  glProgram.mvMatrixUniform = gl.getUniformLocation(glProgram, 'uMVMatrix');
  glProgram.samplerUniform0 = gl.getUniformLocation(glProgram, 'uSampler0');
  glProgram.samplerUniform1 = gl.getUniformLocation(glProgram, 'uSampler1');
  glProgram.normalMatrixUniform = gl.getUniformLocation(glProgram, "uNormalMatrix");
}

function setMatrixUniforms() {
  gl.uniformMatrix4fv(glProgram.pMatrixUniform, false, pMatrix);
  gl.uniformMatrix4fv(glProgram.mvMatrixUniform, false, mvMatrix);
  gl.uniformMatrix3fv(glProgram.normalMatrixUniform, false, normalMatrix);
}

function loadTexture() {
  textureImages[STONE_TEXTURE] = new Image();
  textureImages[STONE_TEXTURE].onload = () => {
    setupTexture(0);
    gl.uniform1i(glProgram.samplerUniform0, 0);
  };
  textureImages[STONE_TEXTURE].src = 'data/img/stone-128px.jpg';

  textureImages[WEBGL_LOGO_TEXTURE] = new Image();
  textureImages[WEBGL_LOGO_TEXTURE].onload = () => {
    setupTexture(1);
    gl.uniform1i(glProgram.samplerUniform1, 1);
  };
  textureImages[WEBGL_LOGO_TEXTURE].src = 'data/img/webgl_logo-512px.png';
}

function setupTexture(i) {
  gl.activeTexture(gl.TEXTURE0 + i);
  textures[i] = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, textures[i]);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, textureImages[i]);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);


  glProgram.uDoTexturing = gl.getUniformLocation(glProgram, 'uDoTexturing');
  gl.uniform1i(glProgram.uDoTexturing, 1);

  if (!gl.isTexture(textures[i])) {
    console.error('Error: Texture is invalid');
  }

}
