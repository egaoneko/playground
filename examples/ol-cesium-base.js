const raster = new ol.layer.Tile({
  source: new ol.source.OSM()
});

const map = new ol.Map({
  layers: [raster],
  target: 'map',
  view: new ol.View({
    center: [-11000000, 4600000],
    zoom: 4
  }),
});

const ol3d = new olcs.OLCesium({map: map}); // map is the ol.Map instance

let show = true;
ol3d.setEnabled(show);

const btn = document.querySelector('#toggle');
btn.addEventListener('click', () => {
  show = !show;
  ol3d.setEnabled(show);
});

