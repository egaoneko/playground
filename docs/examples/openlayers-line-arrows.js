(window.webpackJsonp=window.webpackJsonp||[]).push([[27],{31:function(e,o){var t=new ol.layer.Tile({source:new ol.source.OSM}),n=new ol.source.Vector,r=new ol.layer.Vector({source:n,style:function(e){var o=e.getGeometry(),t=[new ol.style.Style({stroke:new ol.style.Stroke({color:"#ffffff",width:2})})],n=function(e,o){return Math.abs(e.getCoordinateFromPixel([o,0])[0]-e.getCoordinateFromPixel([0,0])[0])}(l,10),r=l.getView().calculateExtent(l.getSize()),i=0,w=0,c=0;return o.forEachSegment(function(e,o){w++;var l,s=o[0]-e[0],u=o[1]-e[1],y=Math.atan2(u,s),f=Math.sqrt(s*s+u*u),g=n/f,m=i/f;t.push(new ol.style.Style({geometry:new ol.geom.Point(o),image:new ol.style.Circle({radius:3,fill:new ol.style.Fill({color:"#0ff000"})})}));for(var h=m;h<=1;h+=g)l=a(e,o,h),ol.extent.containsCoordinate(r,l)&&(c++,t.push(new ol.style.Style({geometry:new ol.geom.Point(l),image:new ol.style.Icon({src:"data/img/arrow.png",anchor:[.75,.5],rotateWithView:!0,rotation:-y})})));if(l){var p=o[0]-l[0],d=o[1]-l[1],S=Math.sqrt(p*p+d*d);i=S>0?n-S:0}else i+=f-n}),console.log(w,c),t}}),l=new ol.Map({layers:[t,r],target:"map",view:new ol.View({center:[-11e6,46e5],zoom:4})});function a(e,o,t){return[e[0]+(o[0]-e[0])*t,e[1]+(o[1]-e[1])*t]}l.addInteraction(new ol.interaction.Draw({source:n,type:"LineString"}))}},[[31,0]]]);
//# sourceMappingURL=openlayers-line-arrows.js.map