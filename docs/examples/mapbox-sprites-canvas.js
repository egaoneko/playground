(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{24:function(e,t){mapboxgl.accessToken="pk.eyJ1IjoiZWdhb25la28iLCJhIjoiY2pkYnJtdWg4N3Y0ejMzbzV2NHkzanJodCJ9.509Ns7trg6hi_lZKGyWzew";var o=new mapboxgl.Map({container:"map",style:"mapbox://styles/mapbox/streets-v9",center:[0,0],zoom:1}),n={sprite01:{x:0,y:0,w:55,h:55},sprite02:{x:110,y:86,w:55,h:55},sprite03:{x:55,y:0,w:55,h:86},sprite04:{x:212,y:0,w:44,h:44}};o.on("load",function(){(function(e,t){return new Promise(function(o,n){var a=[],r=new Image;r.src=e,r.onload=function(){Object.keys(t).forEach(function(e){a.push([e,function(e,t,o){var n=document.createElement("CANVAS"),a=n.getContext("2d"),r=t[o];return n.width=r.w,n.height=r.h,a.drawImage(e,r.x,r.y,r.w,r.h,0,0,r.w,r.h),n}(r,t,e)])}),o(a)},r.onerror=function(e){n(e)}})})("data/img/butterfly.png",n).then(function(e){for(var t=e.length,n=new Array(t),a=0;a<t;++a){var r=e[a],i=r[0],p=r[1],s=p.getContext("2d");o.addImage(i,s.getImageData(0,0,p.width,p.height)),n[a]=i}for(var c=new Array(500),d=0;d<500;++d)c[d]={type:"Feature",geometry:{type:"Point",coordinates:[360*Math.random()-180,180*Math.random()-90]},properties:{icon:n[d%(t-1)]}};o.addSource("points",{type:"geojson",data:{type:"FeatureCollection",features:c}}),o.addLayer({id:"points",type:"symbol",source:"points",layout:{"icon-image":"{icon}","icon-size":1}})})})}},[[24,0]]]);
//# sourceMappingURL=mapbox-sprites-canvas.js.map