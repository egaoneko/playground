(window.webpackJsonp=window.webpackJsonp||[]).push([[22],{21:function(e,n){var i,t,o,a,d,r;function c(){a=r.clientWidth,d=r.clientHeight,o.aspect=a/d,o.updateProjectionMatrix(),i.setSize(a,d)}!function(){r=document.getElementById("container"),a=r.clientWidth,d=r.clientHeight,(t=new THREE.Scene).background=new THREE.Color(11579568),(o=new THREE.PerspectiveCamera(45,a/d,1,1e3)).position.set(50,80,130),o.lookAt(0,0,0);var e=new THREE.GridHelper(200,20);t.add(e);var n=new THREE.AxesHelper(100);n.position.set(0,0,0),t.add(n),(i=new THREE.WebGLRenderer({antialias:!0})).setPixelRatio(window.devicePixelRatio),i.setSize(a,d),r.appendChild(i.domElement),new THREE.OrbitControls(o,i.domElement).screenSpacePanning=!0,window.addEventListener("resize",c,!1)}(),function e(){requestAnimationFrame(e);i.render(t,o)}()}},[[21,0]]]);
//# sourceMappingURL=three-base.js.map