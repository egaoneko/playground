import Box from './utils/box';

const sprites = {
  'sprite01': {
    x: 557 * 0,
    y: 0,
    w: 557,
    h: 557
  },
  'sprite02': {
    x: 557 * 1,
    y: 0,
    w: 557,
    h: 557
  },
  'sprite03': {
    x: 557 * 2,
    y: 0,
    w: 557,
    h: 557
  },
  'sprite04': {
    x: 557 * 3,
    y: 0,
    w: 557,
    h: 557
  },
  'sprite05': {
    x: 557 * 4,
    y: 0,
    w: 557,
    h: 557
  },
  'sprite06': {
    x: 557 * 5,
    y: 0,
    w: 557,
    h: 557
  },
};

const imageCanvas = document.getElementById('canvas-image');
let imageBox;

getSpritesFromCanvas('data/img/dice.png', sprites)
  .then(images => {
    imageBox = new Box(imageCanvas, {
      images,
      ratio: window.devicePixelRatio
    });
  });

function getSpritesFromCanvas(spriteSheet, sprites) {
  return new Promise((resolve, reject) => {
    const loadedSprites = [];
    const loadedSpriteSheet = new Image();

    loadedSpriteSheet.src = spriteSheet;
    loadedSpriteSheet.onload = () => {
      Object
        .keys(sprites)
        .forEach(name => {
          loadedSprites.push(getSprite(loadedSpriteSheet, sprites, name));
        });
      resolve(loadedSprites);
    };
    loadedSpriteSheet.onerror = e => {
      reject(e);
    }
  });
}

function getSprite(spriteSheet, sprites, spriteName) {
  const canvas = document.createElement('CANVAS');
  const ctx = canvas.getContext('2d');
  const sprite = sprites[spriteName];

  canvas.width = sprite.w;
  canvas.height = sprite.h;
  ctx.drawImage(spriteSheet,
    sprite.x, sprite.y, sprite.w, sprite.h,
    0, 0, sprite.w, sprite.h
  );

  return canvas;
}

const createImageBitmapCanvas = document.getElementById('canvas-image-bitmap');
let imageBitmapBox;

getSpritesFromImageBitmap('data/img/dice.png', sprites)
  .then(images => {
    imageBitmapBox = new Box(createImageBitmapCanvas, {
      images,
      ratio: window.devicePixelRatio,
    });
  });

function getSpritesFromImageBitmap(spriteSheet, sprites) {
  return new Promise((resolve, reject) => {
    const bitmaps = [];
    const loadedSpriteSheet = new Image();

    loadedSpriteSheet.src = spriteSheet;
    loadedSpriteSheet.onload = () => {
      Object
        .keys(sprites)
        .forEach(name => {
          const sprite = sprites[name];
          bitmaps.push(
            createImageBitmap(loadedSpriteSheet, sprite.x, sprite.y, sprite.w, sprite.h)
          );
        });
      Promise
        .all(bitmaps)
        .then(loadedBitmap => {
          resolve(loadedBitmap);
        });
    };
    loadedSpriteSheet.onerror = e => {
      reject(e);
    }
  });
}

window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
  const container = document.getElementById('container');
  const width = container.clientWidth;
  const height = container.clientHeight;

  imageBox.resize(width, height);
  imageBitmapBox.resize(width, height);
}
