(window.webpackJsonp=window.webpackJsonp||[]).push([[27],{32:function(e,n){var t=new ol.Map({layers:[],target:document.getElementById("map"),view:new ol.View({center:[0,0],zoom:5})});(function(e,n){return new Promise(function(t,o){var r=[],i=new Image;i.src=e,i.onload=function(){Object.keys(n).forEach(function(e){r.push(function(e,n,t){var o=document.createElement("CANVAS"),r=o.getContext("2d"),i=n[t];return o.width=i.w,o.height=i.h,r.drawImage(e,i.x,i.y,i.w,i.h,0,0,i.w,i.h),o}(i,n,e))}),t(r)},i.onerror=function(e){o(e)}})})("data/img/butterfly.png",{sprite01:{x:0,y:0,w:55,h:55},sprite02:{x:110,y:86,w:55,h:55},sprite03:{x:55,y:0,w:55,h:86},sprite04:{x:212,y:0,w:44,h:44}}).then(function(e){for(var n=e.length,o=new Array(n),r=0;r<n;++r){var i=e[r];o[r]=new ol.style.Icon({scale:1,crossOrigin:"anonymous",imgSize:[i.width,i.height],img:i})}for(var a=new Array(500),l=25e6,c=0;c<500;++c){var u=new ol.geom.Point([5e7*Math.random()-l,5e7*Math.random()-l]),w=new ol.Feature(u);w.setStyle(new ol.style.Style({image:o[c%(n-1)]})),a[c]=w}var s=new ol.source.Vector({features:a}),h=new ol.layer.Vector({source:s});t.addLayer(h)}),t.on("click",function(e){var n=document.getElementById("info");n.innerHTML="Hold on a second, while I catch those butterflies for you ...",window.setTimeout(function(){var o=[];t.forEachFeatureAtPixel(e.pixel,function(e){return o.push(e),!1}),1===o.length?n.innerHTML="Got one butterfly":o.length>1?n.innerHTML="Got "+o.length+" butterflies":n.innerHTML="Couldn't catch a single butterfly"},1)}),t.on("pointermove",function(e){if(!e.dragging){var n=t.getEventPixel(e.originalEvent),o=t.hasFeatureAtPixel(n);t.getTarget().style.cursor=o?"pointer":""}})}},[[32,0]]]);
//# sourceMappingURL=openlayers-sprites-canvas.js.map