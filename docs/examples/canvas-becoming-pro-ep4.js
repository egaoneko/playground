(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{11:function(i,t){var h=document.querySelector("canvas"),s=h.getContext("2d"),n={x:void 0,y:void 0},a=["#8be9fd","#50fa7b","#ffb86c","#ff79c6","#bd93f9","#ff5555","#f1fa8c"];h.addEventListener("mousemove",function(i){n.x=i.x,n.y=i.y}),window.addEventListener("resize",function(){r()});var d=function(i,t,h,s,n,a){this.maxRadius=60,this.minRadius=n,this.interactiveSize=100,this.x=i,this.y=t,this.dx=h,this.dy=s,this.radius=n,this.color=a};d.prototype.draw=function(){s.beginPath(),s.arc(this.x,this.y,this.radius,0,2*Math.PI,!1),s.fillStyle=this.color,s.fill()},d.prototype.update=function(){(this.x+this.radius>=window.innerWidth||this.x-this.radius<=0)&&(this.dx*=-1),(this.y+this.radius>=window.innerHeight||this.y-this.radius<=0)&&(this.dy*=-1),this.x-this.radius<0&&(this.x=this.radius),this.y-this.radius<0&&(this.y=this.radius),this.x+this.radius>window.innerWidth&&(this.x=window.innerWidth-this.radius),this.y+this.radius>window.innerHeight&&(this.y=window.innerHeight-this.radius),this.x+=this.dx,this.y+=this.dy,n.x-this.x<this.interactiveSize&&n.x-this.x>-this.interactiveSize&&n.y-this.y<this.interactiveSize&&n.y-this.y>-this.interactiveSize?this.radius<this.maxRadius&&(this.radius+=1):this.radius>this.minRadius&&(this.radius-=1),this.draw()};var e=[];function r(){h.width=window.innerWidth,h.height=window.innerHeight}r(),function(){e=[];for(var i=0;i<800;i++){var t=10*Math.random()+1,s=Math.random()*(h.width-2*t)+t,n=5*(Math.random()-.5),r=Math.random()*(h.height-2*t)+t,o=5*(Math.random()-.5),u=a[Math.floor(Math.random()*(a.length-1))];e.push(new d(s,r,n,o,t,u))}}(),function i(){s.clearRect(0,0,h.width,h.height),s.fillStyle="#282a36",s.fillRect(0,0,h.width,h.height),e.forEach(function(i){return i.update()}),requestAnimationFrame(i)}()}},[[11,0]]]);
//# sourceMappingURL=canvas-becoming-pro-ep4.js.map