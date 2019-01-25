const map = new ol.Map({
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM()
    }),
  ],
  target: 'map',
  view: new ol.View({
    projection: 'EPSG:4326',
    center: [127.10534,37.35941],
    zoom: 15
  })
});

window.DEBUG = {
  map,
};
