(window.webpackJsonp=window.webpackJsonp||[]).push([[25],{30:function(e,o){var l=new ol.style.Style({text:new ol.style.Text({font:"12px Calibri,sans-serif",overflow:!0,fill:new ol.style.Fill({color:"#000"}),stroke:new ol.style.Stroke({color:"#fff",width:3})})}),r=[new ol.style.Style({fill:new ol.style.Fill({color:"rgba(255, 255, 255, 0.6)"}),stroke:new ol.style.Stroke({color:"#319FD3",width:1})}),l];new ol.Map({layers:[new ol.layer.Tile({source:new ol.source.OSM}),new ol.layer.Tile({source:new ol.source.TileDebug({projection:"EPSG:3857",tileGrid:(new ol.source.OSM).getTileGrid()})}),new ol.layer.Vector({source:new ol.source.Vector({url:"data/geojson/countries.geojson",format:new ol.format.GeoJSON}),style:function(e){return l.getText().setText(e.get("name")),r},declutter:!0,opacity:.5}),new ol.layer.Tile({source:new ol.source.Stamen({layer:"toner"}),opacity:.2}),new ol.layer.Tile({source:new ol.source.TileArcGISRest({url:"https://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Specialty/ESRI_StateCityHighway_USA/MapServer"}),opacity:.5})],target:"map",view:new ol.View({center:[0,0],zoom:2})})}},[[30,0]]]);
//# sourceMappingURL=openlayers-base.js.map