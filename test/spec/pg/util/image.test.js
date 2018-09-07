import {
  getRandomHexColor,
  getRandomDummyImages,
} from '../../../../src/pg/utils/image';

describe('image', function () {

  describe('getRandomHexColor()', function () {
    it('returned color is hex', function () {
      expect(getRandomHexColor()).to.match(/#[0-9A-F]{6}/);
    });

    it('return is random', function () {
      const testSize = 100;
      const testSet = [];
      for (let i = 0; i < testSize; i++) {
        const color = getRandomHexColor();
        if (testSet.includes(color)) {
          continue;
        }
        testSet.push(color);
      }

      expect(testSet.length).to.be(testSize);
    });
  });

  describe('getRandomDummyImages()', function () {
    it('image use https://dummyimage.com', function () {
      const image = getRandomDummyImages(100, 100, 1)[0];
      expect(image).to.match(/https:\/\/dummyimage.com.*/);
    });

    it('width height is matched', function () {
      const image = getRandomDummyImages(100, 100, 1)[0];
      expect(image).to.match(/https:\/\/dummyimage.com\/100x100.*/);
    });

    it('image has color', function () {
      const image = getRandomDummyImages(100, 100, 1)[0];
      expect(image).to.match(/https:\/\/dummyimage.com.*\/[0-9A-F]{6}/);
    });

    it('size is matched', function () {
      const images = getRandomDummyImages(100, 100, 10);
      expect(images.length).to.be(10);
    });

    it('can not assign non number width', function () {
      expect(function () {
        getRandomDummyImages(undefined, 100, 1);
      }).to.throwException();
    });

    it('can not assign non number height', function () {
      expect(function () {
        getRandomDummyImages(100, undefined, 1);
      }).to.throwException();
    });

    it('can not assign non number size', function () {
      expect(function () {
        getRandomDummyImages(100, 100, undefined);
      }).to.throwException();
    });

  });
});
