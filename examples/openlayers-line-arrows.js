const raster = new ol.layer.Tile({
  source: new ol.source.OSM()
});

const source = new ol.source.Vector();

const styleFunction = function (feature) {
  const geometry = feature.getGeometry();
  const styles = [
    // linestring
    new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: '#ffffff',
        width: 2
      })
    })
  ];

  const step = getCoordinateStepFromPixel(map, 10);
  const extent = map.getView().calculateExtent(map.getSize());

  let prev = 0;
  let segment = 0;
  let arrows = 0;
  geometry.forEachSegment(function (start, end) {
    segment++;

    const dx = end[0] - start[0];
    const dy = end[1] - start[1];
    const rotation = Math.atan2(dy, dx);

    // arrows
    const distance = Math.sqrt((dx * dx) + (dy * dy));
    const fracStep = step / distance;
    const prevFrac = prev / distance;
    let point;

    styles.push(new ol.style.Style({
      geometry: new ol.geom.Point(end),
      image: new ol.style.Circle({
        radius: 3,
        fill: new ol.style.Fill({
          color: '#0ff000'
        })
      })
    }));

    for (let frac = prevFrac; frac <= 1; frac += fracStep) {
      point = interpolate(start, end, frac);

      if (!ol.extent.containsCoordinate(extent, point)) {
        continue;
      }
      arrows++;

      styles.push(new ol.style.Style({
        geometry: new ol.geom.Point(point),
        image: new ol.style.Icon({
          src: 'data/img/arrow.png',
          anchor: [0.75, 0.5],
          rotateWithView: true,
          rotation: -rotation
        })
      }));
    }

    if (point) {
      const lastDx = end[0] - point[0];
      const lastDy = end[1] - point[1];
      const lastDistance = Math.sqrt((lastDx * lastDx) + (lastDy * lastDy));

      if (lastDistance > 0) {
        prev = step - lastDistance;
      } else {
        prev = 0;
      }
    } else {
      prev += distance - step;
    }
  });
  console.log(segment, arrows);

  // geometry.forEachSegment(function(start, end) {
  //     const dx = end[0] - start[0];
  //     const dy = end[1] - start[1];
  //     const rotation = Math.atan2(dy, dx);
  //     // arrows
  //     styles.push(new ol.style.Style({
  //         geometry: new ol.geom.Point(end),
  //         image: new ol.style.Icon({
  //             src: 'arrow2.png',
  //             anchor: [0.75, 0.5],
  //             rotateWithView: true,
  //             rotation: -rotation
  //         })
  //     }));
  // });

  return styles;
};
const vector = new ol.layer.Vector({
  source: source,
  style: styleFunction
});

const map = new ol.Map({
  layers: [raster, vector],
  target: 'map',
  view: new ol.View({
    center: [-11000000, 4600000],
    zoom: 4
  })
});

map.addInteraction(new ol.interaction.Draw({
  source: source,
  type: 'LineString'
}));

function interpolate(a, b, frac) // points A and B, frac between 0 and 1
{
  const nx = a[0] + (b[0] - a[0]) * frac;
  const ny = a[1] + (b[1] - a[1]) * frac;
  return [nx, ny];
}

function getCoordinateStepFromPixel(map, step) {
  return Math.abs(map.getCoordinateFromPixel([step, 0])[0] - map.getCoordinateFromPixel([0, 0])[0]);
}
