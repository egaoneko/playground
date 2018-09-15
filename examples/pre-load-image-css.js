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
const imageSet2 = [
  "https://dummyimage.com/400x200/52ACEEBE5D21",
  "https://dummyimage.com/400x200/FD8F265C45CF",
  "https://dummyimage.com/400x200/768D21AD6511",
  "https://dummyimage.com/400x200/5A686067C23F",
  "https://dummyimage.com/400x200/0E070CEAB80B",
  "https://dummyimage.com/400x200/C13FC82B1BE7",
  "https://dummyimage.com/400x200/B0663BC483CB",
  "https://dummyimage.com/400x200/0244D9F1BA6F",
  "https://dummyimage.com/400x200/3311445D45EF",
  "https://dummyimage.com/400x200/075247DAAB1C"
];

preloadImageBox.style.backgroundImage = getBackgroundImage(imageSet2[preloadImageBoxIndex]);

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

function getBackgroundImage(src) {
  return 'url(' + src + ')';
}

function addClickEvent(id, callback) {
  document.getElementById(id).addEventListener('click', callback);
}

