(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{24:function(e,o){mapboxgl.accessToken="pk.eyJ1IjoiZWdhb25la28iLCJhIjoiY2pkYnJtdWg4N3Y0ejMzbzV2NHkzanJodCJ9.509Ns7trg6hi_lZKGyWzew";var n=function(e){return(e.match(/([^?=&]+)(=([^&]*))/g)||[]).reduce(function(e,o){return e[o.slice(0,o.indexOf("="))]=o.slice(o.indexOf("=")+1),e},{})}(location.search),t=n.style?decodeURIComponent(n.style):"mapbox://styles/mapbox/streets-v9",i=t.includes("mapbox"),a={style:t,extrusion:!1},r=new dat.GUI,l=r.addFolder("Style"),s=r.addFolder("Layer");r.remember(a),l.add(a,"style").onFinishChange(function(e){e||(e="mapbox://styles/mapbox/streets-v9");var o=function(e){var o=[];for(var n in e)o.push(encodeURIComponent(n)+"="+encodeURIComponent(e[n]));return o.join("&")}(Object.assign({},n,{style:e})),t=location.pathname+"?"+o;history.pushState("","",t),d.setStyle(e)}),s.add(a,"extrusion").onFinishChange(function(e){var o=d.getStyle().layers;i?function(e,o){for(var n,t=0;t<e.length;t++)if("symbol"===e[t].type&&e[t].layout["text-field"]){n=e[t].id;break}o?d.addLayer({id:"3d-buildings",source:"composite","source-layer":"building",filter:["==","extrude","true"],type:"fill-extrusion",minzoom:15,paint:{"fill-extrusion-color":"#aaa","fill-extrusion-height":["interpolate",["linear"],["zoom"],15,0,15.05,["get","height"]],"fill-extrusion-base":["interpolate",["linear"],["zoom"],15,0,15.05,["get","min_height"]],"fill-extrusion-opacity":.6}},n):d.removeLayer("3d-buildings")}(o,e):function(e,o){for(var n=0;n<e.length;n++)"fill-extrusion"===e[n].type&&d.setLayoutProperty(e[n].id,"visibility",o?"visible":"none")}(o,e)}),l.open(),s.open();var d=new mapboxgl.Map({container:"map",style:t,center:[127.0339581,37.4845477],zoom:15,localIdeographFontFamily:!1});d.on("load",function(){}),window.DEBUG={map:d}}},[[24,0]]]);
//# sourceMappingURL=mapbox-style.js.map