import {
  setupPlaneMesh,
  setupSphereMesh
} from "./utils/webgl/mesh-utils";
import {
  SphereObject,
  WallObject
} from "./utils/webgl/object-utils";
import Vector3 from "../src/pg/math/vector3";

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
let zoom = 0.5;

const GROUND_Y = -1.0;
const PLANE_SIZE = 100.0;

//ramp dimensions
const HEIGHT_1 = 65.0;
const HEIGHT_2 = 15.0;
const HEIGHT_3 = 20.0;
const HEIGHT_4 = 15.0;
const LENGTH = 60.0;
const LENGTH_2 = 60.0 * 0.5;
const LENGTH_3 = 60.0 * 0.75;
const LANDING_RAMP_START = LENGTH * 2.0;
const LANDING_RAMP_END = LENGTH * 3.0;
const DEPTH = 25.0;

const SCALE = 0.15;

let sphere = null;
const rampWalls = [];

window.addEventListener('load', initWebGL);
document.addEventListener('keyup', (evt) => {
  console.log(evt.keyCode);
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
    gl = canvas.getContext('webgl', {preserveDrawingBuffer: true}) ||
      canvas.getContext('experimental-webgl', {preserveDrawingBuffer: true});
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
        checkForCollisions();
      }

      requestAnimationFrame(animLoop);
    })();
  }
}

function initEvents() {
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
  // gl.clearColor(0.7, 0.7, 0.7, 1.0);
  // gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
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

  setupPlaneMesh(
    gl,
    {
      trianglesNormalBuffers,
      trianglesColorBuffers,
      trianglesVerticeBuffers,
      vertexIndexBuffers,
    },
    0,
    {
      translation: [0.0, GROUND_Y, 0.0],
      size: PLANE_SIZE,
    }
  );
  addRamp(1);
  setupRampWalls();

  const radius = 2.0;
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
      color: [1.0, 0.0, 0.0, 0.9],
      radius: radius,
    }
  );
  sphere = new SphereObject({
    vboIndex: 2,
    radius: radius,
    position: new Vector3(0.0, HEIGHT_1 * SCALE, 0.0),
    acceleration: new Vector3(0.0, -0.001, 0.0)
  });

  sceneElements.push(sphere);

  vertexPositionAttribute = gl.getAttribLocation(glProgram, "aVertexPosition");
  vertexColorAttribute = gl.getAttribLocation(glProgram, "aVertexColor");
  vertexNormalAttribute = gl.getAttribLocation(glProgram, "aVertexNormal");
  gl.enableVertexAttribArray(vertexPositionAttribute);
  gl.enableVertexAttribArray(vertexColorAttribute);
  gl.enableVertexAttribArray(vertexNormalAttribute);
}

function drawScene() {
  const tX = -20;//angleX;
  const tY = 7;//angleY;

  for (let i = 0; i < vertexIndexBuffers.length; ++i) {
    mat4.identity(mvMatrix);
    mat4.translate(mvMatrix, mvMatrix, [0.0, -1.0, -20.0]);
    mat4.rotate(mvMatrix, mvMatrix, tX * 2 * Math.PI / 180.0, [0.0, 1.0, 0.0]);
    mat4.rotate(mvMatrix, mvMatrix, tY * 2 * Math.PI / 180.0, [1.0, 0.0, 0.0]);
    mat4.scale(mvMatrix, mvMatrix, [zoom, zoom, zoom]);

    //coordinate space translations
    if (i === 1) { //ramp
      mat4.translate(
        mvMatrix,
        mvMatrix,
        [-LANDING_RAMP_END * 0.5 * SCALE, GROUND_Y, -DEPTH * 0.5 * SCALE]
      );
      mat4.scale(mvMatrix, mvMatrix, [SCALE, SCALE, SCALE]);
    } else if (i === 2) { //sphere
      mat4.translate(
        mvMatrix,
        mvMatrix,
        [(sphere.radius - LANDING_RAMP_END * 0.5) * SCALE + sphere.position.x,
          (GROUND_Y - sphere.radius) * SCALE + sphere.position.y,
          sphere.position.z
        ]
      );
      mat4.scale(mvMatrix, mvMatrix, [SCALE, SCALE, SCALE]);
    }

    const invertedMatrix = mat3.create();
    mat3.fromMat4(invertedMatrix, mvMatrix);
    mat3.invert(normalMatrix, invertedMatrix);
    mat3.transpose(normalMatrix, normalMatrix);
    setMatrixUniforms();

    gl.bindBuffer(gl.ARRAY_BUFFER, trianglesVerticeBuffers[i]);
    gl.vertexAttribPointer(vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);

    if (i === 1) { //ramp
      gl.disableVertexAttribArray(vertexColorAttribute);
      gl.vertexAttrib4f(vertexColorAttribute, 1.0, 0.9, 0.7, 1.0);
    } else {
      gl.enableVertexAttribArray(vertexColorAttribute);
      gl.bindBuffer(gl.ARRAY_BUFFER, trianglesColorBuffers[i]);
      gl.vertexAttribPointer(vertexColorAttribute, 4, gl.FLOAT, false, 0, 0);
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, trianglesNormalBuffers[i]);
    gl.vertexAttribPointer(vertexNormalAttribute, 3, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, vertexIndexBuffers[i]);
    gl.drawElements(gl.TRIANGLES, vertexIndexBuffers[i].numItems, gl.UNSIGNED_SHORT, 0);
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

function checkForCollisions() {
  const x = sphere.position.x / SCALE;

  if (sphere.position.y < 0.0) {
    return;
  }

  let found = false;

  for (let i = 0; i < rampWalls.length; i++) {
    if (x >= rampWalls[i].startX && x <= rampWalls[i].endX) {
      found = true;

      if (rampWalls[i].slope < -0.001 || rampWalls[i].slope > 0.001) {
        if (rampWalls[i].slope > 0.001) {
          sphere.totalVelocity -= sphere.acceleration.y;
        } else if (rampWalls[i].slope < -0.001) {
          sphere.totalVelocity += sphere.acceleration.y;
        }
        //console.log(sphere.totalVelocity);
        sphere.velocity.x = (sphere.totalVelocity * Math.cos(rampWalls[i].angle));
        sphere.velocity.y = sphere.totalVelocity * Math.sin(rampWalls[i].angle);

        sphere.position.y += sphere.velocity.y;
      }
      sphere.position.x += sphere.velocity.x;
    }
  }

  if (!found) {
    sphere.velocity.y += sphere.acceleration.y;
    sphere.position.x += sphere.velocity.x;
    sphere.position.y += sphere.velocity.y;
  }
}

function setupRampWalls() {
  const w = {
    startX: 0.0,
    startY: HEIGHT_1,
    endX: LENGTH_2,
    endY: HEIGHT_2
  };
  rampWalls.push(new WallObject(w));

  let p = {
    startX: LENGTH_2,
    startY: HEIGHT_2,
    endX: LENGTH_3,
    endY: HEIGHT_2
  };
  rampWalls.push(new WallObject(p));

  p = {
    startX: LENGTH_3,
    startY: HEIGHT_2,
    endX: LENGTH,
    endY: HEIGHT_3
  };
  rampWalls.push(new WallObject(p));

  p = {
    startX: LANDING_RAMP_START,
    startY: HEIGHT_4,
    endX: LANDING_RAMP_END,
    endY: 0.0
  };
  rampWalls.push(new WallObject(p));
}

function addRamp(n) {
  //26 vertices
  const vertexPositionData = [
    //0-3
    0, 0, 0,
    LENGTH_2, 0, 0,
    LENGTH_3, 0, 0,
    LENGTH, 0, 0,

    //4-7
    0, HEIGHT_2, 0,
    LENGTH_2, HEIGHT_2, 0,
    LENGTH_3, HEIGHT_2, 0,
    LENGTH, HEIGHT_2, 0,
    //8-9
    0, HEIGHT_1, 0,
    LENGTH, HEIGHT_3, 0,
    //just z-values change
    //10-13
    0, 0, DEPTH,
    LENGTH_2, 0, DEPTH,
    LENGTH_3, 0, DEPTH,
    LENGTH, 0, DEPTH,

    //14-17
    0, HEIGHT_2, DEPTH,
    LENGTH_2, HEIGHT_2, DEPTH,
    LENGTH_3, HEIGHT_2, DEPTH,
    LENGTH, HEIGHT_2, DEPTH,
    //18-19
    0, HEIGHT_1, DEPTH,
    LENGTH, HEIGHT_3, DEPTH,
    //down ramp
    //20-22
    LANDING_RAMP_START, 0, 0,
    LANDING_RAMP_END, 0, 0,
    LANDING_RAMP_START, HEIGHT_4, 0,
    //23-25
    LANDING_RAMP_START, 0, DEPTH,
    LANDING_RAMP_END, 0, DEPTH,
    LANDING_RAMP_START, HEIGHT_4, DEPTH
  ];
  //28 faces = 84 indices
  const indexData = [
    0, 1, 5,
    0, 5, 4,
    1, 6, 5,
    1, 2, 6,	//front side
    2, 3, 7,
    2, 7, 6,
    6, 7, 9,
    4, 5, 8,
    10, 15, 11,
    10, 14, 15,
    11, 15, 16,
    11, 16, 12,	//back side
    12, 17, 13,
    12, 16, 17,
    16, 19, 17,
    14, 18, 15,
    0, 13, 3,		//bottom
    0, 10, 13,
    0, 8, 10,		//left
    8, 18, 10,
    3, 13, 9,		//right
    9, 13, 19,
    8, 5, 15,			//top
    8, 15, 18,
    5, 6, 16,
    5, 16, 15,
    6, 9, 19,
    6, 19, 16,
    //down ramp
    20, 21, 22,
    23, 25, 24,	//sides
    20, 22, 23,
    23, 22, 25,	//back
    20, 23, 21,
    21, 23, 24,	//bottom
    21, 24, 22,	//top
    22, 24, 25
  ];
  const normalData = calculateNormals(vertexPositionData, indexData);
  trianglesNormalBuffers[n] = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, trianglesNormalBuffers[n]);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normalData), gl.STATIC_DRAW);
  trianglesNormalBuffers[n].itemSize = 3;
  trianglesNormalBuffers[n].numItems = normalData.length / 3;

  trianglesVerticeBuffers[n] = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, trianglesVerticeBuffers[n]);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexPositionData), gl.STATIC_DRAW);
  trianglesVerticeBuffers[n].itemSize = 3;
  trianglesVerticeBuffers[n].numItems = vertexPositionData.length / 3;

  vertexIndexBuffers[n] = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, vertexIndexBuffers[n]);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indexData), gl.STREAM_DRAW);
  vertexIndexBuffers[n].itemSize = 3;
  vertexIndexBuffers[n].numItems = indexData.length;
}

function calculateNormals(vertices, indices) {
  const normals = [];

  for (let i = 0; i < indices.length; i += 3) {
    const a = indices[i];
    const b = indices[i + 1];
    const c = indices[i + 2];
    //normal is the cross product
    const v1 = [
      vertices[a * 3] - vertices[b * 3],
      vertices[a * 3 + 1] - vertices[b * 3 + 1],
      vertices[a * 3 + 2] - vertices[b * 3 + 2]
    ];
    const v2 = [
      vertices[a * 3] - vertices[c * 3],
      vertices[a * 3 + 1] - vertices[c * 3 + 1],
      vertices[a * 3 + 2] - vertices[c * 3 + 2]
    ];
    const cross = [
      v1[1] * v2[2] - v1[2] * v2[1],
      v1[2] * v2[0] - v1[0] * v2[2],
      v1[0] * v2[1] - v1[1] * v2[0]
    ];
    //same value for each of the three vertices
    normals.push.apply(normals, cross);
    normals.push.apply(normals, cross);
    normals.push.apply(normals, cross);
  }
  return normals;
}
