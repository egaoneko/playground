import Three from '../../../../../src/pg/graphics/three/Three';

describe('Three', function () {

  let three;
  beforeEach(function() {
    three = new Three();
  });

  describe('_init()', function () {
    it('ready', function () {
      expect(three._ready).to.be(true);
    });
  });
});
