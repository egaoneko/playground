(window.webpackJsonp=window.webpackJsonp||[]).push([[24],{29:function(e,o){var n=document.querySelector("#log"),l=new ol.Map({layers:[new ol.layer.Tile({source:new ol.source.OSM}),new ol.layer.Tile({source:new ol.source.TileDebug({projection:"EPSG:3857",tileGrid:(new ol.source.OSM).getTileGrid()})})],target:"map",view:new ol.View({center:[0,0],zoom:2})});[["click","#0074D9"],["dblclick","#7FDBFF"],["movestart","#01FF70"],["moveend","#39CCCC"],["pointerdrag","#3D9970"],["pointermove","#2ECC40"],["singleclick","#FFDC00"],["pointerdown","#FF851B"],["pointerup","#FF4136"]].forEach(function(e){var o=e[0],r=e[1];l.on(o,function(){!function(e,o){console.log("%c"+e,"color: "+o);var l=document.createElement("p");l.innerHTML=""+e,n.appendChild(l),n.scrollTop=n.scrollHeight}(o,r)})}),window.DEBUG={map:l}}},[[29,0]]]);
//# sourceMappingURL=openlayers-event.js.map