(window.webpackJsonp=window.webpackJsonp||[]).push([[32],{31:function(e,n){var t,i,o,a,r,s,c={segments:100,xMin:-25,xMax:25};function E(){a=s.clientWidth,r=s.clientHeight,o.aspect=a/r,o.updateProjectionMatrix(),t.setSize(a,r)}function d(e){var n=function(e,n,t){for(var i=[],o=(n-e)/t,a=e;a<=n;a+=o)i.push([a]);return i}(c.xMin,c.xMax,c.segments);e=math.transpose(e),n=math.transpose(n);var t=math.transpose(math.multiply(e,n)),o=new THREE.Geometry,a=new THREE.PointsMaterial({color:16777079,size:2,sizeAttenuation:!1});console.log(e,n,t),t.forEach(function(e){o.vertices.push(new THREE.Vector3(e[0],e[1],e[2]))});var r=new THREE.Points(o,a);i.add(r)}!function(){s=document.getElementById("container"),a=s.clientWidth,r=s.clientHeight,(i=new THREE.Scene).background=new THREE.Color(0),(o=new THREE.PerspectiveCamera(45,a/r,1,1e3)).position.set(50,80,130),o.lookAt(0,0,0);var e=new THREE.GridHelper(200,20);i.add(e);var n=new THREE.AxesHelper(100);n.position.set(0,0,0),i.add(n),(t=new THREE.WebGLRenderer({antialias:!0})).setPixelRatio(window.devicePixelRatio),t.setSize(a,r),s.appendChild(t.domElement),new THREE.OrbitControls(o,t.domElement).screenSpacePanning=!0,d([[4,-1,1]]),d([[0,1,1]]),window.addEventListener("resize",E,!1)}(),function e(){requestAnimationFrame(e);t.render(i,o)}()}},[[31,0]]]);
//# sourceMappingURL=three-math02.js.map