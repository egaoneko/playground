(window.webpackJsonp=window.webpackJsonp||[]).push([[33],{38:function(e,o){var r=new ol.source.OSM,t=new ol.layer.Tile({source:r}),c=new ol.source.OSM,n=new ol.layer.Tile({source:c}),a=function(e){return new ol.style.Style({image:new ol.style.Circle({radius:10,fill:null,stroke:new ol.style.Stroke({color:e})})})},l=new ol.source.Vector({features:(new ol.format.GeoJSON).readFeatures({type:"FeatureCollection",crs:{type:"name",properties:{name:"EPSG:3857"}},features:[{type:"Feature",geometry:{type:"Point",coordinates:y()}}]})}),u=new ol.layer.Vector({source:l,style:function(){return console.log("%cvector1","background-color: red; color: white"),a("magenta")}}),s=new ol.source.Vector({features:(new ol.format.GeoJSON).readFeatures({type:"FeatureCollection",crs:{type:"name",properties:{name:"EPSG:3857"}},features:[{type:"Feature",geometry:{type:"Point",coordinates:y()}}]})}),i=new ol.layer.Vector({source:s,style:function(){return console.log("%cvector2","background-color: red; color: white"),a("magenta")}}),d=new ol.layer.VectorTile({source:new ol.source.VectorTile({format:new ol.format.MVT,url:"https://basemaps.arcgis.com/v1/arcgis/rest/services/World_Basemap/VectorTileServer/tile/{z}/{y}/{x}.pbf"}),style:function(){return console.log("%cvectorTile","background-color: red; color: white"),a("red")}}),m=new ol.Map({layers:[t,n,d,u],target:"map",view:new ol.View({center:[0,0],zoom:2})});function y(){return[360*Math.random()-180,180*Math.random()-90]}document.querySelector("#add-feature").addEventListener("click",function(){var e=new ol.format.GeoJSON({featureProjection:"EPSG:3857"}),o={type:"FeatureCollection",features:[{type:"Feature",geometry:{type:"Point",coordinates:[360*Math.random()-180,180*Math.random()-90]}}]};u.getSource().addFeatures(e.readFeatures(o))}),document.querySelector("#add-feature").addEventListener("click",function(){var e=new ol.format.GeoJSON({featureProjection:"EPSG:3857"}),o={type:"FeatureCollection",features:[{type:"Feature",geometry:{type:"Point",coordinates:y()}}]};u.getSource().addFeatures(e.readFeatures(o))}),document.querySelector("#add-layer").addEventListener("click",function(){m.removeLayer(i),m.addLayer(i)}),document.querySelector("#refresh-source").addEventListener("click",function(){u.getSource().refresh()}),document.querySelector("#set-zoom").addEventListener("click",function(){m.getView().setZoom(m.getView().getZoom())}),[["precompose","#001f3f"],["postcompose","#0074D9"],["render","#7FDBFF"],["postrender","#39CCCC"],["rendercomplete","#3D9970"],["tileloadstart","#2ECC40"],["tileloadend","#01FF70"],["tileloaderror","#FFDC00"]].forEach(function(e){var o=e[0],a=e[1];[[m,"map","#0074D9"],[t,"rasterTile1","#7FDBFF"],[n,"rasterTile2","#01FF70"],[d,"vectorTile","#39CCCC"],[u,"vector1","#3D9970"],[i,"vector2","#2ECC40"],[r,"source1","#FFDC00"],[c,"source2","#FF851B"],[l,"source3","#FF4136"],[s,"source4","#85144b"]].forEach(function(e){var r=e[0],t=e[1],c=e[2];r.on(o,function(){!function(e,o){var r=e[0],t=e[1],c=o[0],n=o[1];console.log("%c["+r+"] %c"+c,"color: "+t,"color: "+n)}([t,c],[o,a])})})}),window.DEBUG={map:m,rasterTile1:t,rasterTile2:n,vectorTile:d,vector1:u,vector2:i}}},[[38,0]]]);
//# sourceMappingURL=openlayers-render-event.js.map