export default class Projection {
  constructor(min, max) {
    this.min = min;
    this.max = max;
  }

  overlap(other) {
    return this.max > other.min && other.max > this.min;
  }

  getOverlap(other) {
    let overlap;

    if (!this.overlap(other)) {
      return 0;
    }

    if (this.max > other.max) {
      overlap = other.max - this.min;
    } else {
      overlap = this.max - other.min;
    }

    return overlap;
  }

  contains(other) {
    return this.max > other.max && this.min < other.min;
  }
}
