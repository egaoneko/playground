(window.webpackJsonp=window.webpackJsonp||[]).push([[44],{48:function(e,n){var t,i,a,o,r,s,c={segments:100,xMin:-25,xMax:25,yMin:-25,yMax:25};function E(){o=s.clientWidth,r=s.clientHeight,a.aspect=o/r,a.updateProjectionMatrix(),t.setSize(o,r)}!function(){s=document.getElementById("container"),o=s.clientWidth,r=s.clientHeight,(i=new THREE.Scene).background=new THREE.Color(0),(a=new THREE.PerspectiveCamera(45,o/r,1,1e3)).position.set(50,80,130),a.lookAt(0,0,0);var e=new THREE.GridHelper(200,20);i.add(e);var n=new THREE.AxesHelper(100);n.position.set(0,0,0),i.add(n),(t=new THREE.WebGLRenderer({antialias:!0})).setPixelRatio(window.devicePixelRatio),t.setSize(o,r),s.appendChild(t.domElement),new THREE.OrbitControls(a,t.domElement).screenSpacePanning=!0,function(e){var n=function(e,n,t,i,a){for(var o=[],r=(n-e)/a,s=(i-t)/a,c=e;c<=n;c+=r)for(var E=t;E<=i;E+=s)o.push([c,E]);return o}(c.xMin,c.xMax,c.yMin,c.yMax,c.segments);e=math.transpose(e),n=math.transpose(n);var t=math.transpose(math.multiply(e,n)),a=new THREE.Geometry,o=new THREE.PointsMaterial({color:16777079,size:2,sizeAttenuation:!1});t.forEach(function(e){a.vertices.push(new THREE.Vector3(e[0],e[1],e[2]))});var r=new THREE.Points(a,o);i.add(r)}([[1,0,1.65],[0,1,1]]),window.addEventListener("resize",E,!1)}(),function e(){requestAnimationFrame(e);t.render(i,a)}()}},[[48,0]]]);
//# sourceMappingURL=three-math01.js.map