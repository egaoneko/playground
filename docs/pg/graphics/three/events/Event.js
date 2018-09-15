import Event from './../../../events/Event';

/**
 * @module pg/graphics/three/events/Event
 */

/**
 * @classdesc
 * Three Event.
 */
var ThreeEvent = (function (Event) {
	function ThreeEvent () {
		Event.apply(this, arguments);
	}if ( Event ) ThreeEvent.__proto__ = Event;
	ThreeEvent.prototype = Object.create( Event && Event.prototype );
	ThreeEvent.prototype.constructor = ThreeEvent;

	

	return ThreeEvent;
}(Event));

export default ThreeEvent;

//# sourceMappingURL=Event.js.map