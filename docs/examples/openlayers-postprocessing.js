(window.webpackJsonp=window.webpackJsonp||[]).push([[23],{21:function(e,t){var o=new ol.layer.Tile({source:new ol.source.OSM}),l=new ol.style.Circle({radius:5,fill:null,stroke:new ol.style.Stroke({color:"red",width:1})}),r={Point:new ol.style.Style({image:l}),LineString:new ol.style.Style({stroke:new ol.style.Stroke({color:"green",width:1})}),MultiLineString:new ol.style.Style({stroke:new ol.style.Stroke({color:"green",width:1})}),MultiPoint:new ol.style.Style({image:l}),MultiPolygon:new ol.style.Style({stroke:new ol.style.Stroke({color:"yellow",width:1}),fill:new ol.style.Fill({color:"rgba(255, 255, 0, 0.1)"})}),Polygon:new ol.style.Style({stroke:new ol.style.Stroke({color:"blue",lineDash:[4],width:3}),fill:new ol.style.Fill({color:"rgba(0, 0, 255, 0.1)"})}),GeometryCollection:new ol.style.Style({stroke:new ol.style.Stroke({color:"magenta",width:2}),fill:new ol.style.Fill({color:"magenta"}),image:new ol.style.Circle({radius:10,fill:null,stroke:new ol.style.Stroke({color:"magenta"})})}),Circle:new ol.style.Style({stroke:new ol.style.Stroke({color:"red",width:2}),fill:new ol.style.Fill({color:"rgba(255,0,0,0.2)"})})},n=new ol.source.Vector({features:(new ol.format.GeoJSON).readFeatures({type:"FeatureCollection",crs:{type:"name",properties:{name:"EPSG:3857"}},features:[{type:"Feature",geometry:{type:"Point",coordinates:[0,0]}},{type:"Feature",geometry:{type:"LineString",coordinates:[[4e6,-2e6],[8e6,2e6]]}},{type:"Feature",geometry:{type:"LineString",coordinates:[[4e6,2e6],[8e6,-2e6]]}},{type:"Feature",geometry:{type:"Polygon",coordinates:[[[-5e6,-1e6],[-4e6,1e6],[-3e6,-1e6]]]}},{type:"Feature",geometry:{type:"MultiLineString",coordinates:[[[-1e6,-75e4],[-1e6,75e4]],[[1e6,-75e4],[1e6,75e4]],[[-75e4,-1e6],[75e4,-1e6]],[[-75e4,1e6],[75e4,1e6]]]}},{type:"Feature",geometry:{type:"MultiPolygon",coordinates:[[[[-5e6,6e6],[-5e6,8e6],[-3e6,8e6],[-3e6,6e6]]],[[[-2e6,6e6],[-2e6,8e6],[0,8e6],[0,6e6]]],[[[1e6,6e6],[1e6,8e6],[3e6,8e6],[3e6,6e6]]]]}},{type:"Feature",geometry:{type:"GeometryCollection",geometries:[{type:"LineString",coordinates:[[-5e6,-5e6],[0,-5e6]]},{type:"Point",coordinates:[4e6,-5e6]},{type:"Polygon",coordinates:[[[1e6,-6e6],[2e6,-4e6],[3e6,-6e6]]]}]}}]})});n.addFeature(new ol.Feature(new ol.geom.Circle([5e6,7e6],1e6)));var i=new ol.layer.Vector({source:n,style:function(e){return r[e.getGeometry().getType()]}});new ol.Map({layers:[o,i],target:"map",view:new ol.View({center:[0,0],zoom:2})});o.on("postcompose",function(e){console.log(e),function(e){for(var t=e.canvas,o=t.getContext("2d"),l=o.getImageData(0,0,t.width,t.height),r=l.data,n=0;n<r.length;n+=4){var i=(r[n]+r[n+1]+r[n+2])/3;r[n]=i,r[n+1]=i,r[n+2]=i}o.putImageData(l,0,0)}(e.context)})}},[[21,0]]]);
//# sourceMappingURL=openlayers-postprocessing.js.map