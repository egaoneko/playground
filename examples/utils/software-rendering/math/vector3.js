export default class Vector3 {
  static create() {
    const out = new Float32Array(3);
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    return out;
  }

  static fromValues(x, y, z) {
    const out = new Float32Array(3);
    out[0] = x;
    out[1] = y;
    out[2] = z;
    return out;
  }
}