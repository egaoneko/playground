const rasterTile = new ol.layer.Tile({
  source: new ol.source.OSM()
});

const map = new ol.Map({
  layers: [rasterTile],
  target: 'map',
  view: new ol.View({
    center: [0, 0],
    zoom: 2
  })
});

const view = map.getView();
const options = {
  padding: [10, 10, 10 ,10],
  duration: 350,
  easing: ol.easing.easeOut,
  constrainResolution: false,
};

const optionsEle = document.querySelectorAll('input[type=checkbox][name="options"]');
const optionsMarker = {
  padding: false,
  animation: false,
  constrainResolution: true
};

Array.prototype.forEach.call(optionsEle, optionEle => {
  optionEle.addEventListener('change', (e) => {
    optionsMarker[e.target.value] = e.target.checked;
  });
});

document.querySelector('#fit').addEventListener('click', () => {
  const opts = {};

  if (optionsMarker.padding) {
    opts.padding = options.padding;
  }

  if (optionsMarker.animation) {
    opts.duration = options.duration;
    opts.easing = options.easing;
  }

  if (optionsMarker.constrainResolution) {
    opts.constrainResolution = options.constrainResolution;
  }

  const boundingExtent = ol.proj.transformExtent(
    [126.97053909301756, 37.567984011320256, 126.97053909301756, 37.567984011320256],
    ol.proj.get('EPSG:4326'),
    ol.proj.get('EPSG:3857')
  );

  view.fit(boundingExtent, opts);
});

window.DEBUG = {
  map,
};
