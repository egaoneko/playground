export default class Vector {

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
}
