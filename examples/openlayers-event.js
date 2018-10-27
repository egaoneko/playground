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

// event
[
  ['click', '#0074D9'],
  ['dblclick', '#7FDBFF'],
  ['movestart', '#01FF70'],
  ['moveend', '#39CCCC'],
  ['pointerdrag', '#3D9970'],
  ['pointermove', '#2ECC40'],
  ['singleclick', '#FFDC00'],
  // ['', '#FF851B'],
  // ['', '#FF4136'],
  // ['', '#85144b'],
  // ['', '#F012BE'],
  // ['', '#B10DC9'],
  // ['', '#AAAAAA'],
  // ['', '#DDDDDD'],
].forEach(([type, typeColor]) => {
  map.on(type, ()=> {
    log(type, typeColor);
  });
});

function log(type, typeColor) {
  console.log(`%c${type}`, `color: ${typeColor}`);
}

window.DEBUG = {
  map,
};
