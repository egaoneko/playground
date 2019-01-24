import EventEmitter from 'eventemitter3';
import Event from './events/Event';

/**
 * @module pg/graphics/three/three
 */

/**
 * @classdesc
 * Three is helper for Three.js.
 *
 * @fires import("./events/Event.js")
 * @api
 */
var Three = /*@__PURE__*/(function (EventEmitter) {
  function Three() {
    EventEmitter.call(this);

    /**
     * @private
     * @type {boolean}
     */
    this._ready = false;

    this._init();
  }

  if ( EventEmitter ) Three.__proto__ = EventEmitter;
  Three.prototype = Object.create( EventEmitter && EventEmitter.prototype );
  Three.prototype.constructor = Three;

  /**
   * Initiate Three
   * @private
   */
  Three.prototype._init = function _init () {
    this._ready = true;
  };

  /**
   * @param {string} type Event Type.
   */
  Three.prototype.emit = function emit (type) {
    var event = new Event(type);
    EventEmitter.prototype.emit.call(this, type, event);
  };

  return Three;
}(EventEmitter));

export default Three;

//# sourceMappingURL=Three.js.map