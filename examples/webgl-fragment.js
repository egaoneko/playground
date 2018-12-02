let gl = null;
let canvas = null;
let container = null;
let glProgram = null;
let fragmentShader = null;
let vertexShader = null;

let vertexPositionAttribute = null;
let trianglesVerticeBuffer = null;
let vertexIndexBuffer = null;

const SHADER = {
  circle: {
    vertexShader: circleVertexShaderSource(),
    fragmentShader: circleFragmentShaderSource()
  },
  circle_floor: {
    vertexShader: circleFloorVertexShaderSource(),
    fragmentShader: circleFloorFragmentShaderSource()
  },
  circle_uniform_1: {
    vertexShader: circleUniform1VertexShaderSource(),
    fragmentShader: circleUniform1FragmentShaderSource()
  },
  circle_uniform_2: {
    vertexShader: circleUniform2VertexShaderSource(),
    fragmentShader: circleUniform2FragmentShaderSource()
  },
  mandelbrot:  {
    vertexShader: mandelbrotVertexShaderSource(),
    fragmentShader: mandelbrotFragmentShaderSource()
  },
  julia_1:  {
    vertexShader: julia1VertexShaderSource(),
    fragmentShader: julia1FragmentShaderSource()
  },
  julia_2:  {
    vertexShader: julia2VertexShaderSource(),
    fragmentShader: julia2FragmentShaderSource()
  },
};

const radios = document.querySelectorAll('input[type=radio][name="fragment"]');

window.addEventListener('load', initWebGL);

function changeHandler() {
  gl.deleteProgram(glProgram);
  createProgram(this.value);
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
    setUniforms();

    vertexPositionAttribute = gl.getAttribLocation(glProgram, "aVertexPosition");
    gl.enableVertexAttribArray(vertexPositionAttribute);

    (function animLoop() {
      setupWebGL();
      drawScene();

      requestAnimationFrame(animLoop);
    })();
  }
}

function setupWebGL() {
  // set the clear color to a shade of green
  gl.clearColor(0.7, 0.7, 0.7, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  gl.enable(gl.DEPTH_TEST);

  gl.viewport(0, 0, canvas.width, canvas.height);
}

function initShaders() {
  createProgram('circle');
}

function createProgram(type) {
  // create program
  glProgram = gl.createProgram();
  attachShader(glProgram, type);
  // use program
  gl.useProgram(glProgram);
}

function attachShader(glProgram, type) {
  // get shader source
  const vsSource = SHADER[type].vertexShader;
  const fsSource = SHADER[type].fragmentShader;

  // compile shaders
  vertexShader = makeShader(vsSource, gl.VERTEX_SHADER);
  fragmentShader = makeShader(fsSource, gl.FRAGMENT_SHADER);

  // attach and link shaders to the program
  gl.attachShader(glProgram, vertexShader);
  gl.attachShader(glProgram, fragmentShader);
  gl.linkProgram(glProgram);

  if (!gl.getProgramParameter(glProgram, gl.LINK_STATUS)) {
    alert('Unable to initialize the shader program.');
  }
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

function drawScene() {
  gl.bindBuffer(gl.ARRAY_BUFFER, trianglesVerticeBuffer);
  gl.vertexAttribPointer(vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, vertexIndexBuffer);
  gl.drawElements(gl.TRIANGLES, vertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
}

function createSquare(size = 2.0) {
  const vertexPositionData = [
    0.0, 0.0, 0.0,
    -size / 2.0, -size / 2.0, 0.0,
    size / 2.0, -size / 2.0, 0.0,
    size / 2.0, size / 2.0, 0.0,
    -size / 2.0, size / 2.0, 0.0,
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

function setUniforms() {
  const colorData = [
    255, 0, 0, 255,
    255, 0, 0, 255,
    255, 0, 0, 255,
    255, 0, 0, 255,
    255, 255, 0, 255,
    255, 255, 0, 255,
    255, 255, 0, 255,
    255, 255, 0, 255,
    0, 255, 0, 255,
    0, 255, 0, 255,
    0, 255, 0, 255,
    0, 255, 0, 255,
    0, 0, 255, 255,
    0, 0, 255, 255,
    0, 0, 255, 255,
    0, 0, 255, 255
  ];
  const colors = new Uint8Array(colorData);
  const colorsTexture = gl.createTexture();

  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, colorsTexture);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 4, 4, 0,
    gl.RGBA, gl.UNSIGNED_BYTE, colors);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.uniform1i(gl.getUniformLocation(glProgram, "sColors"), colorsTexture);
}

function circleVertexShaderSource() {
  return `
    attribute vec3 aVertexPosition;
    varying vec2 position;
    
    void main(void) {
      position = vec2(aVertexPosition.xy);
      gl_Position = vec4(position, 0.0, 1.0);
    }
  `;
}

function circleFragmentShaderSource() {
  return `
    varying highp vec2 position;
    
    void main(void) {   
      highp float d = length(position);
      gl_FragColor = vec4(max(0.0, 1.0 - d), 0.0, 0.0, 1.0);
    }
  `;
}

function circleFloorVertexShaderSource() {
  return `
    attribute vec3 aVertexPosition;
    varying vec2 position;
    
    void main(void) {
      position = vec2(aVertexPosition.xy);
      gl_Position = vec4(position, 0.0, 1.0);
    }
  `;
}

function circleFloorFragmentShaderSource() {
  return `
    varying highp vec2 position;
    
    void main(void) {   
      highp float d = length(position);
      highp float c = floor(d*10.0) * 0.1;
      gl_FragColor = vec4(max(0.0, 1.0 - c), 0.0, 0.0, 1.0);
    }
  `;
}

function circleUniform1VertexShaderSource() {
  return `
    attribute vec3 aVertexPosition;
    varying vec2 position;
    
    void main(void) {
      position = vec2(aVertexPosition.xy);
      gl_Position = vec4(position, 0.0, 1.0);
    }
  `;
}

function circleUniform1FragmentShaderSource() {
  return `
    uniform sampler2D sColors;
    varying highp vec2 position;
    
    void main(void) {   
      highp float t = length(position);
      gl_FragColor = vec4(texture2D(sColors, vec2(0.0, t)).rgb, 1.0);
    }
  `;
}

function circleUniform2VertexShaderSource() {
  return `
    attribute vec3 aVertexPosition;
    varying vec2 position;
    
    void main(void) {
      position = vec2(aVertexPosition.xy);
      gl_Position = vec4(position, 0.0, 1.0);
    }
  `;
}

function circleUniform2FragmentShaderSource() {
  return `
    uniform sampler2D sColors;
    varying highp vec2 position;
    
    void main(void) {   
      highp float t = length(position);
      highp float x = sin(-position.y) * tan(length(position.xx));
      t = t + x;
      gl_FragColor = mix( vec4(0.0, 0.0, 0.0, 1.0), vec4(texture2D(sColors, vec2(0.0, t)).rgb, 1.0), t);
    }
  `;
}

function mandelbrotVertexShaderSource() {
  return `
    attribute vec3 aVertexPosition;
    varying vec2 position;
    
    void main(void) {
      position = vec2(aVertexPosition.xy);
      gl_Position = vec4(position, 0.0, 1.0);
    }
  `;
}

function mandelbrotFragmentShaderSource() {
  return `
    varying highp vec2 position;
    const int MAX_ITERATIONS = 250;
    const highp float LIGHTNESS_FACTOR = 10.0;
    
    void main(void) {   
      highp vec2 c = vec2(position.x - 0.5, position.y); 
      highp vec2 z = c;
      
      highp vec4 color = vec4(0.0, 0.0, 0.0, 1.0);
      
      for (int i = 0; i < MAX_ITERATIONS; i++) {
        z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
        
        if (dot(z, z) > 4.0) {
          highp float f = LIGHTNESS_FACTOR * float(i) / float(MAX_ITERATIONS);
          color = vec4(vec3(0.1, 0.1, 1.0) * f , 1.0);
          break;
        }
      }
      gl_FragColor = color;
    }
  `;
}

function julia1VertexShaderSource() {
  return `
    attribute vec3 aVertexPosition;
    varying vec2 position;
    
    void main(void) {
      position = vec2(aVertexPosition.xy);
      gl_Position = vec4(position, 0.0, 1.0);
    }
  `;
}

function julia1FragmentShaderSource() {
  return `
    varying highp vec2 position;
    const int MAX_ITERATIONS = 250;
    const highp float LIGHTNESS_FACTOR = 10.0;
    
    void main(void) {   
      highp vec2 z = vec2(position.x, position.y);
      highp vec2 c = vec2(-.8,-.2);
      
      highp vec4 color = vec4(0.0, 0.0, 0.0, 1.0);
      
      for (int i = 0; i < MAX_ITERATIONS; i++) {
        z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
        
        if (dot(z, z) > 4.0) {
          highp float f = LIGHTNESS_FACTOR * float(i) / float(MAX_ITERATIONS);
          color = vec4(vec3(0.1, 0.1, 1.0) * f , 1.0);
          break;
        }
      }
      gl_FragColor = color;
    }
  `;
}

function julia2VertexShaderSource() {
  return `
    attribute vec3 aVertexPosition;
    varying vec2 position;
    
    void main(void) {
      position = vec2(aVertexPosition.xy);
      gl_Position = vec4(position, 0.0, 1.0);
    }
  `;
}

function julia2FragmentShaderSource() {
  return `
    varying highp vec2 position;
    const int MAX_ITERATIONS = 250;
    const highp float LIGHTNESS_FACTOR = 10.0;
    
    void main(void) {   
      highp vec2 z = vec2(position.x, position.y);
      highp vec2 c = vec2(-.5,-.62);
      
      highp vec4 color = vec4(0.0, 0.0, 0.0, 1.0);
      
      for (int i = 0; i < MAX_ITERATIONS; i++) {
        z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
        
        if (dot(z, z) > 4.0) {
          highp float f = LIGHTNESS_FACTOR * float(i) / float(MAX_ITERATIONS);
          color = vec4(vec3(0.1, 0.1, 1.0) * f , 1.0);
          break;
        }
      }
      gl_FragColor = color;
    }
  `;
}

