(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{1:function(t,e,i){"use strict";var n=function(t,e){t&&(e=Object.assign({width:300,height:300,ratio:1,images:[]},e),this.container=t,this.width=e.width,this.height=e.height,this.ratio=e.ratio,this.images=e.images,this.init(),this.animate())};n.prototype.init=function(){this.container.width===this.width&&this.container.width===this.height||(this.container.width=this.width,this.container.height=this.height),this.camera=new THREE.PerspectiveCamera(45,this.width/this.height,.1,1e3),this.camera.position.x=0,this.camera.position.y=12,this.camera.position.z=28,this.camera.lookAt(new THREE.Vector3(0,0,0)),this.scene=new THREE.Scene;var t=new THREE.AmbientLight(1315860);this.scene.add(t);var e=new THREE.DirectionalLight;e.position.set(0,30,20),this.scene.add(e),this.cube=this.createMesh(new THREE.BoxGeometry(10,10,10),this.images),this.scene.add(this.cube),console.log(this.cube.geometry.faceVertexUvs),this.renderer=new THREE.WebGLRenderer({canvas:this.container,alpha:!0}),this.renderer.setClearColor(new THREE.Color(268435455,0)),this.renderer.setPixelRatio(this.ratio),this.renderer.shadowMapEnabled=!0},n.prototype.createMesh=function(t,e){var i,n=this;return i=6===e.length?new THREE.MeshFaceMaterial(e.map(function(t){return n.createMaterial(t)})):this.createMaterial(e[0]),new THREE.Mesh(t,i)},n.prototype.createMaterial=function(t){var e;e="string"==typeof t?(new THREE.TextureLoader).load(t):new THREE.CanvasTexture(t);var i=new THREE.MeshPhongMaterial;return i.map=e,i},n.prototype.animate=function(){requestAnimationFrame(this.animate.bind(this)),this.render()},n.prototype.render=function(){var t=.001*Date.now();this.cube.rotation.x=.25*t,this.cube.rotation.y=.5*t,this.renderer.render(this.scene,this.camera)},n.prototype.resize=function(t,e){this.width=t,this.height=e,this.container.width===this.width&&this.container.width===this.height||(this.container.width=this.width,this.container.height=this.height),this.camera.aspect=this.width/this.height,this.camera.updateProjectionMatrix(),this.renderer.setSize(this.width,this.height)},e.a=n},7:function(t,e,i){"use strict";i.r(e);var n,r=i(1),h={sprite01:{x:0,y:0,w:557,h:557},sprite02:{x:557,y:0,w:557,h:557},sprite03:{x:1114,y:0,w:557,h:557},sprite04:{x:1671,y:0,w:557,h:557},sprite05:{x:2228,y:0,w:557,h:557},sprite06:{x:2785,y:0,w:557,h:557}},a=document.getElementById("canvas-image");(function(t,e){return new Promise(function(i,n){var r=[],h=new Image;h.src=t,h.onload=function(){Object.keys(e).forEach(function(t){r.push(function(t,e,i){var n=document.createElement("CANVAS"),r=n.getContext("2d"),h=e[i];return n.width=h.w,n.height=h.h,r.drawImage(t,h.x,h.y,h.w,h.h,0,0,h.w,h.h),n}(h,e,t))}),i(r)},h.onerror=function(t){n(t)}})})("data/img/dice.png",h).then(function(t){n=new r.a(a,{images:t,ratio:window.devicePixelRatio})});var s,o=document.getElementById("canvas-image-bitmap");(function(t,e){return new Promise(function(i,n){var r=[],h=new Image;h.src=t,h.onload=function(){Object.keys(e).forEach(function(t){var i=e[t];r.push(createImageBitmap(h,i.x,i.y,i.w,i.h))}),Promise.all(r).then(function(t){i(t)})},h.onerror=function(t){n(t)}})})("data/img/dice.png",h).then(function(t){s=new r.a(o,{images:t,ratio:window.devicePixelRatio})}),window.addEventListener("resize",function(){var t=document.getElementById("container"),e=t.clientWidth,i=t.clientHeight;n.resize(e,i),s.resize(e,i)},!1)}},[[7,0]]]);
//# sourceMappingURL=create-image-bitmap.js.map