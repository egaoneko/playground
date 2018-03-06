var map = new naver.maps.Map('map');

var jeju = new naver.maps.LatLng(33.3590628, 126.534361);

map.setCenter(jeju); // 중심 좌표 이동
map.setZoom(13);     // 줌 레벨 변경

var seoul = new naver.maps.LatLngBounds(
    new naver.maps.LatLng(37.42829747263545, 126.76620435615891),
    new naver.maps.LatLng(37.7010174173061, 127.18379493229875)
);

map.fitBounds(seoul); // 좌표 경계 이동

map.panBy(new naver.maps.Point(10, 10)); // 우측 하단으로 10 픽셀 이동