(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{14:function(e,n){var t=new naver.maps.Map("map",{center:new naver.maps.LatLng(37.5666805,126.9784147),zoom:4}),a=new naver.maps.LatLng(33.3590628,126.534361),o=new naver.maps.LatLng(35.1797865,129.0750194),r=new naver.maps.LatLngBounds(new naver.maps.LatLng(37.2380651,131.8562652),new naver.maps.LatLng(37.2444436,131.8786475)),c=new naver.maps.LatLngBounds(new naver.maps.LatLng(37.42829747263545,126.76620435615891),new naver.maps.LatLng(37.7010174173061,127.18379493229875));document.querySelector("#to-jeju").addEventListener("click",function(e){e.preventDefault(),t.setCenter(a)}),document.querySelector("#to-1").addEventListener("click",function(e){e.preventDefault(),t.setZoom(1,!0)}),document.querySelector("#to-dokdo").addEventListener("click",function(e){e.preventDefault(),t.fitBounds(r)}),document.querySelector("#to-busan").addEventListener("click",function(e){e.preventDefault(),t.panTo(o)}),document.querySelector("#to-seoul").addEventListener("click",function(e){e.preventDefault(),t.panToBounds(c)}),document.querySelector("#panBy").addEventListener("click",function(e){e.preventDefault(),t.panBy(new naver.maps.Point(10,10))})}},[[14,0]]]);
//# sourceMappingURL=naver-map-basic.js.map