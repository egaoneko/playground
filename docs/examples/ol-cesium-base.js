(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{24:function(e,n){var o=new ol.layer.Tile({source:new ol.source.OSM}),l=new ol.Map({layers:[o],target:"map",view:new ol.View({center:[-11e6,46e5],zoom:4})}),w=new olcs.OLCesium({map:l}),a=!0;w.setEnabled(a),document.querySelector("#toggle").addEventListener("click",function(){a=!a,w.setEnabled(a)})}},[[24,0]]]);
//# sourceMappingURL=ol-cesium-base.js.map