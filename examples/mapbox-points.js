const key = 'pk.eyJ1IjoiZWdhb25la28iLCJhIjoiY2pkYnJtdWg4N3Y0ejMzbzV2NHkzanJodCJ9.509Ns7trg6hi_lZKGyWzew';
mapboxgl.accessToken = key;

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/egaoneko/cjee9xi2e3rqk2snprvd1lqid',
  center: [-87.645, 41.856],
  zoom: 8
});

map.on('click', function (e) {
  const features = map.queryRenderedFeatures(e.point, {
    layers: ['chicago-parks'] // replace this with the name of the layer
  });

  if (!features.length) {
    return;
  }

  const feature = features[0];

  new mapboxgl.Popup({offset: [0, -15]})
    .setLngLat(feature.geometry.coordinates)
    .setHTML('<h3>' + feature.properties.title + '</h3><p>' + feature.properties.description + '</p>')
    .setLngLat(feature.geometry.coordinates)
    .addTo(map);
});
