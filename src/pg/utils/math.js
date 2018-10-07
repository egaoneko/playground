/**
 * @module pg/utils/math
 */

/**
 * Gets a random integer
 *
 * @param {number} min minimum number.
 * @param {number} max maximum number.
 * @return {number} The random integer number.
 * @api
 */
export function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * Gets convex 2d numbers
 * @param {number} step step.
 * @return {array} The convex 2d numbers.
 * @api
 */
export function convex2d(step) {
  const convex = [];

  for (let i = 0; i < step; i++) {
    const x = i / step;
    convex.push([x, 1 - i / step]);
  }
  return convex;
}
