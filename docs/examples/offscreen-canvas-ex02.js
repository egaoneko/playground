(window.webpackJsonp=window.webpackJsonp||[]).push([[20],{45:function(e,t,n){"use strict";n.r(t);var i=function(e,t){e&&(t=Object.assign({width:300,height:300,ratio:1},t),this.container=e,this.width=t.width,this.height=t.height,this.ratio=t.ratio,this.init(),this.animate())};i.prototype.init=function(){this.container.width===this.width&&this.container.width===this.height||(this.container.width=this.width,this.container.height=this.height),this.camera=new THREE.PerspectiveCamera(27,this.width/this.height,5,3500),this.camera.position.z=2750,this.scene=new THREE.Scene,this.scene.background=new THREE.Color(328965),this.scene.fog=new THREE.Fog(328965,2e3,3500);for(var e=new THREE.BufferGeometry,t=[],n=[],i=new THREE.Color,r=1e3,o=0;o<5e5;o++){var a=Math.random()*r-500,s=Math.random()*r-500,h=Math.random()*r-500;t.push(a,s,h);var c=a/r+.5,d=s/r+.5,w=h/r+.5;i.setRGB(c,d,w),n.push(i.r,i.g,i.b)}e.addAttribute("position",new THREE.Float32BufferAttribute(t,3)),e.addAttribute("color",new THREE.Float32BufferAttribute(n,3)),e.computeBoundingSphere();var u=new THREE.PointsMaterial({size:15,vertexColors:THREE.VertexColors});this.points=new THREE.Points(e,u),this.scene.add(this.points),this.renderer=new THREE.WebGLRenderer({canvas:this.container}),this.renderer.setPixelRatio(this.ratio)},i.prototype.animate=function(){requestAnimationFrame(this.animate.bind(this)),this.render()},i.prototype.render=function(){var e=.001*Date.now();this.points.rotation.x=.25*e,this.points.rotation.y=.5*e,this.renderer.render(this.scene,this.camera)};var r=i,o=document.getElementById("canvas-window"),a=document.getElementById("canvas-worker").transferControlToOffscreen();new r(o,{ratio:window.devicePixelRatio});var s,h=new Worker("data/worker/offscreen-canvas-ex02.js");h.postMessage({canvas:a,type:"canvas"},[a]),document.getElementById("canvas-window-check").addEventListener("change",function(e){!s&&e.target.checked||clearInterval(s),e.target.checked&&(s=setInterval(function(){!function(e){var t=(new Date).getTime();for(console.log("Sleeping!");(new Date).getTime()<t+e;);}(1e3)},3e3))}),document.getElementById("canvas-worker-check").addEventListener("change",function(e){h.postMessage({busy:e.target.checked,type:"busy"})});var c=0,d=document.getElementById("interaction-count");document.getElementById("interaction-btn").addEventListener("click",function(){d.innerHTML=(++c).toString()})}},[[45,0]]]);
//# sourceMappingURL=offscreen-canvas-ex02.js.map