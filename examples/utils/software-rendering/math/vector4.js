export default class Vector4 {
  static create() {
    const out = new Float32Array(4);
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    return out;
  }

  static fromValues(x, y, z, w) {
    const out = new Float32Array(4);
    out[0] = x;
    out[1] = y;
    out[2] = z;
    out[3] = w;
    return out;
  }

  static transformMat4(out, a, m) {
    const x = a[0],
      y = a[1],
      z = a[2],
      w = a[3];
    out[0] = m[0] * x + m[4] * y + m[8] * z + m[12] * w;
    out[1] = m[1] * x + m[5] * y + m[9] * z + m[13] * w;
    out[2] = m[2] * x + m[6] * y + m[10] * z + m[14] * w;
    out[3] = m[3] * x + m[7] * y + m[11] * z + m[15] * w;
    return out;
  }

  static perspectiveDivision(out, vector4) {
    const [x, y, z, w] = vector4;
    out[0] = x / w;
    out[1] = y / w;
    out[2] = z / w;
    return out;
  }
}