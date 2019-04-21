import {dotProduct} from './utils';

export default class Vector {
  get length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  subtract(other) {
    return new Vector(
      this.x - other.x,
      this.y - other.y,
    );
  }

  perpendicular() {
    return new Vector(-this.y, this.x);
  }

  dot(other) {
    return dotProduct(this, other);
  }

  normalize() {
    const length = this.length;
    return new Vector(this.x / length, this.y / length);
  }
}
