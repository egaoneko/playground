/**
 * @module pg/utils/image
 */

/**
 * Gets a random hex color
 *
 * @return {string} The random hex color.
 * @api
 */
export function getRandomHexColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

/**
 * Gets a random dummy images
 *
 * @param {number} width The image width.
 * @param {number} height The image height.
 * @param {number} size The images size.
 * @return {Array<string>} The random dummy images.
 * @api
 */
export function getRandomDummyImages(width, height, size) {
  if (
    typeof width !== 'number' ||
    typeof height !== 'number' ||
    typeof size !== 'number'
  ) {
    throw new TypeError('Must be params number');
  }

  var baseUrl = "https://dummyimage.com/" + width + "x" + height + "/";
  var images = [];

  for (var i = 0; i < size; i++) {
    images.push(baseUrl + getRandomHexColor().slice(1));
  }

  return images;
}

//# sourceMappingURL=image.js.map