(window.webpackJsonp=window.webpackJsonp||[]).push([[45],{49:function(e,n){var t,i,a,o,r,s,c={segments:100,xMin:-25,xMax:25,yMin:-25,yMax:25};function d(){o=s.clientWidth,r=s.clientHeight,a.aspect=o/r,a.updateProjectionMatrix(),t.setSize(o,r)}!function(){s=document.getElementById("container"),o=s.clientWidth,r=s.clientHeight,(i=new THREE.Scene).background=new THREE.Color(0),(a=new THREE.PerspectiveCamera(45,o/r,1,1e3)).position.set(50,80,130),a.lookAt(0,0,0);var e=new THREE.GridHelper(200,20);i.add(e);var n=new THREE.AxesHelper(100);n.position.set(0,0,0),i.add(n),(t=new THREE.WebGLRenderer({antialias:!0})).setPixelRatio(window.devicePixelRatio),t.setSize(o,r),s.appendChild(t.domElement),new THREE.OrbitControls(a,t.domElement).screenSpacePanning=!0,function(){var e=[1,0,4.4];!function(e,n){var t=function(e,n,t,i,a){for(var o=[],r=(n-e)/a,s=(i-t)/a,c=e;c<=n;c+=r)for(var d=t;d<=i;d+=s)o.push([c,d]);return o}(c.xMin,c.xMax,c.yMin,c.yMax,c.segments);e=math.transpose(e),t=math.transpose(t);var a=math.transpose(math.multiply(e,t)),o=new THREE.Geometry,r=new THREE.PointsMaterial({color:16777079,size:2,sizeAttenuation:!1});a.map(function(e){return math.add(e,n)}).forEach(function(e){o.vertices.push(new THREE.Vector3(e[0],e[1],e[2]))});var s=new THREE.Points(o,r);i.add(s)}([math.subtract([0,1,4],e),math.subtract([0,0,3],e)],e)}(),window.addEventListener("resize",d,!1)}(),function e(){requestAnimationFrame(e);t.render(i,a)}()}},[[49,0]]]);
//# sourceMappingURL=three-math03.js.map