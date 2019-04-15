import {
  setupPlaneMesh,
  setupSphereMesh
} from "./utils/graphics/webgl/mesh-utils";
import { SphereObject } from "./utils/graphics/webgl/object-utils";
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

let start = [];
let angleX = 0;
let angleY = 0;
let paused = false;

const SHADER = {
  flat: {
    vertexShader: flatVertexShaderSource(),
    fragmentShader: flatFragmentShaderSource()
  }
};

const sceneElements = [];
let zoom = 0.2;

let angle = 0.0;
let fire = false;

const GROUND_Y = -1.0;
const RECTANGLE_LENGTH = 4.0;

window.addEventListener('load', initWebGL);
document.addEventListener('keyup', (evt) => {
  console.log(evt.keyCode);
  switch (evt.keyCode) {
    case 80: // 'p'
      paused = !paused;
      break;
    case 38: //'up'
      ++angle;
      break;
    case 40: //'dwon'
      --angle;
      break;
    case 70: // 'f'
      fire = true;
      console.log("fire!");
      sceneElements[0].position = new Vector3(0.0, 0.0, 0.0);
      sceneElements[0].velocity = new Vector3(Math.cos(angle * .1), Math.sin(angle * .1), 0.0);
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
    }
  );
  addBox(1);

  const radius = 1;
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

  sceneElements.push(new SphereObject({
    vboIndex: 2,
    radius: radius,
    position: new Vector3(0.0, 0.0, 0.0),
    acceleration: new Vector3(0.0, -0.01, 0.0)
  }));

  vertexPositionAttribute = gl.getAttribLocation(glProgram, "aVertexPosition");
  vertexColorAttribute = gl.getAttribLocation(glProgram, "aVertexColor");
  vertexNormalAttribute = gl.getAttribLocation(glProgram, "aVertexNormal");
  gl.enableVertexAttribArray(vertexPositionAttribute);
  gl.enableVertexAttribArray(vertexColorAttribute);
  gl.enableVertexAttribArray(vertexNormalAttribute);
}

function drawScene() {
  for (let i = 0; i < vertexIndexBuffers.length; ++i) {
    mat4.identity(mvMatrix);
    mat4.translate(mvMatrix, mvMatrix, [-10.0, -1.0, -30.0]);
    mat4.rotate(mvMatrix, mvMatrix, angleX * 2 * Math.PI / 180.0, [0.0, 1.0, 0.0]);
    mat4.rotate(mvMatrix, mvMatrix, angleY * 2 * Math.PI / 180.0, [1.0, 0.0, 0.0]);
    mat4.scale(mvMatrix, mvMatrix, [zoom, zoom, zoom]);

    if (i === 1) {
      mat4.translate(mvMatrix, mvMatrix, [-RECTANGLE_LENGTH * .1, 3.0, 0.0]);
      mat4.rotate(mvMatrix, mvMatrix, angle * .1, [0.0, 0.0, 1.3]);
    } else if (i === 0) {
      mat4.rotate(mvMatrix, mvMatrix, -0.3, [-0.3, 0.0, 0.2]);
      mat4.rotate(mvMatrix, mvMatrix, 90, [0.0, 1.0, 0.0]);
    } else if (i === 2) {
      mat4.translate(mvMatrix, mvMatrix, [
        sceneElements[0].position.x + Math.cos(angle * .1),
        sceneElements[0].position.y + 3.0 + sceneElements[0].radius + Math.sin(angle * .1),
        sceneElements[0].position.z + 0.0 + sceneElements[0].radius]
      );

      if (fire) {
        sceneElements[0].velocity.y += sceneElements[0].acceleration.y;
        sceneElements[0].position.x += sceneElements[0].velocity.x;
        sceneElements[0].position.y += sceneElements[0].velocity.y;
        sceneElements[0].position.z += sceneElements[0].velocity.z;
      }
    }

    const invertedMatrix = mat3.create();
    mat3.fromMat4(invertedMatrix, mvMatrix);
    mat3.invert(normalMatrix, invertedMatrix);
    mat3.transpose(normalMatrix, normalMatrix);
    setMatrixUniforms();

    if (i === 1) {
      gl.disableVertexAttribArray(vertexColorAttribute);
      gl.vertexAttrib4f(vertexColorAttribute, 1.0, 0.9, 0.7, 1.0);
    } else {
      gl.enableVertexAttribArray(vertexColorAttribute);
      gl.bindBuffer(gl.ARRAY_BUFFER, trianglesColorBuffers[i]);
      gl.vertexAttribPointer(vertexColorAttribute, 4, gl.FLOAT, false, 0, 0);
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, trianglesVerticeBuffers[i]);
    gl.vertexAttribPointer(vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);

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

function addBox(n) {
  //8 vertices
  const vertexPositionData = [
    //0-3
    0, 0, 0,
    RECTANGLE_LENGTH, 0, 0,
    RECTANGLE_LENGTH, RECTANGLE_LENGTH * .5, 0,
    0, RECTANGLE_LENGTH * .5, 0,

    //4-7
    0, 0, RECTANGLE_LENGTH * .5,
    RECTANGLE_LENGTH, 0, RECTANGLE_LENGTH * .5,
    RECTANGLE_LENGTH, RECTANGLE_LENGTH * .5, RECTANGLE_LENGTH * .5,
    0, RECTANGLE_LENGTH * .5, RECTANGLE_LENGTH * .5,
  ];
  //10 triangles, 2 per face, 1 face not drawn
  const indexData = [
    0, 1, 2,	//front
    0, 2, 3,
    0, 3, 7,	//left
    0, 7, 4,
    2, 7, 3,	//top
    2, 6, 7,
    4, 6, 5,	//back
    4, 7, 6,
    1, 0, 4,	//bottom
    1, 4, 5,
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
      v1[1] * v2[2] - v1[0] * v2[1],
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
