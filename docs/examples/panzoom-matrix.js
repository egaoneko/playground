(window.webpackJsonp=window.webpackJsonp||[]).push([[37],{42:function(e,t){var n=document.querySelector("#scene"),r=document.querySelector("#content"),o=panzoom(n,{smoothScroll:!1}),c=document.createElementNS("http://www.w3.org/2000/svg","svg"),i=c.createSVGMatrix(),a=n.getBoundingClientRect(),u=r.getBoundingClientRect();function d(){var e=o.getTransform(),t=e.x,n=e.y,r=e.scale;return i.a=r,i.b=0,i.c=0,i.d=r,i.e=t,i.f=n,i}document.querySelector("#get-center").addEventListener("click",function(){var e=.5*a.width,t=.5*a.height;console.log(function(e,t){var n=c.createSVGPoint();n.x=e,n.y=t;var r=d();return n.matrixTransform(r.inverse())}(e,t))}),document.querySelector("#move-to-center").addEventListener("click",function(){var e=function(e,t){var n=c.createSVGPoint();n.x=e,n.y=t;var r=d();return n.matrixTransform(r)}(.5*u.width,.5*u.height);o.moveBy(.5*a.width-e.x,.5*a.height-e.y)}),window.pz=o}},[[42,0]]]);
//# sourceMappingURL=panzoom-matrix.js.map