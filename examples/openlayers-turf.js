const coordinates = [
  [
    127.09610939025879,
    37.351464686498815
  ],
  [
    127.10108757019043,
    37.35214697629814
  ],
  [
    127.10505723953246,
    37.354739620980915
  ],
  [
    127.10668802261353,
    37.35787796578827
  ],
  [
    127.10939168930054,
    37.35895247760407
  ],
  [
    127.11222410202026,
    37.36563798323926
  ],
  [
    127.11662292480467,
    37.352129919128714
  ],
  [
    127.11984157562254,
    37.358730754203336
  ]
];

let geojson;
let collection;

geojson = {
  'type': 'FeatureCollection',
  'features': [
    {
      'type': 'Feature',
      'properties': {},
      'geometry': {
        'type': 'LineString',
        'coordinates': coordinates
      }
    }
  ]
};

const vector1 = new ol.layer.Vector({
  source: new ol.source.Vector({
    features: (new ol.format.GeoJSON()).readFeatures(geojson)
  }),
  style: [
    new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: 'rgba(91,113,171,1.0)',
        width: 3
      })
    }),
  ]
});

const line = turf.lineString(coordinates);
const bbox = turf.bbox(line);
const bboxPolygon = turf.bboxPolygon(bbox);

const vector2 = new ol.layer.Vector({
  source: new ol.source.Vector({
    features: (new ol.format.GeoJSON()).readFeatures(bboxPolygon)
  }),
  style: [
    new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: 'rgba(42,53,81,1.0)',
        width: 3
      }),
      fill: new ol.style.Fill({
        color: 'rgba(42,53,81,0.1)'
      })
    }),
  ]
});

geojson = {
  'type': 'FeatureCollection',
  'features': [
    {
      'type': 'Feature',
      'properties': {},
      'geometry': {
        'type': 'LineString',
        'coordinates': [[bbox[0], bbox[3]], [bbox[2], bbox[1]]]
      }
    },
    {
      'type': 'Feature',
      'properties': {},
      'geometry': {
        'type': 'LineString',
        'coordinates': [[bbox[0], bbox[1]], [bbox[2], bbox[3]]]
      }
    }
  ]
};

const vector3 = new ol.layer.Vector({
  source: new ol.source.Vector({
    features: (new ol.format.GeoJSON()).readFeatures(geojson)
  }),
  style: [
    new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: 'rgba(42,53,81,1.0)',
        width: 3
      })
    }),
  ]
});

const origin = turf.lineString(coordinates);
const line1 = turf.lineString([[bbox[0], bbox[3]], [bbox[2], bbox[1]]]);
const line2 = turf.lineString([[bbox[0], bbox[1]], [bbox[2], bbox[3]]]);
const intersects1 = turf.lineIntersect(origin, line1);
const intersects2 = turf.lineIntersect(origin, line2);

let collectionFeatures = [];
collectionFeatures = collectionFeatures.concat(intersects1.features);
collectionFeatures = collectionFeatures.concat(intersects2.features);

function getBBoxOnLine(coordinates) {
  const size = coordinates.length;
  const bboxes = [];

  for (let i = 0; i < size - 2; i++) {
    bboxes.push([...coordinates[i], ...coordinates[i + 1]]);
  }

  return bboxes;
}

collectionFeatures = collectionFeatures.concat(
  getBBoxOnLine(coordinates)
    .map((bbox) => {
      return turf.bboxPolygon(bbox);
    })
);

collection = turf.featureCollection(collectionFeatures);

const vector4 = new ol.layer.Vector({
  source: new ol.source.Vector({
    features: (new ol.format.GeoJSON()).readFeatures(collection)
  }),
  style: (f) => {
    console.log();

    const type = f.getGeometry().getType();
    if (type === 'Point') {
      return new ol.style.Style({
        image: new ol.style.Circle({
          radius: 10,
          fill: null,
          stroke: new ol.style.Stroke({
            color: 'rgba(249,99,99,1.0)',
            width: 2
          })
        })
      });
    } else if (type === 'Polygon') {
      return new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: 'rgba(249,99,99,1.0)',
          width: 2
        })
      })
    }
  }
});

const map = new ol.Map({
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM()
    }),
    vector3,
    vector2,
    vector1,
    vector4,
  ],
  target: 'map',
  view: new ol.View({
    projection: 'EPSG:4326',
    center: [127.10534, 37.35941],
    zoom: 15
  })
});

window.DEBUG = {
  map,
};
