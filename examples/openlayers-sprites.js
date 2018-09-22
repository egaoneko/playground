const iconInfo = [{
  offset: [0, 0],
  opacity: 1.0,
  rotateWithView: true,
  rotation: 0.0,
  scale: 1.0,
  size: [55, 55]
}, {
  offset: [110, 86],
  opacity: 0.75,
  rotateWithView: false,
  rotation: Math.PI / 2.0,
  scale: 1.25,
  size: [55, 55]
}, {
  offset: [55, 0],
  opacity: 0.5,
  rotateWithView: true,
  rotation: Math.PI / 3.0,
  scale: 1.5,
  size: [55, 86]
}, {
  offset: [212, 0],
  opacity: 1.0,
  rotateWithView: true,
  rotation: 0.0,
  scale: 1.0,
  size: [44, 44]
}];

const iconCount = iconInfo.length;
const icons = new Array(iconCount);
for (let i = 0; i < iconCount; ++i) {
  const info = iconInfo[i];
  icons[i] = new ol.style.Icon({
    offset: info.offset,
    opacity: info.opacity,
    rotateWithView: info.rotateWithView,
    rotation: info.rotation,
    scale: info.scale,
    size: info.size,
    crossOrigin: 'anonymous',
    src: 'data/img/butterfly.png'
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

const map = new ol.Map({
  layers: [vector],
  target: document.getElementById('map'),
  view: new ol.View({
    center: [0, 0],
    zoom: 5
  })
});

const overlayFeatures = [];
for (let i = 0; i < featureCount; i += 30) {
  const clone = features[i].clone();
  clone.setStyle(null);
  overlayFeatures.push(clone);
}

new ol.layer.Vector({
  map: map,
  source: new ol.source.Vector({
    features: overlayFeatures
  }),
  style: new ol.style.Style({
    image: icons[iconCount - 1]
  })
});

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
