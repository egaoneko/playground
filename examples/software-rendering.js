import Renderer from './utils/software-rendering/renderer';
import Model from './utils/software-rendering/model';
import Vector3 from './utils/software-rendering/math/vector3';
import PerspectiveProjection from './utils/software-rendering/projection/perspective-projection';
import OrthogonalProjection from './utils/software-rendering/projection/orthogonal-projection';

const renderer = new Renderer('container');
const model = new Model(
  [
    // 앞면(Front face)
    -0.5, -0.5,  0.5,
    0.5, -0.5,  0.5,
    0.5,  0.5,  0.5,
    -0.5,  0.5,  0.5,
    
    // 뒤면(Back face)
    -0.5, -0.5, -0.5,
    -0.5,  0.5, -0.5,
    0.5,  0.5, -0.5,
    0.5, -0.5, -0.5,
    
    // 위면(Top face)
    -0.5,  0.5, -0.5,
    -0.5,  0.5,  0.5,
    0.5,  0.5,  0.5,
    0.5,  0.5, -0.5,
    
    // 아래면(Bottom face)
    -0.5, -0.5, -0.5,
    0.5, -0.5, -0.5,
    0.5, -0.5,  0.5,
    -0.5, -0.5,  0.5,
    
    // 오른쪽면(Right face)
    0.5, -0.5, -0.5,
    0.5,  0.5, -0.5,
    0.5,  0.5,  0.5,
    0.5, -0.5,  0.5,
      
    // 왼쪽면(Left face)
    -0.5, -0.5, -0.5,
    -0.5, -0.5,  0.5,
    -0.5,  0.5,  0.5,
    -0.5,  0.5, -0.5
  ],
  [
    0,  1,  2,      0,  2,  3,    // front
    4,  5,  6,      4,  6,  7,    // back
    8,  9,  10,     8,  10, 11,   // top
    12, 13, 14,     12, 14, 15,   // bottom
    16, 17, 18,     16, 18, 19,   // right
    20, 21, 22,     20, 22, 23    // left
  ]
);

const perspective = new PerspectiveProjection(45, renderer.width / renderer.height, 0.1, 100.0);
const orthogonal = new OrthogonalProjection(-1.0, 1.0, -1.0, 1.0, 0.1, 100.0);

renderer.scale = Vector3.fromValues(0.5, 0.5, 0.5);
renderer.scale = Vector3.fromValues(1, 1, 1);
renderer.projection = perspective;
// renderer.projection = orthogonal;
renderer.appendChild(model);
renderer.render();

let controller;
const data = {
  projection: 'perspective'
};
const gui = new dat.GUI();
const f1 = gui.addFolder('Projection');

controller = f1.add(data, 'projection', ['perspective', 'orthogonal']);
controller.onFinishChange(function(value) {
  if (value === 'orthogonal') {
    renderer.projection = orthogonal;
  } else {
    renderer.projection = perspective;
  }
});

f1.open();
