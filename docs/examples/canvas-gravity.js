(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{35:function(t,i,n){"use strict";function h(t,i){return Math.floor(Math.random()*(i-t+1)+t)}n.r(i);var e=document.querySelector("canvas"),d=e.getContext("2d"),s={x:void 0,y:void 0},o=["#8be9fd","#50fa7b","#ffb86c","#ff79c6","#bd93f9","#ff5555","#f1fa8c"];e.addEventListener("mousemove",function(t){s.x=t.x,s.y=t.y}),e.addEventListener("click",function(){c()}),window.addEventListener("resize",function(){f()});var r=function(t,i,n,h,e,d){this.x=t,this.y=i,this.dx=n,this.dy=h,this.radius=e,this.color=d};r.prototype.draw=function(){d.beginPath(),d.arc(this.x,this.y,this.radius,0,2*Math.PI,!1),d.fillStyle=this.color,d.fill()},r.prototype.update=function(){(this.x+this.radius+this.dx>=e.width||this.x-this.radius+this.dx<0)&&(this.dx*=-.79),this.y+this.radius+this.dy>=e.height?(this.dy*=-.79,this.dx*=.79):this.dy+=1,this.x+=this.dx,this.y+=this.dy,this.draw()};var a=[];function c(){a=[];for(var t=0;t<500;t++){var i=h(8,20),n=h(i,window.innerWidth-i),e=h(-20,20),d=h(i,window.innerHeight-i),s=h(-2,2),c=o[h(0,o.length)];a.push(new r(n,d,e,s,i,c))}}function f(){e.width=window.innerWidth,e.height=window.innerHeight}f(),c(),function t(){d.clearRect(0,0,e.width,e.height),d.fillStyle="#282a36",d.fillRect(0,0,e.width,e.height),a.forEach(function(t){return t.update()}),requestAnimationFrame(t)}()}},[[35,0]]]);
//# sourceMappingURL=canvas-gravity.js.map