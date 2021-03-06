const logEle = document.querySelector('#log');

const map = new ol.Map({
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM()
    }),
    new ol.layer.Tile({
      source: new ol.source.TileDebug({
        projection: 'EPSG:3857',
        tileGrid: new ol.source.OSM().getTileGrid()
      }),
    })
  ],
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
  ['pointerdown', '#FF851B'],
  ['pointerup', '#FF4136'],
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
  const p = document.createElement('p');
  p.innerHTML = `${type}`;
  logEle.appendChild(p);
  logEle.scrollTop = logEle.scrollHeight;
}

window.DEBUG = {
  map,
};
