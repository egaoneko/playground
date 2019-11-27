const key =
  'pk.eyJ1IjoiZWdhb25la28iLCJhIjoiY2pkYnJtdWg4N3Y0ejMzbzV2NHkzanJodCJ9.509Ns7trg6hi_lZKGyWzew';
mapboxgl.accessToken = key;

const getURLParameters = url =>
  (url.match(/([^?=&]+)(=([^&]*))/g) || []).reduce(
    (a, v) => (
      (a[v.slice(0, v.indexOf('='))] = v.slice(v.indexOf('=') + 1)), a
    ),
    {}
  );

let search = getURLParameters(location.search);
let style = search.style
  ? decodeURIComponent(search.style)
  : 'mapbox://styles/mapbox/streets-v9';
let isMabox = style.includes('mapbox');

const encodeQueryData = data => {
  const ret = [];
  for (let d in data)
    ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
  return ret.join('&');
};

let controller;
const data = {
  style: style,
  extrusion: false
};
const gui = new dat.GUI();
const f1 = gui.addFolder('Style');
const f2 = gui.addFolder('Layer');

gui.remember(data);

controller = f1.add(data, 'style');
controller.onFinishChange(function(style) {
  if (!style) {
    style = 'mapbox://styles/mapbox/streets-v9';
  }

  const params = encodeQueryData(
    Object.assign({}, search, { style: style })
  );
  const url = location.pathname + '?' + params;

  history.pushState('', '', url);
  map.setStyle(style);
});

controller = f2.add(data, 'extrusion');
controller.onFinishChange(function(show) {
  const layers = map.getStyle().layers;

  if (isMabox) {
    showBuildingWithMapbox(layers, show);
  } else {
    showBuilding(layers, show);
  }
});

f1.open();
f2.open();

const map = new mapboxgl.Map({
  container: 'map',
  style: style,
  center: [127.0339581, 37.4845477],
  zoom: 15,
  localIdeographFontFamily: false
});

map.on('load', function() {
  // Insert the layer beneath any symbol layer.
  
});

function showBuildingWithMapbox(layers, show) {
  let labelLayerId;
  for (var i = 0; i < layers.length; i++) {
    if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
      labelLayerId = layers[i].id;
      break;
    }
  }

  if (show) {
    map.addLayer(
      {
        id: '3d-buildings',
        source: 'composite',
        'source-layer': 'building',
        filter: ['==', 'extrude', 'true'],
        type: 'fill-extrusion',
        minzoom: 15,
        paint: {
          'fill-extrusion-color': '#aaa',
  
          // use an 'interpolate' expression to add a smooth transition effect to the
          // buildings as the user zooms in
          'fill-extrusion-height': [
            'interpolate',
            ['linear'],
            ['zoom'],
            15,
            0,
            15.05,
            ['get', 'height']
          ],
          'fill-extrusion-base': [
            'interpolate',
            ['linear'],
            ['zoom'],
            15,
            0,
            15.05,
            ['get', 'min_height']
          ],
          'fill-extrusion-opacity': 0.6
        }
      },
      labelLayerId
    );
  } else {
    map.removeLayer('3d-buildings');
  }
}

function showBuilding(layers, show) {
  for (var i = 0; i < layers.length; i++) {
    if (layers[i].type !== 'fill-extrusion') {
      continue;
    }
    map.setLayoutProperty(layers[i].id, 'visibility', show ? 'visible' : 'none');
  }
}

window.DEBUG = {
  map
};
