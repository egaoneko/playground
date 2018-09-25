const map = new ol.Map({
  layers: [],
  target: document.getElementById('map'),
  view: new ol.View({
    center: [0, 0],
    zoom: 5
  })
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
  .then(images => {

    const iconCount = images.length;
    const icons = new Array(iconCount);
    for (let i = 0; i < iconCount; ++i) {
      const image = images[i];
      icons[i] = new ol.style.Icon({
        scale: 1.0,
        crossOrigin: 'anonymous',
        imgSize: [image.width, image.height],
        img: image
      });
    }

    const featureCount = 500;
    const features = new Array(featureCount);
    const e = 25000000;

    for (let i = 0; i < featureCount; ++i) {
      const geometry = new ol.geom.Point(
        [2 * e * Math.random() - e, 2 * e * Math.random() - e]);
      const feature = new ol.Feature(geometry);
      feature.setStyle(
        new ol.style.Style({
          image: icons[i % (iconCount - 1)]
        })
      );
      features[i] = feature;
    }

    const vectorSource = new ol.source.Vector({
      features: features
    });
    const vector = new ol.layer.Vector({
      source: vectorSource
    });

    map.addLayer(vector);
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

map.on('click', function(evt) {
  const info = document.getElementById('info');
  info.innerHTML =
    'Hold on a second, while I catch those butterflies for you ...';

  window.setTimeout(function() {
    const features = [];
    map.forEachFeatureAtPixel(evt.pixel, function(feature) {
      features.push(feature);
      return false;
    });

    if (features.length === 1) {
      info.innerHTML = 'Got one butterfly';
    } else if (features.length > 1) {
      info.innerHTML = 'Got ' + features.length + ' butterflies';
    } else {
      info.innerHTML = 'Couldn\'t catch a single butterfly';
    }
  }, 1);
});

map.on('pointermove', function(evt) {
  if (evt.dragging) {
    return;
  }
  const pixel = map.getEventPixel(evt.originalEvent);
  const hit = map.hasFeatureAtPixel(pixel);
  map.getTarget().style.cursor = hit ? 'pointer' : '';
});
