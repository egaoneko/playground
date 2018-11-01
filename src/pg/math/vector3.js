/**
 * @module pg/math/vector3
 */

/**
 * @classdesc
 * Vector 3D
 *
 * @api
 */

export default class Vector3 {
  constructor(x = 0, y = 0, z = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  /**
   * Divide by number
   * @param {number} scala number for dividing
   * @return {Vector3} this
   * @api
   */
  divide(scala) {
    if (typeof scala !== 'number') {
      throw new Error(`invalid input: ${scala}`);
    }

    this.x /= scala;
    this.y /= scala;
    this.z /= scala;

    return this;
  }

  /**
   * Get crossed vector.
   * @param {Vector3} vector vector for cross
   * @return {Vector3} this
   * @api
   */
  cross(vector) {
    const x = this.x;
    const y = this.y;
    const z = this.z;

    if (!(vector instanceof Vector3)) {
      throw new Error(`invalid input: ${vector}`);
    }

    this.x = y * vector.z - z * vector.y;
    this.y = z * vector.x - x * vector.z;
    this.z = x * vector.y - y * vector.x;
  }

  /**
   * Get length of vector.
   * @return {number} length
   * @api
   */
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }

  /**
   * Get normalized vector
   * @return {Vector3} normalized vector
   * @api
   */
  normalize() {
    return this.divide(this.length());
  }
}
