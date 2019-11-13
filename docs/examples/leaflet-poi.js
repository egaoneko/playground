(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{17:function(e,t){var a=L.map("map").setView([37.49229399862877,-96.94335937500001],4),n=L.tileLayer("//stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.png",{subdomains:"abcd",attribution:'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.',minZoom:4,maxZoom:18});a.attributionControl.setPosition("bottomleft"),a.zoomControl.setPosition("bottomright"),a.addLayer(n),n.on("load",function(){Array.from(document.getElementsByClassName("leaflet-tile")).forEach(function(e){e.style.height=e.clientHeight+1+"px",e.style.width=e.clientWidth+1+"px"})});var r=function(e,t,a){var n="undefined"!=typeof XMLHttpRequest?new XMLHttpRequest:new ActiveXObject("Microsoft.XMLHTTP");n.open("get",e,!0),n.onreadystatechange=function(){var e,r;4===n.readyState&&(200===(e=n.status)?(r=JSON.parse(n.responseText),t&&t(r)):a&&a(e))},n.send()},o=new PIXI.loaders.Loader;function i(e,t){var n=[t.plane.texture,t.circle.texture,t.bicycle.texture],o=[t.focusPlane.texture,t.focusCircle.texture,t.focusBicycle.texture];r("data/json/cities.json",function(e){var t=document.querySelector("div.legend.geometry"),r=t.querySelector(".content");(function(){var i,l=!0,d=[],u=d3.scaleLinear().domain([0,50,100]).range(["#c6233c","#ffd300","#008000"]),x=null,s=null,f=new PIXI.Container,p=/iPad|iPhone|iPod/.test(navigator.userAgent)&&!window.MSStream;return L.pixiOverlay(function(f){var p=f.getMap().getZoom();x&&(cancelAnimationFrame(x),x=null);var y=f.getContainer(),g=f.getRenderer(),m=f.latLngToLayerPoint,M=f.getScale(),h=1/M;if(l){i=p,e.forEach(function(e){var t=m([e.latitude,e.longitude]),a=Math.floor(Math.random()*n.length),r=new PIXI.Sprite(n[a]);r.textureIndex=a,r.x0=t.x,r.y0=t.y,r.anchor.set(.5,.5);var o=d3.color(u(e.avancement||100*Math.random())).rgb();r.tint=256*(256*o.r+o.g)+o.b,y.addChild(r),d.push(r),r.legend=e.city||e.label});for(var v={},b=a.getMinZoom();b<=a.getMaxZoom();b++){var w=(b<=7?16:24)/f.getScale(b);v[b]=c(d,{r0:w,zoom:b})}a.on("click",function(e){var a=!1;s&&(s.texture=n[s.textureIndex],s=null,L.DomUtil.addClass(t,"hide"),r.innerHTML="",a=!0);var i=C(e.latlng,m,v,f);i&&(i.texture=o[i.textureIndex],s=i,r.innerHTML=i.legend,L.DomUtil.removeClass(t,"hide"),a=!0),a&&f.getRenderer().render(y)});var S=this;a.on("mousemove",L.Util.throttle(function(e){C(e.latlng,m,v,f)?L.DomUtil.addClass(S._container,"leaflet-interactive"):L.DomUtil.removeClass(S._container,"leaflet-interactive")},32))}function C(e,t,a,n){var r,o=t(e),i=a[n.getMap().getZoom()],c=i.rMax,l=!1;return i.visit(function(e,t,a,n,i){if(!e.length){var d=e.data.x-o.x,u=e.data.y-o.y,x=16*e.data.scale.x;d*d+u*u<=x*x&&(r=e.data,l=!0)}return l||t>o.x+c||n+c<o.x||a>o.y+c||i+c<o.y}),r}(l||i!==p)&&d.forEach(function(e){var t=e.cache[p];l?(e.x=t.x,e.y=t.y,e.scale.set(t.r*M<16?t.r/16:h)):(e.currentX=e.x,e.currentY=e.y,e.targetX=t.x,e.targetY=t.y,e.currentScale=e.scale.x,e.targetScale=t.r*M<16?t.r/16:h)});var P=null,X=250;l||i===p||(x=requestAnimationFrame(function e(t){var a;null===P&&(P=t);var n=(a=t-P)/X;n>1&&(n=1),n*=.4+n*(2.2+-1.6*n),d.forEach(function(e){e.x=e.currentX+n*(e.targetX-e.currentX),e.y=e.currentY+n*(e.targetY-e.currentY),e.scale.set(e.currentScale+n*(e.targetScale-e.currentScale))}),g.render(y),a<X&&(x=requestAnimationFrame(e))})),l=!1,i=p,g.render(y)},f,{doubleBuffering:p,destroyInteractionManager:!0})})().addTo(a)})}function c(e,t){t=t||{};var a=d3.quadtree().x(function(e){return e.xp}).y(function(e){return e.yp});void 0!==t.extent&&a.extent(t.extent);var n=0;e.forEach(function(e){e.xp=e.x0,e.yp=e.y0,void 0!==t.r0&&(e.r0=t.r0),e.r=e.r0,e.xMin=e.x0-e.r0,e.xMax=e.x0+e.r0,e.yMin=e.y0-e.r0,e.yMax=e.y0+e.r0,a.visit(function(e){function t(t){var a=e.xp-t.xp,n=e.yp-t.yp,r=a*a+n*n,o=e.r+t.r;if(r<o*o){var i,c,l,d,u,x,s=Math.sqrt(r);e.r<t.r?(i=t,c=e):(i=e,c=t);var f=i.r,p=c.r,y=(f+p+s)/4;if(r>0)u=(c.xp-i.xp)/s,x=(c.yp-i.yp)/s;else{var g=2*Math.PI*Math.random();u=Math.cos(g),x=Math.sin(g)}p>=y?(l=y/f,d=y/p):((l=(f-p+s)/(2*f))>1&&console.log(l),d=1),i.r*=l,c.r*=d,i.xp+=(l-1)*f*u,i.yp+=(l-1)*f*x,c.xp+=(1-d)*p*u,c.yp+=(1-d)*p*x,i.xMin=i.xp-i.r,i.xMax=i.xp+i.r,i.yMin=i.yp-i.r,i.yMax=i.yp+i.r,c.xMin=c.xp-c.r,c.xMax=c.xp+c.r,c.yMin=c.yp-c.r,c.yMax=c.yp+c.r}}return function(a,r,o,i,c){if(!a.length)do{a.data!=e&&e.xMax>a.data.xMin&&e.xMin<a.data.xMax&&e.yMax>a.data.yMin&&e.yMin<a.data.yMax&&t(a.data)}while(a=a.next);return r>e.xMax+n||i+n<e.xMin||o>e.yMax+n||c+n<e.yMin}}(e)),n=Math.max(n,e.r),a.add(e)}),void 0!==t.zoom&&e.forEach(function(e){e.cache=e.cache||{},e.cache[t.zoom]={x:e.xp,y:e.yp,r:e.r}});var r=d3.quadtree().x(function(e){return e.xp}).y(function(e){return e.yp}),o=0;return e.forEach(function(e){r.add(e),o=Math.max(o,e.r)}),r.rMax=o,r}o.add("plane","data/img/leaflet/plane.png").add("focusPlane","data/img/leaflet/focus-plane.png").add("circle","data/img/leaflet/circle.png").add("focusCircle","data/img/leaflet/focus-circle.png").add("bicycle","data/img/leaflet/bicycle.png").add("focusBicycle","data/img/leaflet/focus-bicycle.png"),document.addEventListener("DOMContentLoaded",function(){o.load(i)})}},[[17,0]]]);
//# sourceMappingURL=leaflet-poi.js.map