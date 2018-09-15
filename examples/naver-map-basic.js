const map = new naver.maps.Map('map', {
  center: new naver.maps.LatLng(37.5666805, 126.9784147),
  zoom: 4
});

const jeju = new naver.maps.LatLng(33.3590628, 126.534361),
  busan = new naver.maps.LatLng(35.1797865, 129.0750194),
  dokdo = new naver.maps.LatLngBounds(
    new naver.maps.LatLng(37.2380651, 131.8562652),
    new naver.maps.LatLng(37.2444436, 131.8786475)),
  seoul = new naver.maps.LatLngBounds(
    new naver.maps.LatLng(37.42829747263545, 126.76620435615891),
    new naver.maps.LatLng(37.7010174173061, 127.18379493229875));

document.querySelector("#to-jeju").addEventListener("click", function (e) {
  e.preventDefault();

  map.setCenter(jeju);
});

document.querySelector("#to-1").addEventListener("click", function (e) {
  e.preventDefault();

  map.setZoom(1, true);
});

document.querySelector("#to-dokdo").addEventListener("click", function (e) {
  e.preventDefault();

  map.fitBounds(dokdo);
});

document.querySelector("#to-busan").addEventListener("click", function (e) {
  e.preventDefault();

  map.panTo(busan);
});

document.querySelector("#to-seoul").addEventListener("click", function (e) {
  e.preventDefault();

  map.panToBounds(seoul);
});

document.querySelector("#panBy").addEventListener("click", function (e) {
  e.preventDefault();

  map.panBy(new naver.maps.Point(10, 10));
});
