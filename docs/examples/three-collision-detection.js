(window.webpackJsonp=window.webpackJsonp||[]).push([[35],{0:function(t,i,e){"use strict";function s(t,i){return Math.floor(Math.random()*(i-t+1)+t)}function n(t,i){return{x:t.x*Math.cos(i)-t.y*Math.sin(i),y:t.x*Math.sin(i)+t.y*Math.cos(i)}}function a(t,i){var e=t.velocity.x-i.velocity.x,s=t.velocity.y-i.velocity.y;if(!(e*(i.x-t.x)+s*(i.y-t.y)<0)){var a=-Math.atan2(i.y-t.y,i.x-t.x),o=t.mass,r=i.mass,h=n(t.velocity,a),c=n(i.velocity,a),y={x:h.x*(o-r)/(o+r)+2*c.x*r/(o+r),y:h.y},d={x:c.x*(o-r)/(o+r)+2*h.x*r/(o+r),y:c.y},u=n(y,-a),l=n(d,-a);t.velocity.x=u.x,t.velocity.y=u.y,i.velocity.x=l.x,i.velocity.y=l.y}}e.d(i,"a",function(){return s}),e.d(i,"b",function(){return a})},35:function(t,i,e){"use strict";e.r(i);var s,n,a,o,r,h,c,y=e(0),d=100,u=.5*d,l=[9169405,5307003,16758892,16742854,12424185,16733525,15858316],x=[],E=function(t,i,e,s,n,a,o,r,h){this.x=t,this.y=i,this.z=e,this.velocity={x:s,y:n,z:a},this.radius=o,this.color=r,this.mass=h,this.opacity=0;var c=new THREE.SphereGeometry(o),y=new THREE.MeshBasicMaterial({color:r});this.mesh=new THREE.Mesh(c,y),this.mesh.position.set(this.x,this.y,this.z)};function p(){o=h.clientWidth,r=h.clientHeight,a.aspect=o/r,a.updateProjectionMatrix(),s.setSize(o,r)}E.prototype.update=function(t){this.x+=this.velocity.x,this.y+=this.velocity.y,this.z+=this.velocity.z,(this.x+this.radius>=u||this.x-this.radius<=-u)&&(this.velocity.x*=-1),(this.y+this.radius>=u||this.y-this.radius<=-u)&&(this.velocity.y*=-1),(this.z+this.radius>=u||this.z-this.radius<=-u)&&(this.velocity.z*=-1),this.x-this.radius<-u&&(this.x=this.radius),this.y-this.radius<-u&&(this.y=this.radius),this.z-this.radius<-u&&(this.z=this.radius),this.mesh.position.set(this.x,this.y,this.z)},E.prototype.isCollided=function(t){var i=this.x-t.x,e=this.y-t.y,s=this.z-t.z;return Math.pow(i,2)+Math.pow(e,2)+Math.pow(s,2)<=Math.pow(this.radius+t.radius,2)},function(){h=document.getElementById("container"),o=h.clientWidth,r=h.clientHeight,(n=new THREE.Scene).background=new THREE.Color(2632246),(a=new THREE.PerspectiveCamera(45,o/r,1,1e3)).position.set(50,80,130),a.lookAt(0,0,0);var t=new THREE.GridHelper(200,20);n.add(t);var i=new THREE.AxesHelper(100);i.position.set(0,0,0),n.add(i),(s=new THREE.WebGLRenderer({antialias:!0})).setPixelRatio(window.devicePixelRatio),s.setSize(o,r),h.appendChild(s.domElement),new THREE.OrbitControls(a,s.domElement).screenSpacePanning=!0,function(){var t=new THREE.BoxGeometry(d,d,d),i=new THREE.MeshBasicMaterial({color:268435455,opacity:.2,transparent:!0}),e=new THREE.MeshBasicMaterial({color:16777215,wireframe:!0});c=THREE.SceneUtils.createMultiMaterialObject(t,[i,e]),n.add(c);for(var s=0,a=function(t){var i=Object(y.a)(1,5),e=Object(y.a)(-u+i,u-i),a=Object(y.a)(-.5,.5),r=Object(y.a)(-u+i,u-i),h=Object(y.a)(-.5,.5),c=Object(y.a)(-u+i,u-i),d=Object(y.a)(-.5,.5),p=l[Object(y.a)(0,l.length)],v=new E(e,r,c,a,h,d,i,p,1);if(x.some(function(t){return t.isCollided(v)})){if((s+=1)>100)return;t-=1}else s=0,x.push(v),n.add(v.mesh);o=t},o=0;o<10;o++)a(o)}(),window.addEventListener("resize",p,!1)}(),function t(){requestAnimationFrame(t);s.render(n,a),x.forEach(function(t){return t.update()})}()}},[[35,0]]]);
//# sourceMappingURL=three-collision-detection.js.map