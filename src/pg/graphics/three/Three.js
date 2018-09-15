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
export default class Three extends EventEmitter {

  constructor() {
    super();

    /**
     * @private
     * @type {boolean}
     */
    this._ready = false;

    this._init();
  }

  /**
   * Initiate Three
   * @private
   */
  _init() {
    this._ready = true;
  }

  /**
   * @param {string} type Event Type.
   */
  emit(type) {
    const event = new Event(type);
    super.emit(type, event);
  }
}
