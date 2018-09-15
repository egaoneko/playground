import { getRandomDummyImages } from "../src/pg/utils/image";

const imageBox = document.getElementById('image-box');
let imageBoxIndex = 0;
const imageSet1 = getRandomDummyImages(400, 200, 10);

imageBox.style.backgroundImage = getBackgroundImage(imageSet1[imageBoxIndex]);

addClickEvent('image-box-prev-btn', function () {
  if (imageBoxIndex < 1) {
    return;
  }
  imageBoxIndex -= 1;
  imageBox.style.backgroundImage = getBackgroundImage(imageSet1[imageBoxIndex]);
});

addClickEvent('image-box-next-btn', function () {
  if (imageBoxIndex >= imageSet1.length - 1) {
    return;
  }
  imageBoxIndex += 1;
  imageBox.style.backgroundImage = getBackgroundImage(imageSet1[imageBoxIndex]);
});

const preloadImageBox = document.getElementById('preload-image-box');
let preloadImageBoxIndex = 0;
const imageSet2 = getRandomDummyImages(400, 200, 10);

preloadImageBox.style.backgroundImage = getBackgroundImage(imageSet2[preloadImageBoxIndex]);
preloadImages(imageSet2);

addClickEvent('preload-image-box-prev-btn', function () {
  if (preloadImageBoxIndex < 1) {
    return;
  }
  preloadImageBoxIndex -= 1;
  preloadImageBox.style.backgroundImage = getBackgroundImage(imageSet2[preloadImageBoxIndex]);
});

addClickEvent('preload-image-box-next-btn', function () {
  if (preloadImageBoxIndex >= imageSet2.length - 1) {
    return;
  }
  preloadImageBoxIndex += 1;
  preloadImageBox.style.backgroundImage = getBackgroundImage(imageSet2[preloadImageBoxIndex]);
});

function preloadImages(images) {
  images.forEach(function (src) {
    setTimeout(() => {
      let img = new Image();
      img.src = src;
      img.onload = () => {
        img = null;
      };
    });
  });
}

function getBackgroundImage(src) {
  return 'url(' + src + ')';
}

function addClickEvent(id, callback) {
  document.getElementById(id).addEventListener('click', callback);
}
