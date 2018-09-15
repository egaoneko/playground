import { getRandomDummyImages } from "../src/pg/utils/image";

const offsetWidth = 200;
const offsetHeight = 100;
const scrollBox = document.getElementById('scroll-box');
const imageBox = document.getElementById('image-box');
const imageSet = getRandomDummyImages(200, 100, 300);

loadImagesBlock(imageSet);
scrollBox.scrollTop = 1000;
scrollBox.scrollLeft = 1500;

const lazyLoadImageSet = Array.from(document.querySelectorAll('.image-block > img'));
scrollBox.addEventListener('scroll', function () {
  loadImages(lazyLoadImageSet);
});

function loadImagesBlock(images) {
  const frag = document.createDocumentFragment();
  images.forEach(function (src) {
    frag.appendChild(getImages(src));
  });
  imageBox.appendChild(frag);
}

function loadImages(images) {
  const scrollRect = {
    top: scrollBox.scrollTop - offsetHeight,
    left: scrollBox.scrollLeft - offsetWidth,
    right: scrollBox.scrollLeft + scrollBox.offsetWidth + offsetWidth * 2,
    bottom: scrollBox.scrollTop + scrollBox.offsetHeight + offsetHeight * 2
  };

  images.slice().forEach(function (image) {
    if (image.src) {
      return;
    }

    const imageRect = {
      top: image.offsetTop,
      left: image.offsetLeft,
      right: image.offsetLeft + image.clientWidth,
      bottom: image.offsetTop + image.clientHeight
    };

    if (!collisionCheck(scrollRect, imageRect)) {
      return;
    }

    loadImage(image);
    images.splice(images.indexOf(image), 1);
  });
}

function collisionCheck(scrollRect, imageRect) {
  return (
    imageRect.top > scrollRect.top &&
    imageRect.left > scrollRect.left &&
    imageRect.right < scrollRect.right &&
    imageRect.bottom < scrollRect.bottom
  );
}

function loadImage(image) {
  image.src = image.getAttribute('data-src');
}

function getImages(src) {
  const image = new Image();
  image.setAttribute('data-src', src);

  const div = document.createElement('div');
  div.className = 'image-block';
  div.appendChild(image);
  return div;
}
