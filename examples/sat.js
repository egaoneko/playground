import {
  drawLine,
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

const points1 = convexHull(generatePoints(5, [-200, -100, 300, 100]));
const points2 = convexHull(generatePoints(5, [-300, -100, 200, 100]));

drawPoints(app, basis, points1, {color: colorSet[1], size: 3});
drawPoints(app, basis, points2, {color: colorSet[5], size: 3});
drawPolygon(app, basis, [...points1, points1[0]], {color: colorSet[1], size: 3});
drawPolygon(app, basis, [...points2, points2[0]], {color: colorSet[5], size: 3});

const shape1 = new Shape(points1.map(p => new Vector(p.x, p.y)));
const shape2 = new Shape(points2.map(p => new Vector(p.x, p.y)));
const mtv = SAT.getMTV(shape1, shape2);
console.log(mtv);

if (mtv) {
  let points = [...mtv.shape.vertices];
  const dx = mtv.axis.x * mtv.overlap;
  const dy = mtv.axis.y * mtv.overlap;

  drawLine(app, basis, {x: 0, y: 0}, {x: dx, y: dy}, {color: colorSet[3]});

  points = points.map(p => {
    const point = new Vector(p.x + dx, p.y + dy);
    drawLine(app, basis, p, point, {color: colorSet[4]});
    return point;
  });
  drawPoints(app, basis, points, {color: colorSet[4], size: 3});
  drawPolygon(app, basis, [...points, points[0]], {color: colorSet[4], size: 3});
}

