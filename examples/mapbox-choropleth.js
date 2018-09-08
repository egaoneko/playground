const key = 'pk.eyJ1IjoiZWdhb25la28iLCJhIjoiY2pkYnJtdWg4N3Y0ejMzbzV2NHkzanJodCJ9.509Ns7trg6hi_lZKGyWzew';
mapboxgl.accessToken = key;

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/egaoneko/cjdelce5t09nd2rnw8qpm8gu3',
});

map.on('load', function () {
  const layers = ['0-10', '10-20', '20-50', '50-100', '100-200', '200-500', '500-1000', '1000+'];
  const colors = ['#FFEDA0', '#FED976', '#FEB24C', '#FD8D3C', '#FC4E2A', '#E31A1C', '#BD0026', '#800026'];
  const legend = document.getElementById('legend');

  for (let i = 0; i < layers.length; i++) {
    const layer = layers[i];
    const color = colors[i];
    const item = document.createElement('div');
    const key = document.createElement('span');
    key.className = 'legend-key';
    key.style.backgroundColor = color;

    const value = document.createElement('span');
    value.innerHTML = layer;
    item.appendChild(key);
    item.appendChild(value);
    legend.appendChild(item);
  }

  map.getCanvas().style.cursor = 'default';
  map.fitBounds([[-133.2421875, 16.972741], [-47.63671875, 52.696361]]);
});

map.on('mousemove', function (e) {
  const states = map.queryRenderedFeatures(e.point, {
    layers: ['statedata-22dikt']
  });

  if (states.length > 0) {
    document.getElementById('pd').innerHTML = '<h3><strong>' +
      states[0].properties.name + '</strong></h3><p><strong><em>' +
      states[0].properties.density + '</strong> people per square mile</em></p>';
    map.getCanvas().style.cursor = 'pointer';
  } else {
    document.getElementById('pd').innerHTML = '<p>Hover over a state!</p>';
    map.getCanvas().style.cursor = 'default';
  }
});
