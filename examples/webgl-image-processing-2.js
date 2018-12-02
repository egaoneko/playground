let gl = null;
let canvas = null;
let container = null;
let glProgram = null;
let fragmentShader = null;
let vertexShader = null;

let vertexPositionAttribute = null;
let trianglesVerticeBuffer = null;
let vertexIndexBuffer = null;

let texture = null;
let textureImage = null;

const COLORS_SWAPPED_EFFECT = 0;
const SEPIA_EFFECT = 1;

let effectUniform = null;

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
    createSquare();

    loadTexture();

    vertexPositionAttribute = gl.getAttribLocation(glProgram, 'aVertexPosition');
    gl.enableVertexAttribArray(vertexPositionAttribute);
    effectUniform = gl.getUniformLocation(glProgram, 'uEffect');

    textureImage.onload = function () {
      setupTexture();
      setupWebGL();

      gl.uniform1i(effectUniform, COLORS_SWAPPED_EFFECT);
      gl.viewport(
        canvas.width * 0.5 - canvas.height * 0.5,
        canvas.height * 0.5 * 0.5,
        canvas.height * 0.5,
        canvas.height * 0.5
      );
      drawScene();

      gl.uniform1i(effectUniform, SEPIA_EFFECT);
      gl.viewport(
        canvas.width * 0.5,
        canvas.height * 0.5 * 0.5,
        canvas.height * 0.5,
        canvas.height * 0.5
      );
      drawScene();
    };
  }
}

function setupWebGL() {
  // set the clear color to a shade of green
  gl.clearColor(0.1, 0.1, 0.1, 0.1);
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
    
    varying vec2 position;
    void main(void) {
      position = vec2(aVertexPosition.xy);
      gl_Position = vec4(position, 0.0, 1.0);
    }
  `;
}

function fragmentShaderSource() {
  return `
    varying highp vec2 position;
    uniform sampler2D uSampler;
    uniform int uEffect;
    
    void main(void) {
      //convert texture coordinates from [-1, 1] to [0, 1]
      highp vec2 texCoords = position * 0.5 + .5;
      
      highp vec4 texColor = texture2D( uSampler, vec2(texCoords.s, texCoords.t) );
      highp vec4 finalColor;
      
      if(uEffect == 0){
        finalColor = texColor.gbra;
      }else if(uEffect == 1){
        highp vec3 sepia = vec3( 
          min((texColor.r * .393) + (texColor.g *.769) + (texColor.b * .189), 1.0),
          min((texColor.r * .349) + (texColor.g *.686) + (texColor.b * .168), 1.0),
          min((texColor.r * .272) + (texColor.g *.534) + (texColor.b * .131), 1.0)
        );
        finalColor = vec4(sepia, 1.0);
      }
      
      gl_FragColor = finalColor;  
    }
  `;
}

function drawScene() {
  gl.bindBuffer(gl.ARRAY_BUFFER, trianglesVerticeBuffer);
  gl.vertexAttribPointer(vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, vertexIndexBuffer);
  gl.drawElements(gl.TRIANGLES, vertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
}

function createSquare(size = 2.0) {
  const vertexPositionData = [
    0.0, 0.0, 0.0,
    -size * 0.5, -size * 0.5, 0.0,
    size * 0.5, -size * 0.5, 0.0,
    size * 0.5, size * 0.5, 0.0,
    -size * 0.5, size * 0.5, 0.0,
  ];

  const indexData = [0, 1, 2, 0, 2, 3, 0, 3, 4, 0, 4, 1];
  trianglesVerticeBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, trianglesVerticeBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexPositionData), gl.STATIC_DRAW);
  trianglesVerticeBuffer.itemSize = 3;
  trianglesVerticeBuffer.numItems = vertexPositionData.length / 3;
  vertexIndexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, vertexIndexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indexData), gl.STREAM_DRAW);
  vertexIndexBuffer.itemSize = 3;
  vertexIndexBuffer.numItems = indexData.length;
}

function loadTexture() {
  textureImage = new Image();
  textureImage.src = 'data/img/iu/iu01.jpg';
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
