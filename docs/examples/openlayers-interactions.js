(window.webpackJsonp=window.webpackJsonp||[]).push([[22],{27:function(o,n){var e=new ol.layer.Tile({source:new ol.source.OSM}),t=document.querySelector("#map"),r=function(o){function n(){o.call(this,{handleDownEvent:i})}return o&&(n.__proto__=o),n.prototype=Object.create(o&&o.prototype),n.prototype.constructor=n,n}(ol.interaction.Pointer);function i(){t.focus()}new ol.Map({interactions:ol.interaction.defaults({doubleClickZoom:!1,dragAndDrop:!1,dragPan:!1,keyboardPan:!1,keyboardZoom:!1,mouseWheelZoom:!1,pointer:!1,select:!1}).extend([new r({condition:function(){return!0}}),new ol.interaction.DragPan({kinetic:new ol.Kinetic(-.02,.02,100),condition:function(){return!0}}),new ol.interaction.KeyboardPan({condition:function(){return!0}})]),layers:[e],target:"map",view:new ol.View({center:[-11e6,46e5],zoom:4}),keyboardEventTarget:t})}},[[27,0]]]);
//# sourceMappingURL=openlayers-interactions.js.map