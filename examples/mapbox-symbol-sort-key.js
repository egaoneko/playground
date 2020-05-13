const key =
  "pk.eyJ1IjoiZWdhb25la28iLCJhIjoiY2pkYnJtdWg4N3Y0ejMzbzV2NHkzanJodCJ9.509Ns7trg6hi_lZKGyWzew";
mapboxgl.accessToken = key;

const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v9",
  center: [127.0276241, 37.49795268],
  zoom: 16,
});

map.on("style.load", () => {
  map.addSource("layer1", {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: {
            name: "layer1-1",
            rank: 1,
          },
          geometry: {
            type: "Point",
            coordinates: [127.02808856964111, 37.499316593375475],
          },
        },
        {
          type: "Feature",
          properties: {
            name: "layer1-2",
            rank: 1,
          },
          geometry: {
            type: "Point",
            coordinates: [127.02973008155821, 37.497818495242214],
          },
        },
        {
          type: "Feature",
          properties: {
            name: "layer1-3",
            rank: 1,
          },
          geometry: {
            type: "Point",
            coordinates: [127.02741265296936, 37.49913784460912],
          },
        },
        {
          type: "Feature",
          properties: {
            name: "layer1-4",
            rank: 1,
          },
          geometry: {
            type: "Point",
            coordinates: [127.02916145324706, 37.49899314291346],
          },
        },
        {
          type: "Feature",
          properties: {
            name: "layer1-5",
            rank: 1,
          },
          geometry: {
            type: "Point",
            coordinates: [127.02667236328126, 37.49671192618623],
          },
        },
        {
          type: "Feature",
          properties: {
            name: "layer1-6",
            rank: 1,
          },
          geometry: {
            type: "Point",
            coordinates: [127.02577114105223, 37.49897611916613],
          },
        },
        {
          type: "Feature",
          properties: {
            name: "layer1-7",
            rank: 0,
          },
          geometry: {
            type: "Point",
            coordinates: [127.02905416488647, 37.49889100037121],
          },
        },
        {
          type: "Feature",
          properties: {
            name: "layer1-8",
            rank: 0,
          },
          geometry: {
            type: "Point",
            coordinates: [127.02923655509947, 37.496924729201226],
          },
        },
        {
          type: "Feature",
          properties: {
            name: "layer1-9",
            rank: 1,
          },
          geometry: {
            type: "Point",
            coordinates: [127.0265543460846, 37.49835474973222],
          },
        },
        {
          type: "Feature",
          properties: {
            name: "layer1-10",
            rank: 0,
          },
          geometry: {
            type: "Point",
            coordinates: [127.02793836593628, 37.49867820295946],
          },
        },
      ],
    },
  });

  map.addLayer({
    id: "layer1",
    source: "layer1",
    type: "symbol",
    layout: {
      "text-field": ["concat", ["get", "name"], "(", ["get", "rank"], ")"],
      "text-size": 20,
      "symbol-sort-key": ["get", "rank"],
    },
    paint: {
      "text-color": ["match", ["get", "rank"], 0, "#CF1259", "#A5243D"],
    },
  });

  map.addSource("layer2", {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: {
            name: "layer2-1",
            rank: 1,
          },
          geometry: {
            type: "Point",
            coordinates: [127.02773988246918, 37.498550524221336],
          },
        },
        {
          type: "Feature",
          properties: {
            name: "layer2-2",
            rank: 1,
          },
          geometry: {
            type: "Point",
            coordinates: [127.02824413776399, 37.498980375103315],
          },
        },
        {
          type: "Feature",
          properties: {
            name: "layer2-3",
            rank: 0,
          },
          geometry: {
            type: "Point",
            coordinates: [127.02845335006714, 37.49839730944742],
          },
        },
        {
          type: "Feature",
          properties: {
            name: "layer2-4",
            rank: 0,
          },
          geometry: {
            type: "Point",
            coordinates: [127.02754139900208, 37.498942071659805],
          },
        },
        {
          type: "Feature",
          properties: {
            name: "layer2-5",
            rank: 1,
          },
          geometry: {
            type: "Point",
            coordinates: [127.0286840200424, 37.49876757794627],
          },
        },
        {
          type: "Feature",
          properties: {
            name: "layer2-6",
            rank: 0,
          },
          geometry: {
            type: "Point",
            coordinates: [127.02658116817473, 37.49829942206617],
          },
        },
        {
          type: "Feature",
          properties: {
            name: "layer2-7",
            rank: 1,
          },
          geometry: {
            type: "Point",
            coordinates: [127.02876448631285, 37.49780147122708],
          },
        },
        {
          type: "Feature",
          properties: {
            name: "layer2-8",
            rank: 1,
          },
          geometry: {
            type: "Point",
            coordinates: [127.02915072441101, 37.49701836233571],
          },
        },
        {
          type: "Feature",
          properties: {
            name: "layer2-9",
            rank: 1,
          },
          geometry: {
            type: "Point",
            coordinates: [127.02815294265746, 37.49734607738188],
          },
        },
        {
          type: "Feature",
          properties: {
            name: "layer2-10",
            rank: 1,
          },
          geometry: {
            type: "Point",
            coordinates: [127.02717125415802, 37.49746524613301],
          },
        },
      ],
    },
  });

  map.addLayer({
    id: "layer2",
    source: "layer2",
    type: "symbol",
    layout: {
      "text-field": ["concat", ["get", "name"], "(", ["get", "rank"], ")"],
      "text-size": 20,
      "symbol-sort-key": ["get", "rank"],
    },
    paint: {
      "text-color": ["match", ["get", "rank"], 0, "#4E8098", "#7F7EFF"],
    },
  });
});
