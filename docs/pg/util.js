/**
 * @module pg/util
 */

/**
 * Counter for getUid.
 * @type {number}
 * @private
 */
var _uidCounter = 0;

/**
 * Gets a unique ID for an object. This mutates the object so that further calls
 * with the same object as a parameter returns the same value. Unique IDs are generated
 * as a strictly increasing sequence. Adapted from goog.getUid.
 *
 * @param {Object} obj The object to get the unique ID for.
 * @return {number} The unique ID for the object.
 * @api
 */
export function getUid(obj) {
  return obj._uid || (obj._uid = ++_uidCounter);
}

/**
 * OpenLayers version.
 * @type {string}
 */
export var VERSION = '0.0.1';

//# sourceMappingURL=util.js.map