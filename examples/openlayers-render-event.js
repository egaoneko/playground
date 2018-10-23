const rasterTile1 = new ol.layer.Tile({
  source: new ol.source.OSM()
});

const rasterTile2 = new ol.layer.Tile({
  source: new ol.source.OSM()
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

const vector1 = new ol.layer.Vector({
  source: new ol.source.Vector({
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
  }),
  style: () => {
    console.log(`%cvector1`, `background-color: red; color: white`);
    return styleFunction('magenta');
  }
});

const vector2 = new ol.layer.Vector({
  source: new ol.source.Vector({
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
  }),
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
  ['precompose', '#8be9fd'],
  ['postcompose', '#50fa7b'],
  ['render', '#ffb86c'],
  ['postrender', '#ff79c6'],
  ['rendercomplete', '#bd93f9'],
  // ['', '#ff5555'],
  // ['', '#f1fa8c'],
].forEach(([type, typeColor]) => {
  [
    [map, 'map', '#0074D9'],
    [rasterTile1, 'rasterTile1', '#7FDBFF'],
    [rasterTile2, 'rasterTile2', '#01FF70'],
    [vectorTile, 'vectorTile', '#39CCCC'],
    [vector1, 'vector1', '#3D9970'],
    [vector2, 'vector2', '#2ECC40'],
    // [null, '', '#FFDC00'],
    // [null, '', '#FF851B'],
    // [null, '', '#FF4136'],
    // [null, '', '#85144b'],
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
