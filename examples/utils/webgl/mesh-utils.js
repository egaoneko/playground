import Vector3 from "../../../src/pg/math/vector3";

export function setupPlaneMesh(gl, buffers, n, options) {
  options = {
    size: 10.0,
    color: [0.5, 0.5, 1.0, 1.0],
    translation: [0.0, 0.0, 0.0],
    textured: false,
    ...options
  };

  const size = options.size;
  const color = options.color;
  const translation = options.translation;
  const textured = options.textured;

  let vertexPositionData;
  let indexData;
  let textureData;
  const normalData = [];
  const colorData = [];

  const trianglesNormalBuffers = buffers.trianglesNormalBuffers;
  const trianglesColorBuffers = buffers.trianglesColorBuffers;
  const trianglesVerticeBuffers = buffers.trianglesVerticeBuffers;
  const trianglesTexCoordBuffers = buffers.trianglesTexCoordBuffers;
  const vertexIndexBuffers = buffers.vertexIndexBuffers;

  //plane
  for (let i = 0; i < 5; ++i) {
    normalData.push(0.0);
    normalData.push(1.0);
    normalData.push(0.0);
    colorData.push(color[0]);
    colorData.push(color[1]);
    colorData.push(color[2]);
    colorData.push(color[3]);
  }

  vertexPositionData = [
    0.0, 0.0, 0.0,
    -size, 0.0, -size,
    size, 0.0, -size,
    size, 0.0, size,
    -size, 0.0, size
  ];

  textureData = [
    0.0, 0.0,
    -size, -size,
    size, -size,
    size, size,
    -size, size
  ];


  for (var j = 0; j < vertexPositionData.length; j += 3) {
    vertexPositionData[j] += translation[0];
    vertexPositionData[j + 1] += translation[1];
    vertexPositionData[j + 2] += translation[2];
  }

  indexData = [0, 1, 2, 0, 2, 3, 0, 3, 4, 0, 4, 1];

  trianglesNormalBuffers[n] = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, trianglesNormalBuffers[n]);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normalData), gl.STATIC_DRAW);
  trianglesNormalBuffers[n].itemSize = 3;
  trianglesNormalBuffers[n].numItems = normalData.length / 3;

  trianglesColorBuffers[n] = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, trianglesColorBuffers[n]);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colorData), gl.STATIC_DRAW);
  trianglesColorBuffers[n].itemSize = 4;
  trianglesColorBuffers[n].numItems = colorData.length / 4;

  trianglesVerticeBuffers[n] = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, trianglesVerticeBuffers[n]);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexPositionData), gl.STATIC_DRAW);
  trianglesVerticeBuffers[n].itemSize = 3;
  trianglesVerticeBuffers[n].numItems = vertexPositionData.length / 3;

  if (textured) {
    trianglesTexCoordBuffers[n] = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, trianglesTexCoordBuffers[n]);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureData), gl.STATIC_DRAW);
    trianglesTexCoordBuffers[n].itemSize = 2;
    trianglesTexCoordBuffers[n].numItems = textureData.length / 2;
  }

  vertexIndexBuffers[n] = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, vertexIndexBuffers[n]);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indexData), gl.STREAM_DRAW);
  vertexIndexBuffers[n].itemSize = 3;
  vertexIndexBuffers[n].numItems = indexData.length;
}

export function setupSphereMesh(gl, buffers, n, options) {
  options = {
    color: [1.0, 0.0, 0.0, 1.0],
    translation: [0.0, 0.0, 0.0],
    radius: 1.0,
    divisions: 30,
    smoothShading: true,
    textured: false,
    ...options
  };

  const color = options.color;
  const translation = options.translation;
  const radius = options.radius;
  const divisions = options.divisions;
  const smoothShading = options.smoothShading;
  const textured = options.textured;

  let latitudeBands = divisions;
  let longitudeBands = divisions;

  let vertexPositionData = [];
  let colorData = [];
  let normalData = [];
  const indexData = [];
  const textureData = [];

  const trianglesNormalBuffers = buffers.trianglesNormalBuffers;
  const trianglesColorBuffers = buffers.trianglesColorBuffers;
  const trianglesVerticeBuffers = buffers.trianglesVerticeBuffers;
  const trianglesTexCoordBuffers = buffers.trianglesTexCoordBuffers;
  const vertexIndexBuffers = buffers.vertexIndexBuffers;

  //modified from http://learningwebgl.com/cookbook/index.php/How_to_draw_a_sphere
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
      // const u = 1 - (longNumber / longitudeBands);
      // const v = latNumber / latitudeBands;

      textureData.push((x + 1.0) * .5);
      textureData.push((y + 1.0) * .5);

      normalData.push(x);
      normalData.push(y);
      normalData.push(z);
      colorData.push(color[0]);
      colorData.push(color[1]);
      colorData.push(color[2]);
      colorData.push(color[3]);
      vertexPositionData.push(radius * x + translation[0]);
      vertexPositionData.push(radius * y + translation[1]);
      vertexPositionData.push(radius * z + translation[2]);
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

  if (!smoothShading) {
    vertexPositionData = calculateFlattenedVertices(vertexPositionData, indexData);
    colorData = [];
    for (let i = 0; i < indexData.length; ++i) {
      colorData.push(color[0]);
      colorData.push(color[1]);
      colorData.push(color[2]);
      colorData.push(color[3]);
    }
    normalData = calculatePerFaceNormals(normalData, indexData);
  }

  trianglesNormalBuffers[n] = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, trianglesNormalBuffers[n]);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normalData), gl.STATIC_DRAW);
  trianglesNormalBuffers[n].itemSize = 3;
  trianglesNormalBuffers[n].numItems = normalData.length / 3;

  trianglesColorBuffers[n] = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, trianglesColorBuffers[n]);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colorData), gl.STATIC_DRAW);
  trianglesColorBuffers[n].itemSize = 4;
  trianglesColorBuffers[n].numItems = colorData.length / 4;

  trianglesVerticeBuffers[n] = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, trianglesVerticeBuffers[n]);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexPositionData), gl.STATIC_DRAW);
  trianglesVerticeBuffers[n].itemSize = 3;
  trianglesVerticeBuffers[n].numItems = vertexPositionData.length / 3;

  if (textured) {
    trianglesTexCoordBuffers[n] = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, trianglesTexCoordBuffers[n]);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureData), gl.STATIC_DRAW);
    trianglesTexCoordBuffers[n].itemSize = 2;
    trianglesTexCoordBuffers[n].numItems = textureData.length / 2;
  }

  vertexIndexBuffers[n] = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, vertexIndexBuffers[n]);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indexData), gl.STREAM_DRAW);
  vertexIndexBuffers[n].itemSize = 3;
  vertexIndexBuffers[n].numItems = indexData.length;
}

function calculateFlattenedVertices(origVertices, indices) {
  const vertices = [];
  for (let i = 0; i < indices.length; ++i) {
    const a = indices[i] * 3;
    vertices.push(origVertices[a]);
    vertices.push(origVertices[a + 1]);
    vertices.push(origVertices[a + 2]);
  }
  return vertices;
}

function calculatePerFaceNormals(origNormals, indices) {
  const normals = [];
  for (let i = 0; i < indices.length; i += 3) {
    const a = indices[i] * 3;
    const b = indices[i + 1] * 3;
    const c = indices[i + 2] * 3;

    const n1 = new Vector3(origNormals[a], origNormals[a + 1], origNormals[a + 2]);
    const n2 = new Vector3(origNormals[b], origNormals[b + 1], origNormals[b + 2]);
    const n3 = new Vector3(origNormals[c], origNormals[c + 1], origNormals[c + 2]);

    const nx = (n1.x + n2.x + n3.x) / 3;
    const ny = (n1.y + n2.y + n3.y) / 3;
    const nz = (n1.z + n2.z + n3.z) / 3;

    const v3 = new Vector3(nx, ny, nz);
    normals.push(v3.x);
    normals.push(v3.y);
    normals.push(v3.z);

    normals.push(v3.x);
    normals.push(v3.y);
    normals.push(v3.z);

    normals.push(v3.x);
    normals.push(v3.y);
    normals.push(v3.z);
  }
  return normals;
}
