import Box from './utils/box';

const container = document.getElementById('container');
const width = container.clientWidth;
const height = container.clientHeight;

const windowCanvas = document.getElementById('canvas');

new Box(windowCanvas, {
  width,
  height,
  ratio: window.devicePixelRatio,
  images: [
    'data/img/iu/iu01.jpg',
    'data/img/iu/iu02.jpg',
    'data/img/iu/iu03.jpg',
    'data/img/iu/iu04.jpg',
    'data/img/iu/iu05.jpg',
    'data/img/iu/iu06.jpg',
  ]
});
