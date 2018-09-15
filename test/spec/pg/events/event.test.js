import Event from '../../../../src/pg/events/Event.js';

describe('pg.events.Event', function () {

  describe('constructor', function () {
    it('takes a type as argument', function () {
      const event = new Event('foo');
      expect(event.type).to.be('foo');
    });
  });
});
