import {setupPlaneMesh, setupSphereMesh} from "./utils/webgl/mesh-utils";
import {SphereObject} from "./utils/webgl/object-utils";

let gl = null;
let canvas = null;
let container = null;
let glProgram = null;
let fragmentShader = null;
let vertexShader = null;

let vertexPositionAttribute = null;
let vertexNormalAttribute = null;
let vertexColorAttribute = null;
let trianglesVerticeBuffers = [];
let trianglesNormalBuffers = [];
let trianglesColorBuffers = [];
let vertexIndexBuffers = [];

let pMatrix = mat4.create();
let mvMatrix = mat4.create();
let normalMatrix = mat3.create();

let paused = false;

const SHADER = {
  flat: {
    vertexShader: flatVertexShaderSource(),
    fragmentShader: flatFragmentShaderSource()
  }
};

const sceneElements = [];
let start = [];
let angleX = 0;
let angleY = 0;
let zoom = 1.0;

window.addEventListener('load', initWebGL);
document.addEventListener('keyup', (evt) => {
  switch (evt.keyCode) {
    case 80: // 'p'
      paused = !paused;
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

  initEvents();

  try {
    gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  } catch (e) {
    console.error(e);
  }

  if (gl) {
    initShaders();
    setupMeshes();

    (function animLoop() {

      if (!paused) {
        setupWebGL();
        drawScene();
      }

      requestAnimationFrame(animLoop);
    })();
  }
}

function initEvents() {
  canvas.addEventListener('mousedown', (e) => {
    start = [e.pageX, e.pageY];

    const mouseMoveHandler = (e) => {
      const x = e.pageX - start[0];
      const y = e.pageY - start[1];

      // start update
      start[0] = e.pageX;
      start[1] = e.pageY;

      angleX += x;
      angleY += y;
    };
    const mouseUpHandler = () => {
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  });

  const adjustZoom = (delta) => {
    if (delta > 0) {
      zoom += 1;
    } else {
      zoom -= 0.1;
      if (zoom < 0.01) {
        zoom = 0.1;
      }
    }
  };
  canvas.addEventListener('mousewheel', (e) => {
    e.stopPropagation();
    e.preventDefault();
    adjustZoom(e.wheelDelta);
  });
  canvas.addEventListener('DOMMouseScroll', (e) => {
    e.stopPropagation();
    e.preventDefault();
    adjustZoom(e.originalEvent.detail * -0.1);
  });
}

function setupWebGL() {
  // set the clear color to a shade of green
  gl.clearColor(0.7, 0.7, 0.7, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  gl.enable(gl.DEPTH_TEST);

  gl.viewport(0, 0, canvas.width, canvas.height);
  mat4.perspective(pMatrix, 45, canvas.width / canvas.height, 0.1, 100.0);
}

function initShaders() {
  createProgram('flat');
}

function createProgram(type) {
  // create program
  glProgram = gl.createProgram();
  attachShader(glProgram, type);
  // use program
  gl.useProgram(glProgram);
  getMatrixUniforms();
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

function setupMeshes() {
  setupSphereMesh(
    gl,
    {
      trianglesNormalBuffers,
      trianglesColorBuffers,
      trianglesVerticeBuffers,
      vertexIndexBuffers,
    },
    0,
    {
      translation: [-1.0, -0.75, 0.0],
      color: [1.0, 0.0, 0.0, 1.0],
      division: 20,
      smoothShading: false
    }
  );

  setupSphereMesh(
    gl,
    {
      trianglesNormalBuffers,
      trianglesColorBuffers,
      trianglesVerticeBuffers,
      vertexIndexBuffers,
    },
    1,
    {
      translation: [0.0, 0.0, 1.0],
      color: [0.0, 1.0, 0.0, 1.0],
      division: 10,
      smoothShading: false
    }
  );

  setupSphereMesh(
    gl,
    {
      trianglesNormalBuffers,
      trianglesColorBuffers,
      trianglesVerticeBuffers,
      vertexIndexBuffers,
    },
    2,
    {
      translation: [1.0, 0.25, -1.0],
      color: [1.0, 1.0, 0.0, 1.0],
      division: 5,
      smoothShading: false
    }
  );

  setupSphereMesh(
    gl,
    {
      trianglesNormalBuffers,
      trianglesColorBuffers,
      trianglesVerticeBuffers,
      vertexIndexBuffers,
    },
    3,
    {
      translation: [-1.0, 1.0, -1.0],
      color: [1.0, 0.0, 1.0, 1.0],
    }
  );

  setupSphereMesh(
    gl,
    {
      trianglesNormalBuffers,
      trianglesColorBuffers,
      trianglesVerticeBuffers,
      vertexIndexBuffers,
    },
    4,
    {
      translation: [-0.0, 1.75, -0.0],
      color: [0.0, 1.0, 1.0, 1.0],
    }
  );

  setupPlaneMesh(
    gl,
    {
      trianglesNormalBuffers,
      trianglesColorBuffers,
      trianglesVerticeBuffers,
      vertexIndexBuffers,
    },
    5,
    {
      translation: [0.0, -1.0, 0.0],
    }
  );

  sceneElements.push(new SphereObject({vboIndex: 0}));
  sceneElements.push(new SphereObject({vboIndex: 1}));
  sceneElements.push(new SphereObject({vboIndex: 2}));
  sceneElements.push(new SphereObject({vboIndex: 3}));
  sceneElements.push(new SphereObject({vboIndex: 4}));

  vertexPositionAttribute = gl.getAttribLocation(glProgram, "aVertexPosition");
  vertexColorAttribute = gl.getAttribLocation(glProgram, "aVertexColor");
  vertexNormalAttribute = gl.getAttribLocation(glProgram, "aVertexNormal");
  gl.enableVertexAttribArray(vertexPositionAttribute);
  gl.enableVertexAttribArray(vertexColorAttribute);
  gl.enableVertexAttribArray(vertexNormalAttribute);
}

function drawScene() {
  // sphere
  mat4.identity(mvMatrix);
  mat4.translate(mvMatrix, mvMatrix, [0.0, 0.0, -20.0]);
  mat4.rotate(mvMatrix, mvMatrix, angleX * 2 * Math.PI / 180.0, [0.0, 1.0, 0.0]);
  mat4.rotate(mvMatrix, mvMatrix, angleY * 2 * Math.PI / 180.0, [1.0, 0.0, 0.0]);
  mat4.scale(mvMatrix, mvMatrix, [zoom, zoom, zoom]);

  const invertedMatrix = mat3.create();
  mat3.fromMat4(invertedMatrix, mvMatrix);
  mat3.invert(normalMatrix, invertedMatrix);
  mat3.transpose(normalMatrix, normalMatrix);
  setMatrixUniforms();

  for (let i = 0; i < vertexIndexBuffers.length; ++i) {
    gl.bindBuffer(gl.ARRAY_BUFFER, trianglesVerticeBuffers[i]);
    gl.vertexAttribPointer(vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, trianglesColorBuffers[i]);
    gl.vertexAttribPointer(vertexColorAttribute, 4, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, trianglesNormalBuffers[i]);
    gl.vertexAttribPointer(vertexNormalAttribute, 3, gl.FLOAT, false, 0, 0);

    if (i === 4) {
      gl.disable(gl.DEPTH_TEST);
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
      gl.blendEquation(gl.FUNC_ADD);
    } else {
      gl.disable(gl.BLEND);
      gl.enable(gl.DEPTH_TEST);
    }

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, vertexIndexBuffers[i]);
    if (i > 2) {
      gl.drawElements(gl.TRIANGLES, vertexIndexBuffers[i].numItems, gl.UNSIGNED_SHORT, 0);
    } else {
      gl.drawArrays(gl.TRIANGLES, 0, trianglesVerticeBuffers[i].numItems);
    }
  }
}

function getMatrixUniforms() {
  glProgram.pMatrixUniform = gl.getUniformLocation(glProgram, 'uPMatrix');
  glProgram.mvMatrixUniform = gl.getUniformLocation(glProgram, 'uMVMatrix');
  glProgram.normalMatrixUniform = gl.getUniformLocation(glProgram, "uNormalMatrix");
}

function setMatrixUniforms() {
  gl.uniformMatrix4fv(glProgram.pMatrixUniform, false, pMatrix);
  gl.uniformMatrix4fv(glProgram.mvMatrixUniform, false, mvMatrix);
  gl.uniformMatrix3fv(glProgram.normalMatrixUniform, false, normalMatrix);
}

function flatVertexShaderSource() {
  return `
    attribute vec3 aVertexPosition;
    attribute vec3 aVertexColor;
    attribute vec3 aVertexNormal;

    uniform mat4 uPMatrix;    
    uniform mat4 uMVMatrix;
    uniform mat3 uNormalMatrix;
    
    varying highp vec3 vColor;
    varying highp vec3 L;
    varying highp vec3 N;
    
    void main(void) {
      gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
      
      vec3 pointLightPosition = vec3(1.0, 2.0, -1.0);
      vec3 pointLightDirection = normalize(vec3(pointLightPosition.xyz - aVertexPosition.xyz));
      vec3 ambientColor = vec3(0.1, 0.1, 0.1);
      
      L = vec3(uPMatrix * uMVMatrix * vec4(pointLightDirection, 1.0));
      N = uNormalMatrix * aVertexNormal;
      
      vColor = aVertexColor;
    }
  `;
}

function flatFragmentShaderSource() {
  return `
    varying highp vec3 vColor;
    varying highp vec3 N;
    varying highp vec3 L;
    
    void main(void) {
      highp float lambert = max(dot(normalize(N), normalize(L)), 0.0);
      gl_FragColor = vec4(vColor * lambert, 1.0);
    }
  `;
}
