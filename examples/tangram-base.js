const map = L.map('map');
const layer = Tangram.leafletLayer({ 
  scene: 'data/tangram/scene.yaml',
  attribution: '<a href="https://mapzen.com/tangram" target="_blank">Tangram</a> | &copy; OSM contributors'
});
layer.addTo(map);
map.setView([40.70531887544228, -74.00976419448853], 15);