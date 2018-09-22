(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{21:function(t,i,e){"use strict";e.r(i);var a=function(t,i){t&&(i=Object.assign({width:300,height:300,gravity:.1,radius:5,size:10,dampeningFactor:.99},i),this.canvas=t,this.ctx=this.canvas.getContext("2d"),this.width=i.width,this.height=i.height,this.gravity=i.gravity,this.radius=i.radius,this.size=i.size,this.dampeningFactor=i.dampeningFactor,this.circles=[],this.initializeCircles(),this.executeFrame())};a.prototype.executeFrame=function(){requestAnimationFrame(this.executeFrame.bind(this)),this.iterateSimulation(),this.ctx.fillStyle="rgba(255,255,255,0.3)",this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height),this.drawCircles()},a.prototype.initializeCircles=function(){for(var t=0;t<this.size;t++){var i={x:Math.random()*this.canvas.width,y:Math.random()*this.canvas.height,velocity:{x:0,y:0},color:[255*Math.random(),255*Math.random(),255*Math.random()]};this.circles.push(i)}},a.prototype.drawCircles=function(){var t=this;this.canvas.width===this.width&&this.canvas.width===this.height||(this.canvas.width=this.width,this.canvas.height=this.height,this.initializeCircles(),this.iterateSimulation()),this.ctx.lineWidth="3",this.ctx.strokeRect(0,0,this.canvas.width,this.canvas.height),this.circles.forEach(function(i){t.ctx.beginPath(),t.ctx.arc(i.x,i.y,t.radius,0,2*Math.PI),t.ctx.fillStyle="rgb("+i.color[0]+", "+i.color[1]+", "+i.color[2]+")",t.ctx.fill()})},a.prototype.iterateSimulation=function(){for(var t=0;t<this.size;t++){var i=this.circles[t];i.velocity.y+=this.gravity,i.velocity.x*=this.dampeningFactor,i.velocity.y*=this.dampeningFactor,i.x+=i.velocity.x,i.y+=i.velocity.y,i.y>this.canvas.height-this.radius&&(i.y=this.canvas.height-this.radius,i.velocity.y=-Math.abs(i.velocity.y)),i.y<this.radius&&(i.y=this.radius,i.velocity.y=Math.abs(i.velocity.y)),i.x>this.canvas.width-this.radius&&(i.x=this.canvas.width-this.radius,i.velocity.x=-Math.abs(i.velocity.x)),i.x<this.radius&&(i.x=this.radius,i.velocity.x=Math.abs(i.velocity.x));for(var e=t+1;e<this.size;e++){var a=this.circles[e],s=a.x-i.x,c=a.y-i.y,n=Math.sqrt(s*s+c*c);if(n<2*this.radius){0===n&&(n=.1);var h=-2*(s/n),r=-2*(c/n);i.velocity.x+=h,i.velocity.y+=r,a.velocity.x-=h,a.velocity.y-=r}}}};var s=a,c=document.getElementById("canvas-window"),n=document.getElementById("canvas-worker").transferControlToOffscreen();new s(c,{radius:2,size:50});var h,r=new Worker("data/worker/offscreen-canvas-ex01.js");r.postMessage({canvas:n,type:"canvas"},[n]),document.getElementById("canvas-window-check").addEventListener("change",function(t){!h&&t.target.checked||clearInterval(h),t.target.checked&&(h=setInterval(function(){!function(t){var i=(new Date).getTime();for(console.log("Sleeping!");(new Date).getTime()<i+t;);}(1e3)},3e3))}),document.getElementById("canvas-worker-check").addEventListener("change",function(t){r.postMessage({busy:t.target.checked,type:"busy"})});var o=0,d=document.getElementById("interaction-count");document.getElementById("interaction-btn").addEventListener("click",function(){d.innerHTML=(++o).toString()})}},[[21,0]]]);
//# sourceMappingURL=offscreen-canvas-ex01.js.map