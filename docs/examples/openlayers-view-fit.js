(window.webpackJsonp=window.webpackJsonp||[]).push([[28],{33:function(n,e){var o=new ol.layer.Tile({source:new ol.source.OSM}),t=new ol.Map({layers:[o],target:"map",view:new ol.View({center:[0,0],zoom:2})}),a=t.getView(),i={padding:[10,10,10,10],duration:350,easing:ol.easing.easeOut,constrainResolution:!1},r=document.querySelectorAll('input[type=checkbox][name="options"]'),c={padding:!1,animation:!1,constrainResolution:!0};Array.prototype.forEach.call(r,function(n){n.addEventListener("change",function(n){c[n.target.value]=n.target.checked})}),document.querySelector("#fit").addEventListener("click",function(){var n={};c.padding&&(n.padding=i.padding),c.animation&&(n.duration=i.duration,n.easing=i.easing),c.constrainResolution&&(n.constrainResolution=i.constrainResolution);var e=ol.proj.transformExtent([126.97053909301756,37.567984011320256,126.97053909301756,37.567984011320256],ol.proj.get("EPSG:4326"),ol.proj.get("EPSG:3857"));a.fit(e,n)}),window.DEBUG={map:t}}},[[33,0]]]);
//# sourceMappingURL=openlayers-view-fit.js.map