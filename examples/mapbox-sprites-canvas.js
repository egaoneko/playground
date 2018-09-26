const key = 'pk.eyJ1IjoiZWdhb25la28iLCJhIjoiY2pkYnJtdWg4N3Y0ejMzbzV2NHkzanJodCJ9.509Ns7trg6hi_lZKGyWzew';
mapboxgl.accessToken = key;

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v9',
  center: [0, 0],
  zoom: 1
});

const sprites = {
  'sprite01': {
    x: 0,
    y: 0,
    w: 55,
    h: 55
  },
  'sprite02': {
    x: 110,
    y: 86,
    w: 55,
    h: 55
  },
  'sprite03': {
    x: 55,
    y: 0,
    w: 55,
    h: 86
  },
  'sprite04': {
    x: 212,
    y: 0,
    w: 44,
    h: 44
  }
};

getSpritesFromCanvas('data/img/butterfly.png', sprites)
  .then(sprites => {

    const spritesCount = sprites.length;
    const images = new Array(spritesCount);
    for (let i = 0; i < spritesCount; ++i) {
      const [name, image] = sprites[i];
      const ctx = image.getContext('2d');
      map.addImage(name, ctx.getImageData(0, 0, image.width, image.height));
      images[i] = name;
    }

    const featureCount = 500;
    const features = new Array(featureCount);
    const lng = 180;
    const lat = 90;
    for (let i = 0; i < featureCount; ++i) {
      features[i] = {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [2 * lng * Math.random() - lng, 2 * lat * Math.random() - lat],
        },
        properties: {
          icon: images[i % (spritesCount - 1)]
        }
      };
    }

    map.addSource(
      "points",
      {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: features,
        }
      });

    map.addLayer({
      "id": "points",
      "type": "symbol",
      "source": "points",
      "layout": {
        "icon-image": "{icon}",
        "icon-size": 1
      }
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
          loadedSprites.push([name, getSprite(loadedSpriteSheet, sprites, name)]);
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
