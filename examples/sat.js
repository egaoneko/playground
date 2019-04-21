import {
  drawGrid,
  drawPoints,
  drawPolygon,
  generateBasis,
  initApp
} from './utils/graphics/pixi/utils';
import {generatePoints} from './utils/graphics/pixi/figure';
import convexHull from './utils/graphics/2d/convex-hull';
import Shape from './utils/graphics/2d/shape';
import Vector from './utils/graphics/2d/vector';
import SAT from './utils/graphics/collision/sat';

const colorSet = [
  0x8be9fd,
  0x50fa7b,
  0xffb86c,
  0xff79c6,
  0xbd93f9,
  0xff5555,
  0xf1fa8c,
];
const app = initApp('#container');
const basis = generateBasis(app);

drawGrid(app);

const points1 = convexHull(generatePoints(5, [-150, -50, 300,100]));
const points2 = convexHull(generatePoints(5, [-300, -100, 150,50]));

drawPoints(app, basis, points1,{color: colorSet[1], size: 3});
drawPoints(app, basis, points2, {color: colorSet[5], size: 3});
drawPolygon(app, basis, [...points1, points1[0]], {color: colorSet[1], size: 3});
drawPolygon(app, basis, [...points2, points2[0]], {color: colorSet[5], size: 3});

const shape1 = new Shape(points1.map(p => new Vector(p.x, p.y)));
const shape2 = new Shape(points2.map(p => new Vector(p.x, p.y)));
console.log(
  SAT.getMTV(shape1, shape2)
);
