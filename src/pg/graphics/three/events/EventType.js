import EventType from '../../../events/EventType';

/**
 * @module pg/graphics/three/events/EventType
 */

/**
 * @enum {string}
 * @const
 */
export default {
  /**
   * Three error event. Triggered when the error is occurred.
   * @event module:pg/graphics/three/events/Event~Event#error
   * @api
   */
  ERROR: EventType.ERROR,

  /**
   * Three clear event. Triggered when the three is cleared.
   * @event module:pg/graphics/three/events/Event~Event#clear
   * @api
   */
  CLEAR: 'clear',

  /**
   * Three load event. Triggered when the three is loaded.
   * @event module:pg/graphics/three/events/Event~Event#load
   * @api
   */
  LOAD: 'load',

  /**
   * Three resize event. Triggered when the three is resized.
   * @event module:pg/graphics/three/events/Event~Event#resize
   * @api
   */
  RESIZE: 'resize',
};
