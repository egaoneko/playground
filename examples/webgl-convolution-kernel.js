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

let kernelUniform = null;
let kernelWeightUniform = null;
let embossUniform = null;
const kernels = {
  'no_effect': [
    0, 0, 0,
    0, 1, 0,
    0, 0, 0
  ],
  'sharpen1': [
    0, -1, 0,
    -1, 4, -1,
    0, -1, 0
  ],
  'sharpen2': [
    -1, -1, -1,
    -1, 8, -1,
    -1, -1, -1
  ],
  'sobel_edges_y': [
    -1, 0, 1,
    -2, 0, 2,
    -1, 0, 1
  ],
  'sobel_edges_x': [
    -1, -2, -1,
    0, 0, 0,
    1, 2, 1
  ],
  'sobel_both': [
    -2, -2, 0,
    -2, 0, 2,
    0, 2, 2
  ],
  'blur': [
    1, 1, 1,
    1, 1, 1,
    1, 1, 1
  ],
  'gaussian_blur': [
    0.045, 0.122, 0.045,
    0.122, 0.332, 0.122,
    0.045, 0.122, 0.045
  ],
  'edge_detect': [
    0, 1, 0,
    1, -4, 1,
    0, 1, 0
  ],
  'emboss1':[
    -1, -1, 0,
    -1, 0, 1,
    0, 1, 1
  ],
  'emboss2':[
    1, 1, 0,
    1, 0, -1,
    0, -1, -1
  ],
  'emboss3':[
    0, -1, -1,
    1, 0, -1,
    1, 1, 0
  ],
  'emboss4':[
    0, 1, 1,
    -1, 0, 1,
    -1, -1, 0
  ]
};
let current_kernel = 'no_effect';
let emboss = false;

const radios = document.querySelectorAll('input[type=radio][name="kernel"]');

window.addEventListener('load', initWebGL);

function changeHandler() {
  current_kernel = this.value;
  emboss = this.value.indexOf('emboss') !== -1;
}

Array.prototype.forEach.call(radios, function (radio) {
  radio.addEventListener('change', changeHandler);
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
    createSquare();

    loadTexture();

    vertexPositionAttribute = gl.getAttribLocation(glProgram, 'aVertexPosition');
    gl.enableVertexAttribArray(vertexPositionAttribute);
    kernelUniform = gl.getUniformLocation(glProgram, 'uKernel');
    kernelWeightUniform = gl.getUniformLocation(glProgram, 'uKernelWeight');
    embossUniform = gl.getUniformLocation(glProgram, 'uEmboss');

    textureImage.onload = function () {
      setupTexture();

      (function animLoop() {
        setupWebGL();

        // left
        gl.uniform1fv(kernelUniform, kernels.no_effect);
        gl.uniform1i(embossUniform, 0);
        gl.uniform1f(kernelWeightUniform, sumArray(kernels.no_effect));
        gl.viewport(0, 0, canvas.width / 3.0, canvas.height);
        drawScene();

        const currentKernel = kernels[current_kernel].slice();
        const currentKernelWeight = sumArray(currentKernel);

        // center
        gl.uniform1fv(kernelUniform, currentKernel);
        gl.uniform1f(kernelWeightUniform, currentKernelWeight);
        gl.viewport(canvas.width / 3.0, 0, canvas.width / 3.0, canvas.height);
        drawScene();

        // right – kernel result added to our original image

        if (current_kernel !== 'no_effect') {
          currentKernel[4] += 1;
        }
        gl.uniform1fv(kernelUniform, currentKernel);

        if (emboss) {
          gl.uniform1i(embossUniform, 1);
        } else {
          gl.uniform1i(embossUniform, 0);
        }

        if (current_kernel === 'no_effect') {
          gl.uniform1f(kernelWeightUniform, currentKernelWeight);
        } else {
          gl.uniform1f(kernelWeightUniform, currentKernelWeight + 1);
        }
        gl.viewport(2.0 * canvas.width / 3.0, 0, canvas.width / 3.0, canvas.height);
        drawScene();

        requestAnimationFrame(animLoop);
      })();
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
    uniform highp vec2 uTexDimensions;
    uniform highp float uKernel[9];
    uniform highp float uKernelWeight;
    uniform highp int uEmboss;
    
    void main(void) {
      //convert texture coordinates from [-1, 1] to [0, 1]
      highp vec2 texCoords = position * 0.5 + .5;
      
      //find the size of each pixel relative to the [0, 1] range
      highp vec2 texelSize = vec2(1.0, 1.0) / uTexDimensions;
      
      //modified from http://games.greggman.com/game/webgl-image-processing/
      highp vec4 colorSum =
        texture2D(uSampler, texCoords + texelSize * vec2(-1, -1)) * uKernel[0] +
        texture2D(uSampler, texCoords + texelSize * vec2( 0, -1)) * uKernel[1] +
        texture2D(uSampler, texCoords + texelSize * vec2( 1, -1)) * uKernel[2] +
        
        texture2D(uSampler, texCoords + texelSize * vec2(-1,  0)) * uKernel[3] +
        
        //central pixel
        texture2D(uSampler, texCoords) * uKernel[4] +     
        texture2D(uSampler, texCoords + texelSize * vec2( 1,  0)) * uKernel[5] +
        
        texture2D(uSampler, texCoords + texelSize * vec2(-1,  1)) * uKernel[6] +
        texture2D(uSampler, texCoords + texelSize * vec2( 0,  1)) * uKernel[7] +
        texture2D(uSampler, texCoords + texelSize * vec2( 1,  1)) * uKernel[8];
        
      highp float weight;
      weight = uKernelWeight;
      if (0.01 > weight) {
        weight = 1.0;
      }
      
      highp vec3 color = (colorSum/weight).rgb;
      
      if(uEmboss == 1) {
        //to grayscale
        highp float gray = dot(color, vec3(.3,.59,.11) )  +.5;
        highp vec3 finalColor = vec3(gray,gray,gray);
        gl_FragColor = vec4( finalColor, 1.0 );
      }else{
        gl_FragColor = vec4( color, 1.0 );
      }
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

  gl.generateMipmap(gl.TEXTURE_2D);
  glProgram.samplerUniform = gl.getUniformLocation(glProgram, 'uSampler');
  gl.uniform1i(glProgram.samplerUniform, 0);
  gl.uniform2f(
    gl.getUniformLocation(glProgram, 'uTexDimensions'),
    textureImage.width,
    textureImage.height
  );
}

function sumArray(a) {
  let sum = 0;

  for (let key in a) {
    if (!a.hasOwnProperty(key)) {
      return;
    }

    sum += a[key];
  }
  return sum;
}
