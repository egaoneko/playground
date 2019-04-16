import Projection from './projection';

export default class Shape {

  constructor(vertices) {
    this.vertices = vertices;
  }

  getAxes() {
    const axes = [];
    const length = this.vertices.length;

    // loop over the vertices
    for (let i = 0; i < length; i++) {
      // get the current vertex
      const p1 = this.vertices[i];
      // get the next vertex
      const p2 = this.vertices[i + 1 === length ? 0 : i + 1];
      // subtract the two to get the edge vector
      const edge = p1.subtract(p2);
      // get either perpendicular vector
      const normal = edge.perpendicular();
      // the perp method is just (x, y) => (-y, x) or (y, -x)
      axes.push(normal);
    }
    return axes;
  }

  project(axis) {
    let min = axis.dot(this.vertices[0]);
    let max = min;
    const length = this.vertices.length;

    for (let i = 1; i < length; i++) {
      // NOTE: the axis must be normalized to get accurate projections
      const p = axis.dot(this.vertices[i]);
      if (p < min) {
        min = p;
      } else if (p > max) {
        max = p;
      }
    }

    return new Projection(min, max);
  }
}
