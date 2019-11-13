import routes from './utils/map/geojson/routes';
import interpolateLineRange from './utils/map/interpolate-line-range';

var iPathCoords = turf.coordAll({
  type: 'FeatureCollection',
  features: routes.features.filter(
    feature => turf.getType(feature) === 'LineString'
  )
});
var iCoords = interpolateLineRange(iPathCoords, 60, 0.0000000001);
var iPoints = [];
for (var i = 0; i < iCoords.length; i++) {
  iPoints.push(turf.point(iCoords[i]));
}
var iPointColl = turf.featureCollection(iPoints);
console.log(iPointColl);

let markerIndex = 0;
const markerSource = new ol.source.Vector({
  features: new ol.format.GeoJSON().readFeatures(
    turf.point(iCoords[markerIndex])
  )
});
const markerLayer = new ol.layer.Vector({
  source: markerSource,
  style: [
    new ol.style.Style({
      image: new ol.style.Circle({
        radius: 5,
        fill: new ol.style.Fill({ color: 'black' }),
        stroke: null
      })
    })
  ]
});

const map = new ol.Map({
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM()
    }),
    new ol.layer.Vector({
      source: new ol.source.Vector({
        features: new ol.format.GeoJSON().readFeatures(routes)
      }),
      style: [
        new ol.style.Style({
          stroke: new ol.style.Stroke({
            color: 'rgba(91,113,171,1.0)',
            width: 3
          })
        })
      ]
    }),
    new ol.layer.Vector({
      source: new ol.source.Vector({
        features: new ol.format.GeoJSON().readFeatures(iPointColl)
      }),
      style: [
        new ol.style.Style({
          image: new ol.style.Circle({
            radius: 5,
            fill: null,
            stroke: new ol.style.Stroke({ color: 'red', width: 1 })
          })
        })
      ]
    }),
    markerLayer
  ],
  target: 'map',
  view: new ol.View({
    projection: 'EPSG:4326',
    center: [128.14661701618905, 36.36145824363314],
    zoom: 8
  })
});

var last = 0; // timestamp of the last render() call
function render(now) {
  // each 2 seconds move marker
  if (!last || now - last >= 1 * 1000) {
    last = now;
    markerIndex += 1;
    if (markerIndex > iCoords.length - 1) {
      return;
    }
    markerSource.clear();
    markerSource.addFeatures(
      new ol.format.GeoJSON().readFeatures(turf.point(iCoords[markerIndex]))
    );
  }
  requestAnimationFrame(render);
}
requestAnimationFrame(render);

window.DEBUG = {
  map
};
