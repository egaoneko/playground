import {getRandomDummyImages} from "../src/pg/utils/image";

const scrollBox = document.getElementById('scroll-box');
const imageBox = document.getElementById('image-box');
const imageSet = getRandomDummyImages(200, 100, 300);
const io = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      return;
    }

    const target = entry.target;

    loadImage(target);
    observer.unobserve(target);
  });
});

loadImagesBlock(imageSet);
scrollBox.scrollTop = 1000;
scrollBox.scrollLeft = 1500;

const lazyLoadImageSet = Array.from(document.querySelectorAll('.image-block > img'));

lazyLoadImageSet.forEach(el => {
  io.observe(el);
});

function loadImagesBlock(images) {
  const frag = document.createDocumentFragment();
  images.forEach(function (src) {
    frag.appendChild(getImages(src));
  });
  imageBox.appendChild(frag);
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
