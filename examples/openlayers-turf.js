let coordinates;

// coordinates = [
//   [
//     127.09610939025879,
//     37.351464686498815
//   ],
//   [
//     127.10108757019043,
//     37.35214697629814
//   ],
//   [
//     127.10505723953246,
//     37.354739620980915
//   ],
//   [
//     127.10668802261353,
//     37.35787796578827
//   ],
//   [
//     127.10939168930054,
//     37.35895247760407
//   ],
//   [
//     127.11222410202026,
//     37.36563798323926
//   ],
//   [
//     127.11662292480467,
//     37.352129919128714
//   ],
//   [
//     127.11984157562254,
//     37.358730754203336
//   ]
// ];

// coordinates = [
//   [
//     127.09726810455322,
//     37.35509780827176
//   ],
//   [
//     127.10087299346922,
//     37.36492170755341
//   ],
//   [
//     127.10422039031981,
//     37.35796324506581
//   ],
//   [
//     127.10692405700685,
//     37.352419890481514
//   ],
//   [
//     127.11267471313475,
//     37.35020243402261
//   ],
//   [
//     127.11718082427977,
//     37.35721278409788
//   ],
//   [
//     127.11949825286865,
//     37.36285811318619
//   ],
//   [
//     127.12260961532593,
//     37.364068989488395
//   ],
//   [
//     127.12679386138916,
//     37.354364375319165
//   ]
// ];

coordinates = [
  [
    127.09359884262085,
    37.35185700389112
  ],
  [
    127.09507942199708,
    37.35815085913536
  ],
  [
    127.09840536117554,
    37.364614730166345
  ],
  [
    127.10488557815552,
    37.35966881026814
  ],
  [
    127.10492849349976,
    37.35554127588281
  ],
  [
    127.1119236946106,
    37.35364799202858
  ],
  [
    127.11548566818237,
    37.361459612015395
  ],
  [
    127.11984157562254,
    37.366746491654546
  ],
  [
    127.1242833137512,
    37.35941297795872
  ],
  [
    127.12857484817505,
    37.35567772692831
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

const mid = [(bbox[0] + bbox[2]) * 0.5, (bbox[1] + bbox[3]) * 0.5];
const lines = [
  [[bbox[0], bbox[1]], mid],
  [[bbox[2], bbox[3]], mid],
  [[bbox[2], bbox[1]], mid],
  [[bbox[0], bbox[3]], mid]
];

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
  'features': lines.map(line => {
    return {
      'type': 'Feature',
      'properties': {},
      'geometry': {
        'type': 'LineString',
        'coordinates': line
      }
    };
  }),
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

let collectionFeatures = [];
collectionFeatures = collectionFeatures.concat(lines.map(line => {
    return turf.lineIntersect(origin, turf.lineString(line))
  })
    .reduce((prev, current) => {
      return prev.concat(current.features);
    }, [])
);

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
