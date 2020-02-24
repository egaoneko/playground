const accessToken =
  "pk.eyJ1IjoiZWdhb25la28iLCJhIjoiY2pkYnJtdWg4N3Y0ejMzbzV2NHkzanJodCJ9.509Ns7trg6hi_lZKGyWzew";
const container = document.querySelector("#map");

const ambientLight = new deck.AmbientLight({
  color: [255, 255, 255],
  intensity: 1.0
});

const pointLight1 = new deck.PointLight({
  color: [255, 255, 255],
  intensity: 0.8,
  position: [-0.144528, 49.739968, 80000]
});

const pointLight2 = new deck.PointLight({
  color: [255, 255, 255],
  intensity: 0.8,
  position: [-3.807751, 54.104682, 8000]
});

const lightingEffect = new deck.LightingEffect({
  ambientLight,
  pointLight1,
  pointLight2
});

const material = {
  ambient: 0.64,
  diffuse: 0.6,
  shininess: 32,
  specularColor: [51, 51, 51]
};

const INITIAL_VIEW_STATE = {
  longitude: -1.4157267858730052,
  latitude: 52.232395363869415,
  zoom: 6.6,
  minZoom: 5,
  maxZoom: 15,
  pitch: 40.5,
  bearing: -27.396674584323023
};

const colorRange = [
  [1, 152, 189],
  [73, 227, 206],
  [216, 254, 181],
  [254, 237, 177],
  [254, 173, 84],
  [209, 55, 78]
];

const deckgl = new deck.DeckGL({
  container: container,
  controller: true,
  reuseMaps: true,
  mapboxApiAccessToken: accessToken,
  preventStyleDiffing: true,
  mapStyle: "mapbox://styles/mapbox/dark-v9",
  initialViewState: INITIAL_VIEW_STATE
});

function renderLayer(props) {
  const { data, radius = 1000, upperPercentile = 100, coverage = 1 } = props;

  const hexagonLayer = new deck.HexagonLayer({
    id: "heatmap",
    colorRange,
    coverage,
    data,
    elevationRange: [0, 3000],
    elevationScale: data && data.length ? 50 : 0,
    extruded: true,
    getPosition: d => d,
    radius,
    upperPercentile,
    material,

    transitions: {
      elevationScale: 3000
    }
  });

  deckgl.setProps({
    layers: [hexagonLayer],
    effects: [lightingEffect]
  });
}

d3.csv(
  'https://raw.githubusercontent.com/uber-common/deck.gl-data/master/examples/3d-heatmap/heatmap-data.csv'
).then(data => {
  data = data.map(d => [Number(d.lng), Number(d.lat)]);
  renderLayer({
    data
  });
});