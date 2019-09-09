const accessToken = 'pk.eyJ1IjoiZWdhb25la28iLCJhIjoiY2pkYnJtdWg4N3Y0ejMzbzV2NHkzanJodCJ9.509Ns7trg6hi_lZKGyWzew';
const container = document.querySelector('#map');
const deckgl = new deck.DeckGL({
  container: container,
  mapboxApiAccessToken: accessToken,
  mapStyle: 'mapbox://styles/mapbox/dark-v9',
  longitude: -1.4157,
  latitude: 52.2324,
  zoom: 6,
  minZoom: 5,
  maxZoom: 15,
  pitch: 40.5
});

const data = d3.csv('https://raw.githubusercontent.com/uber-common/deck.gl-data/master/examples/3d-heatmap/heatmap-data.csv');

const COLOR_RANGE = [
  [1, 152, 189],
  [73, 227, 206],
  [216, 254, 181],
  [254, 237, 177],
  [254, 173, 84],
  [209, 55, 78]
];

renderLayer();

function renderLayer () {
  const hexagonLayer = new deck.HexagonLayer({
    id: 'heatmap',
    colorRange: COLOR_RANGE,
    data,
    elevationRange: [0, 1000],
    elevationScale: 250,
    extruded: true,
    getPosition: d => [Number(d.lng), Number(d.lat)],
    opacity: 1,
  });

  deckgl.setProps({
    layers: [hexagonLayer]
  });
}