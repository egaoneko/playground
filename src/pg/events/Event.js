/**
 * @module pg/events/Event
 */

/**
 * @classdesc
 * Event interface.
 *
 * This implementation only provides `type`. It is meant as base class
 * for higher level events defined in the library, and works with
 */
class Event {

  /**
   * @param {string} type Type.
   */
  constructor(type) {

    /**
     * The event type.
     * @type {string}
     * @api
     */
    this.type = type;

    /**
     * The event target.
     * @type {Object}
     * @api
     */
    this.target = null;
  }
}

export default Event;
