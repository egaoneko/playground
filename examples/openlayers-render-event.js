const source1 = new ol.source.OSM();
const rasterTile1 = new ol.layer.Tile({
  source: source1,
});

const source2 = new ol.source.OSM();
const rasterTile2 = new ol.layer.Tile({
  source: source2,
});

const styleFunction = (color) => {
  return new ol.style.Style({
    image: new ol.style.Circle({
      radius: 10,
      fill: null,
      stroke: new ol.style.Stroke({
        color: color
      })
    })
  });
};

const source3 = new ol.source.Vector({
  features: (new ol.format.GeoJSON()).readFeatures({
    'type': 'FeatureCollection',
    'crs': {
      'type': 'name',
      'properties': {
        'name': 'EPSG:3857'
      }
    },
    'features': [{
      'type': 'Feature',
      'geometry': {
        'type': 'Point',
        'coordinates': getRandomCoordinates()
      }
    }]
  })
});

const vector1 = new ol.layer.Vector({
  source: source3,
  style: () => {
    console.log(`%cvector1`, `background-color: red; color: white`);
    return styleFunction('magenta');
  }
});

const source4 = new ol.source.Vector({
  features: (new ol.format.GeoJSON()).readFeatures({
    'type': 'FeatureCollection',
    'crs': {
      'type': 'name',
      'properties': {
        'name': 'EPSG:3857'
      }
    },
    'features': [{
      'type': 'Feature',
      'geometry': {
        'type': 'Point',
        'coordinates': getRandomCoordinates()
      }
    }]
  })
});

const vector2 = new ol.layer.Vector({
  source: source4,
  style: () => {
    console.log(`%cvector2`, `background-color: red; color: white`);
    return styleFunction('magenta');
  }
});

const vectorTile = new ol.layer.VectorTile({
  source: new ol.source.VectorTile({
    format: new ol.format.MVT(),
    url: 'https://basemaps.arcgis.com/v1/arcgis/rest/services/World_Basemap/VectorTileServer/tile/{z}/{y}/{x}.pbf'
  }),
  style: () => {
    console.log(`%cvectorTile`, `background-color: red; color: white`);
    return styleFunction('red');
  }
});

const map = new ol.Map({
  layers: [rasterTile1, rasterTile2, vectorTile, vector1],
  target: 'map',
  view: new ol.View({
    center: [0, 0],
    zoom: 2
  })
});

document
  .querySelector('#add-feature')
  .addEventListener('click', () => {
    const format = new ol.format.GeoJSON({
      featureProjection: 'EPSG:3857'
    });
    const geojson = {
      'type': 'FeatureCollection',
      'features': [{
        'type': 'Feature',
        'geometry': {
          'type': 'Point',
          'coordinates': [Math.random() * 360 - 180, Math.random() * 180 - 90]
        }
      }]
    };
    vector1.getSource().addFeatures(format.readFeatures(geojson));
  });

document
  .querySelector('#add-feature')
  .addEventListener('click', () => {
    const format = new ol.format.GeoJSON({
      featureProjection: 'EPSG:3857'
    });
    const geojson = {
      'type': 'FeatureCollection',
      'features': [{
        'type': 'Feature',
        'geometry': {
          'type': 'Point',
          'coordinates': getRandomCoordinates()
        }
      }]
    };
    vector1.getSource().addFeatures(format.readFeatures(geojson));
  });

document
  .querySelector('#add-layer')
  .addEventListener('click', () => {
    map.removeLayer(vector2);
    map.addLayer(vector2);
  });

document
  .querySelector('#refresh-source')
  .addEventListener('click', () => {
    vector1.getSource().refresh();
  });

document
  .querySelector('#set-zoom')
  .addEventListener('click', () => {
    map.getView().setZoom(map.getView().getZoom());
  });

// render event
[
  ['precompose', '#001f3f'],
  ['postcompose', '#0074D9'],
  ['render', '#7FDBFF'],
  ['postrender', '#39CCCC'],
  ['rendercomplete', '#3D9970'],
  ['tileloadstart', '#2ECC40'],
  ['tileloadend', '#01FF70'],
  ['tileloaderror', '#FFDC00'],
  // ['', '#FF851B'],
  // ['', '#FF4136'],
  // ['', '#85144b'],
  // ['', '#F012BE'],
  // ['', '#B10DC9'],
  // ['', '#111111'],
  // ['', '#AAAAAA'],
  // ['', '#DDDDDD'],
  // ['', '#FFFFFF'],
].forEach(([type, typeColor]) => {
  [
    [map, 'map', '#0074D9'],
    [rasterTile1, 'rasterTile1', '#7FDBFF'],
    [rasterTile2, 'rasterTile2', '#01FF70'],
    [vectorTile, 'vectorTile', '#39CCCC'],
    [vector1, 'vector1', '#3D9970'],
    [vector2, 'vector2', '#2ECC40'],
    [source1, 'source1', '#FFDC00'],
    [source2, 'source2', '#FF851B'],
    [source3, 'source3', '#FF4136'],
    [source4, 'source4', '#85144b'],
    // [null, '', '#F012BE'],
    // [null, '', '#B10DC9'],
    // [null, '', '#AAAAAA'],
    // [null, '', '#DDDDDD'],
  ].forEach(([context, contextName, contextColor]) => {
    context.on(type, function () {
      log([contextName, contextColor], [type, typeColor]);
    });
  });
});

function log([contextName, contextColor], [type, typeColor]) {
  console.log(`%c[${contextName}] %c${type}`, `color: ${contextColor}`, `color: ${typeColor}`);
}

function getRandomCoordinates() {
  return [Math.random() * 360 - 180, Math.random() * 180 - 90];
}

window.DEBUG = {
  map,
  rasterTile1,
  rasterTile2,
  vectorTile,
  vector1,
  vector2
};
