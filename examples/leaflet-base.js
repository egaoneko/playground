const accessToken = 'pk.eyJ1IjoiZWdhb25la28iLCJhIjoiY2pkYnJtdWg4N3Y0ejMzbzV2NHkzanJodCJ9.509Ns7trg6hi_lZKGyWzew';
const map = L.map('map').setView([37.49229399862877, -96.94335937500001], 4);
const tileLayer = L.tileLayer(`https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=${accessToken}`, {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  id: 'mapbox.streets',
  accessToken: 'your.mapbox.access.token'
});

map.addLayer(tileLayer);

tileLayer.on('load', () => {
  Array.from(document.getElementsByClassName('leaflet-tile')).forEach((tile) => {
    tile.style.height = (tile.clientHeight + 1) + 'px';
    tile.style.width = (tile.clientWidth + 1) + 'px';
  });
});
