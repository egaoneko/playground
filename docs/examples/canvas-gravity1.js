(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{1:function(t,i,n){"use strict";function e(t,i){return Math.floor(Math.random()*(i-t+1)+t)}function o(t,i){return{x:t.x*Math.cos(i)-t.y*Math.sin(i),y:t.x*Math.sin(i)+t.y*Math.cos(i)}}function h(t,i){var n=t.velocity.x-i.velocity.x,e=t.velocity.y-i.velocity.y;if(n*(i.x-t.x)+e*(i.y-t.y)<0)return!1;var h=-Math.atan2(i.y-t.y,i.x-t.x),s=t.mass,c=i.mass,r=o(t.velocity,h),a=o(i.velocity,h),d={x:r.x*(s-c)/(s+c)+2*a.x*c/(s+c),y:r.y},y={x:a.x*(s-c)/(s+c)+2*r.x*c/(s+c),y:a.y},u=o(d,-h),f=o(y,-h);return t.velocity.x=u.x,t.velocity.y=u.y,i.velocity.x=f.x,i.velocity.y=f.y,!0}n.d(i,"a",function(){return e}),n.d(i,"b",function(){return h})},15:function(t,i,n){"use strict";n.r(i);var e=n(1),o=document.querySelector("canvas"),h=o.getContext("2d"),s={x:void 0,y:void 0},c=["#8be9fd","#50fa7b","#ffb86c","#ff79c6","#bd93f9","#ff5555","#f1fa8c"];o.addEventListener("mousemove",function(t){s.x=t.x,s.y=t.y}),o.addEventListener("click",function(){d()}),window.addEventListener("resize",function(){y()});var r=function(t,i,n,e,o,h){this.x=t,this.y=i,this.dx=n,this.dy=e,this.radius=o,this.color=h};r.prototype.draw=function(){h.beginPath(),h.arc(this.x,this.y,this.radius,0,2*Math.PI,!1),h.fillStyle=this.color,h.fill()},r.prototype.update=function(){(this.x+this.radius+this.dx>=o.width||this.x-this.radius+this.dx<0)&&(this.dx*=-.79),this.y+this.radius+this.dy>=o.height?(this.dy*=-.79,this.dx*=.79):this.dy+=1,this.x+=this.dx,this.y+=this.dy,this.draw()};var a=[];function d(){a=[];for(var t=0;t<500;t++){var i=Object(e.a)(8,20),n=Object(e.a)(i,window.innerWidth-i),o=Object(e.a)(-20,20),h=Object(e.a)(i,window.innerHeight-i),s=Object(e.a)(-2,2),d=c[Object(e.a)(0,c.length)];a.push(new r(n,h,o,s,i,d))}}function y(){o.width=window.innerWidth,o.height=window.innerHeight}y(),d(),function t(){h.clearRect(0,0,o.width,o.height),h.fillStyle="#282a36",h.fillRect(0,0,o.width,o.height),a.forEach(function(t){return t.update()}),requestAnimationFrame(t)}()}},[[15,0]]]);
//# sourceMappingURL=canvas-gravity1.js.map