(window.webpackJsonp=window.webpackJsonp||[]).push([[32],{37:function(e,o){var t,r,l=[[127.09610939025879,37.351464686498815],[127.10108757019043,37.35214697629814],[127.10505723953246,37.354739620980915],[127.10668802261353,37.35787796578827],[127.10939168930054,37.35895247760407],[127.11222410202026,37.36563798323926],[127.11662292480467,37.352129919128714],[127.11984157562254,37.358730754203336]];t={type:"FeatureCollection",features:[{type:"Feature",properties:{},geometry:{type:"LineString",coordinates:l}}]};var n=new ol.layer.Vector({source:new ol.source.Vector({features:(new ol.format.GeoJSON).readFeatures(t)}),style:[new ol.style.Style({stroke:new ol.style.Stroke({color:"rgba(91,113,171,1.0)",width:3})})]}),a=turf.lineString(l),s=turf.bbox(a),c=turf.bboxPolygon(s),i=new ol.layer.Vector({source:new ol.source.Vector({features:(new ol.format.GeoJSON).readFeatures(c)}),style:[new ol.style.Style({stroke:new ol.style.Stroke({color:"rgba(42,53,81,1.0)",width:3}),fill:new ol.style.Fill({color:"rgba(42,53,81,0.1)"})})]});t={type:"FeatureCollection",features:[{type:"Feature",properties:{},geometry:{type:"LineString",coordinates:[[s[0],s[3]],[s[2],s[1]]]}},{type:"Feature",properties:{},geometry:{type:"LineString",coordinates:[[s[0],s[1]],[s[2],s[3]]]}}]};var u=new ol.layer.Vector({source:new ol.source.Vector({features:(new ol.format.GeoJSON).readFeatures(t)}),style:[new ol.style.Style({stroke:new ol.style.Stroke({color:"rgba(42,53,81,1.0)",width:3})})]}),w=turf.lineString(l),y=turf.lineString([[s[0],s[3]],[s[2],s[1]]]),f=turf.lineString([[s[0],s[1]],[s[2],s[3]]]),p=turf.lineIntersect(w,y),g=turf.lineIntersect(w,f),S=[];S=(S=(S=S.concat(p.features)).concat(g.features)).concat(function(e){for(var o=e.length,t=[],r=0;r<o-2;r++)t.push(e[r].concat(e[r+1]));return t}(l).map(function(e){return turf.bboxPolygon(e)})),r=turf.featureCollection(S);var d=new ol.layer.Vector({source:new ol.source.Vector({features:(new ol.format.GeoJSON).readFeatures(r)}),style:function(e){console.log();var o=e.getGeometry().getType();return"Point"===o?new ol.style.Style({image:new ol.style.Circle({radius:10,fill:null,stroke:new ol.style.Stroke({color:"rgba(249,99,99,1.0)",width:2})})}):"Polygon"===o?new ol.style.Style({stroke:new ol.style.Stroke({color:"rgba(249,99,99,1.0)",width:2})}):void 0}}),b=new ol.Map({layers:[new ol.layer.Tile({source:new ol.source.OSM}),u,i,n,d],target:"map",view:new ol.View({projection:"EPSG:4326",center:[127.10534,37.35941],zoom:15})});window.DEBUG={map:b}}},[[37,0]]]);
//# sourceMappingURL=openlayers-turf.js.map