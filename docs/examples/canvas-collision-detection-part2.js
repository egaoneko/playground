(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{0:function(i,t,s){"use strict";function e(i,t){return Math.floor(Math.random()*(t-i+1)+i)}function h(i,t){return{x:i.x*Math.cos(t)-i.y*Math.sin(t),y:i.x*Math.sin(t)+i.y*Math.cos(t)}}function n(i,t){var s=i.velocity.x-t.velocity.x,e=i.velocity.y-t.velocity.y;if(s*(t.x-i.x)+e*(t.y-i.y)<0)return!1;var n=-Math.atan2(t.y-i.y,t.x-i.x),o=i.mass,a=t.mass,r=h(i.velocity,n),c=h(t.velocity,n),y={x:r.x*(o-a)/(o+a)+2*c.x*a/(o+a),y:r.y},d={x:c.x*(o-a)/(o+a)+2*r.x*a/(o+a),y:c.y},u=h(y,-n),l=h(d,-n);return i.velocity.x=u.x,i.velocity.y=u.y,t.velocity.x=l.x,t.velocity.y=l.y,!0}s.d(t,"a",function(){return e}),s.d(t,"b",function(){return n})},12:function(i,t,s){"use strict";s.r(t);var e=s(0),h=document.querySelector("canvas"),n=h.getContext("2d"),o={x:10,y:10},a=["#8be9fd","#50fa7b","#ffb86c","#ff79c6","#bd93f9","#ff5555","#f1fa8c"];h.addEventListener("mousemove",function(i){o.x=i.x,o.y=i.y}),window.addEventListener("resize",function(){d()});var r=function(i,t,s,e,h,n,o){this.interactiveSize=80,this.x=i,this.y=t,this.velocity={x:s,y:e},this.radius=h,this.color=n,this.mass=o,this.opacity=0};r.prototype.draw=function(){n.beginPath(),n.arc(this.x,this.y,this.radius,0,2*Math.PI,!1),n.globalAlpha=this.opacity,n.fillStyle=this.color,n.fill(),n.globalAlpha=1,n.strokeStyle=this.color,n.stroke()},r.prototype.update=function(i){var t=this;this.draw(),i.forEach(function(i){t!==i&&t.isCollided(i)&&Object(e.b)(t,i)}),(this.x+this.radius>=window.innerWidth||this.x-this.radius<=0)&&(this.velocity.x*=-1),(this.y+this.radius>=window.innerHeight||this.y-this.radius<=0)&&(this.velocity.y*=-1),this.x-this.radius<0&&(this.x=this.radius),this.y-this.radius<0&&(this.y=this.radius),this.x+this.radius>window.innerWidth&&(this.x=window.innerWidth-this.radius),this.y+this.radius>window.innerHeight&&(this.y=window.innerHeight-this.radius),this.x+=this.velocity.x,this.y+=this.velocity.y,o.x-this.x<this.interactiveSize&&o.x-this.x>-this.interactiveSize&&o.y-this.y<this.interactiveSize&&o.y-this.y>-this.interactiveSize&&this.opacity<.5?this.opacity+=.02:this.opacity>0&&(this.opacity-=.02,this.opacity=Math.max(0,this.opacity))},r.prototype.isCollided=function(i){var t=this.x-i.x,s=this.y-i.y;return Math.pow(t,2)+Math.pow(s,2)<=Math.pow(this.radius+i.radius,2)};var c=[],y=0;function d(){h.width=window.innerWidth,h.height=window.innerHeight}d(),function(){c=[];for(var i=function(i){var s=Object(e.a)(8,50),n=Object(e.a)(s,h.width-s),o=5*Object(e.a)(-.5,.5),d=Object(e.a)(s,h.height-s),u=5*Object(e.a)(-.5,.5),l=a[Object(e.a)(0,a.length)],f=new r(n,d,o,u,s,l,1);if(c.some(function(i){return f.isCollided(i)})){if((y+=1)>100)return;i-=1}else y=0,c.push(f);t=i},t=0;t<100;t++)i(t)}(),function i(){n.clearRect(0,0,h.width,h.height),n.fillStyle="#282a36",n.fillRect(0,0,h.width,h.height),c.forEach(function(i){return i.update(c)}),requestAnimationFrame(i)}()}},[[12,0]]]);
//# sourceMappingURL=canvas-collision-detection-part2.js.map