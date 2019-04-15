import Vector3 from "../../../../src/pg/math/vector3";

export function setupPlaneMesh(gl, buffers, n, options) {
  options = Object.assign({}, {
    size: 10.0,
    color: [0.5, 0.5, 1.0, 1.0],
    translation: [0.0, 0.0, 0.0],
    textured: false,
  }, options);

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
  options = Object.assign({}, {
    color: [1.0, 0.0, 0.0, 1.0],
    translation: [0.0, 0.0, 0.0],
    radius: 1.0,
    division: 30,
    smoothShading: true,
    textured: false,
  }, options);

  const color = options.color;
  const translation = options.translation;
  const radius = options.radius;
  const division = options.division;
  const smoothShading = options.smoothShading;
  const textured = options.textured;

  let latitudeBands = division;
  let longitudeBands = division;

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

export function createGrid(gl, buffers, size = 1.0, divisions = 10) {
  const segment_size = size / divisions;
  const vertexPositionData = [];

  for (let i = 0; i <= divisions; ++i) {
    for (let j = 0; j <= divisions; ++j) {
      vertexPositionData.push(i * segment_size);
      vertexPositionData.push(0.0);
      vertexPositionData.push(j * segment_size);
    }
  }

  const indexData = [0];

  for (let row = 0; row < divisions; ++row) {
    if (row % 2 === 0) {
      for (let i = 0; i <= divisions; ++i) {
        if (i !== 0) {
          indexData.push(row * (divisions + 1) + i);
        }
        indexData.push((row + 1) * (divisions + 1) + i);
      }
    } else {
      for (let i = 0; i <= divisions; ++i) {
        if (i !== 0) {
          indexData.push((row + 1) * (divisions + 1) - (i + 1));
        }
        indexData.push((row + 2) * (divisions + 1) - (i + 1));
      }
    }
  }

  //indexData = [0,4,1,5,2,6,3,7,11,6,10,5,9,4,8,12,9,13,10,14,11,15];
  buffers.trianglesVerticesBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffers.trianglesVerticesBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexPositionData), gl.STATIC_DRAW);
  buffers.trianglesVerticesBuffer.itemSize = 3;
  buffers.trianglesVerticesBuffer.numItems = vertexPositionData.length / 3;
  buffers.vertexIndexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.vertexIndexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indexData), gl.STREAM_DRAW);
  buffers.vertexIndexBuffer.itemSize = 3;
  buffers.vertexIndexBuffer.numItems = indexData.length;
}

export function createGridMidPoint(gl, buffers, size = 1.0, power = 3) {
  const divisions = Math.pow(2.0, power);
  const segmentSize = size / divisions;
  const vertexPositionData = [];

  for (let i = 0; i <= divisions; ++i) {
    for (let j = 0; j <= divisions; ++j) {
      vertexPositionData.push(i * segmentSize - 0.5 * size);
      vertexPositionData.push(0.0);
      vertexPositionData.push(j * segmentSize - 0.5 * size);
    }
  }

  //seed the corners
  vertexPositionData[(0 + 0 * (divisions + 1)) * 3 + 1] = 1.5;
  vertexPositionData[(divisions + 0 * (divisions + 1)) * 3 + 1] = 3.5;
  vertexPositionData[(0 + divisions * (divisions + 1)) * 3 + 1] = 2.0;
  vertexPositionData[(divisions + divisions * (divisions + 1)) * 3 + 1] = 1.0;
  midpointDisplacement(
    vertexPositionData,
    [0, 0],
    [divisions, 0],
    [0, divisions],
    [divisions, divisions],
    divisions, 0
  );

  let indexData = [0];
  for (let row = 0; row < divisions; ++row) {
    if (row % 2 === 0) {
      for (let i = 0; i <= divisions; ++i) {
        if (i !== 0) {
          indexData.push(i + row * (divisions + 1));
        }
        indexData.push(i + (row + 1) * (divisions + 1));
      }
    } else {
      for (let i = 0; i <= divisions; ++i) {
        if (i !== 0) {
          indexData.push(-(i + 1) + (row + 1) * (divisions + 1));
        }
        indexData.push(-(i + 1) + (row + 2) * (divisions + 1));
      }
    }
  }

  buffers.trianglesVerticesBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffers.trianglesVerticesBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexPositionData), gl.STATIC_DRAW);
  buffers.trianglesVerticesBuffer.itemSize = 3;
  buffers.trianglesVerticesBuffer.numItems = vertexPositionData.length / 3;
  buffers.vertexIndexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.vertexIndexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indexData), gl.STREAM_DRAW);
  buffers.vertexIndexBuffer.itemSize = 3;
  buffers.vertexIndexBuffer.numItems = indexData.length;
}

function midpointDisplacement(vertexPositionData, tl, tr, bl, br, divisions, iteration) {
  if ((tl[0] + 1) === br[0] || (tl[1] + 1) === br[1]) {
    return;
  }

  //array indices
  const midpoint = [
    (tl[0] + br[0]) / 2,
    (tl[1] + br[1]) / 2
  ];

  const leftMp = [
    tl[0],
    (tl[1] + bl[1]) / 2
  ];
  const rightMp = [
    tr[0],
    (tr[1] + br[1]) / 2
  ];
  const topMp = [
    (tl[0] + tr[0]) / 2,
    tl[1]
  ];
  const bottomMp = [
    (bl[0] + br[0]) / 2,
    bl[1]
  ];

  //current height values
  const tlHeight = vertexPositionData[(tl[0] + tl[1] * (divisions + 1)) * 3 + 1];
  const trHeight = vertexPositionData[(tr[0] + tr[1] * (divisions + 1)) * 3 + 1];
  const blHeight = vertexPositionData[(bl[0] + bl[1] * (divisions + 1)) * 3 + 1];
  const brHeight = vertexPositionData[(br[0] + br[1] * (divisions + 1)) * 3 + 1];

  //computer five new points
  const topValue = (tlHeight + trHeight) / 2.0;
  vertexPositionData[(topMp[0] + topMp[1] * (divisions + 1)) * 3 + 1] = topValue;
  const bottomValue = (blHeight + brHeight) / 2.0;
  vertexPositionData[(bottomMp[0] + bottomMp[1] * (divisions + 1)) * 3 + 1] = bottomValue;

  const leftValue = (tlHeight + blHeight) / 2.0;
  vertexPositionData[(leftMp[0] + leftMp[1] * (divisions + 1)) * 3 + 1] = leftValue;
  const rightValue = (trHeight + brHeight) / 2.0;
  vertexPositionData[(rightMp[0] + rightMp[1] * (divisions + 1)) * 3 + 1] = rightValue;
  //midpoint has random term
  vertexPositionData[(midpoint[0] + midpoint[1] * (divisions + 1)) * 3 + 1] = (tlHeight + trHeight + blHeight + brHeight) / 4.0
    + (-0.5 + Math.random()) * Math.pow(0.65, iteration - 2.0);
  //repeat with four quads
  midpointDisplacement(vertexPositionData, tl, topMp, leftMp, midpoint, divisions, iteration + 1);
  midpointDisplacement(vertexPositionData, topMp, tr, midpoint, rightMp, divisions, iteration + 1);
  midpointDisplacement(vertexPositionData, leftMp, midpoint, bl, bottomMp, divisions, iteration + 1);
  midpointDisplacement(vertexPositionData, midpoint, rightMp, bottomMp, br, divisions, iteration + 1);
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
