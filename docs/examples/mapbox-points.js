(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{4:function(e,o){mapboxgl.accessToken="pk.eyJ1IjoiZWdhb25la28iLCJhIjoiY2pkYnJtdWg4N3Y0ejMzbzV2NHkzanJodCJ9.509Ns7trg6hi_lZKGyWzew";var n=new mapboxgl.Map({container:"map",style:"mapbox://styles/egaoneko/cjee9xi2e3rqk2snprvd1lqid",center:[-87.645,41.856],zoom:8});n.on("click",function(e){var o=n.queryRenderedFeatures(e.point,{layers:["chicago-parks"]});if(o.length){var t=o[0];new mapboxgl.Popup({offset:[0,-15]}).setLngLat(t.geometry.coordinates).setHTML("<h3>"+t.properties.title+"</h3><p>"+t.properties.description+"</p>").setLngLat(t.geometry.coordinates).addTo(n)}})}},[[4,0]]]);
//# sourceMappingURL=mapbox-points.js.map