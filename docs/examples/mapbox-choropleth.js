(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{9:function(e,n){mapboxgl.accessToken="pk.eyJ1IjoiZWdhb25la28iLCJhIjoiY2pkYnJtdWg4N3Y0ejMzbzV2NHkzanJodCJ9.509Ns7trg6hi_lZKGyWzew";var t=new mapboxgl.Map({container:"map",style:"mapbox://styles/egaoneko/cjdelce5t09nd2rnw8qpm8gu3"});t.on("load",function(){for(var e=["0-10","10-20","20-50","50-100","100-200","200-500","500-1000","1000+"],n=["#FFEDA0","#FED976","#FEB24C","#FD8D3C","#FC4E2A","#E31A1C","#BD0026","#800026"],o=document.getElementById("legend"),a=0;a<e.length;a++){var r=e[a],d=n[a],s=document.createElement("div"),p=document.createElement("span");p.className="legend-key",p.style.backgroundColor=d;var l=document.createElement("span");l.innerHTML=r,s.appendChild(p),s.appendChild(l),o.appendChild(s)}t.getCanvas().style.cursor="default",t.fitBounds([[-133.2421875,16.972741],[-47.63671875,52.696361]])}),t.on("mousemove",function(e){var n=t.queryRenderedFeatures(e.point,{layers:["statedata-22dikt"]});n.length>0?(document.getElementById("pd").innerHTML="<h3><strong>"+n[0].properties.name+"</strong></h3><p><strong><em>"+n[0].properties.density+"</strong> people per square mile</em></p>",t.getCanvas().style.cursor="pointer"):(document.getElementById("pd").innerHTML="<p>Hover over a state!</p>",t.getCanvas().style.cursor="default")})}},[[9,0]]]);
//# sourceMappingURL=mapbox-choropleth.js.map