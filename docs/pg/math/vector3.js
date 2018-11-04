/**
 * @module pg/math/vector3
 */

/**
 * @classdesc
 * Vector 3D
 *
 * @api
 */

var Vector3 = function Vector3(x, y, z) {
  if ( x === void 0 ) x = 0;
  if ( y === void 0 ) y = 0;
  if ( z === void 0 ) z = 0;

  this.x = x;
  this.y = y;
  this.z = z;
};

/**
 * Divide by number
 * @param {number} scala number for dividing
 * @return {Vector3} this
 * @api
 */
Vector3.prototype.divide = function divide (scala) {
  if (typeof scala !== 'number') {
    throw new Error(("invalid input: " + scala));
  }

  this.x /= scala;
  this.y /= scala;
  this.z /= scala;

  return this;
};

/**
 * Get crossed vector.
 * @param {Vector3} vector vector for cross
 * @return {Vector3} this
 * @api
 */
Vector3.prototype.cross = function cross (vector) {
  var x = this.x;
  var y = this.y;
  var z = this.z;

  if (!(vector instanceof Vector3)) {
    throw new Error(("invalid input: " + vector));
  }

  this.x = y * vector.z - z * vector.y;
  this.y = z * vector.x - x * vector.z;
  this.z = x * vector.y - y * vector.x;
};

/**
 * Get length of vector.
 * @return {number} length
 * @api
 */
Vector3.prototype.length = function length () {
  return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
};

/**
 * Get normalized vector
 * @return {Vector3} normalized vector
 * @api
 */
Vector3.prototype.normalize = function normalize () {
  return this.divide(this.length());
};

export default Vector3;

//# sourceMappingURL=vector3.js.map