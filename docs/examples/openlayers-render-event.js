(window.webpackJsonp=window.webpackJsonp||[]).push([[27],{27:function(e,o){var r=new ol.layer.Tile({source:new ol.source.OSM}),t=new ol.layer.Tile({source:new ol.source.OSM}),c=function(e){return new ol.style.Style({image:new ol.style.Circle({radius:10,fill:null,stroke:new ol.style.Stroke({color:e})})})},n=new ol.layer.Vector({source:new ol.source.Vector({features:(new ol.format.GeoJSON).readFeatures({type:"FeatureCollection",crs:{type:"name",properties:{name:"EPSG:3857"}},features:[{type:"Feature",geometry:{type:"Point",coordinates:s()}}]})}),style:function(){return console.log("%cvector1","background-color: red; color: white"),c("magenta")}}),a=new ol.layer.Vector({source:new ol.source.Vector({features:(new ol.format.GeoJSON).readFeatures({type:"FeatureCollection",crs:{type:"name",properties:{name:"EPSG:3857"}},features:[{type:"Feature",geometry:{type:"Point",coordinates:s()}}]})}),style:function(){return console.log("%cvector2","background-color: red; color: white"),c("magenta")}}),l=new ol.layer.VectorTile({source:new ol.source.VectorTile({format:new ol.format.MVT,url:"https://basemaps.arcgis.com/v1/arcgis/rest/services/World_Basemap/VectorTileServer/tile/{z}/{y}/{x}.pbf"}),style:function(){return console.log("%cvectorTile","background-color: red; color: white"),c("red")}}),u=new ol.Map({layers:[r,t,l,n],target:"map",view:new ol.View({center:[0,0],zoom:2})});function s(){return[360*Math.random()-180,180*Math.random()-90]}document.querySelector("#add-feature").addEventListener("click",function(){var e=new ol.format.GeoJSON({featureProjection:"EPSG:3857"}),o={type:"FeatureCollection",features:[{type:"Feature",geometry:{type:"Point",coordinates:[360*Math.random()-180,180*Math.random()-90]}}]};n.getSource().addFeatures(e.readFeatures(o))}),document.querySelector("#add-feature").addEventListener("click",function(){var e=new ol.format.GeoJSON({featureProjection:"EPSG:3857"}),o={type:"FeatureCollection",features:[{type:"Feature",geometry:{type:"Point",coordinates:s()}}]};n.getSource().addFeatures(e.readFeatures(o))}),document.querySelector("#add-layer").addEventListener("click",function(){u.removeLayer(a),u.addLayer(a)}),document.querySelector("#refresh-source").addEventListener("click",function(){n.getSource().refresh()}),document.querySelector("#set-zoom").addEventListener("click",function(){u.getView().setZoom(u.getView().getZoom())}),[["precompose","#8be9fd"],["postcompose","#50fa7b"],["render","#ffb86c"],["postrender","#ff79c6"],["rendercomplete","#bd93f9"]].forEach(function(e){var o=e[0],c=e[1];[[u,"map","#0074D9"],[r,"rasterTile1","#7FDBFF"],[t,"rasterTile2","#01FF70"],[l,"vectorTile","#39CCCC"],[n,"vector1","#3D9970"],[a,"vector2","#2ECC40"]].forEach(function(e){var r=e[0],t=e[1],n=e[2];r.on(o,function(){!function(e,o){var r=e[0],t=e[1],c=o[0],n=o[1];console.log("%c["+r+"] %c"+c,"color: "+t,"color: "+n)}([t,n],[o,c])})})}),window.DEBUG={map:u,rasterTile1:r,rasterTile2:t,vectorTile:l,vector1:n,vector2:a}}},[[27,0]]]);
//# sourceMappingURL=openlayers-render-event.js.map