import {
  convex2d,
  randomInt
} from '../../../../src/pg/utils/math';

describe('math', function () {

  describe('randomInt()', function () {
    it('return is a random integer number', function () {
      const testSize = 100;
      for (let i = 0; i < testSize; i++) {
        const value = randomInt(0, 7);
        expect(value).to.be.within(0, 7);
      }
    });
  });

  describe('convex2d()', function () {
    it('return is convex 2d numbers', function () {
      const convex = convex2d(100);
      expect(convex.length).to.be(100);
      convex.forEach(value => {
        expect(value.length).to.be(2);
        expect(value[0]).to.be.within(0, 1);
        expect(value[1]).to.be.within(0, 1);
        expect(Math.round(value[0] + value[1])).to.be(1);
      })
    });
  });
});
