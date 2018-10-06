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
