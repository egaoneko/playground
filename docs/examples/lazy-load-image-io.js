(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{13:function(e,t,n){"use strict";n.r(t);var r=n(5),o=document.getElementById("scroll-box"),c=document.getElementById("image-box"),a=Object(r.a)(200,100,300),u=new IntersectionObserver(function(e,t){e.forEach(function(e){if(e.isIntersecting){var n=e.target;!function(e){e.src=e.getAttribute("data-src")}(n),t.unobserve(n)}})});!function(e){var t=document.createDocumentFragment();e.forEach(function(e){t.appendChild(function(e){var t=new Image;t.setAttribute("data-src",e);var n=document.createElement("div");return n.className="image-block",n.appendChild(t),n}(e))}),c.appendChild(t)}(a),o.scrollTop=1e3,o.scrollLeft=1500,Array.from(document.querySelectorAll(".image-block > img")).forEach(function(e){u.observe(e)})},5:function(e,t,n){"use strict";function r(){for(var e="#",t=0;t<6;t++)e+="0123456789ABCDEF"[Math.floor(16*Math.random())];return e}function o(e,t,n){if("number"!=typeof e||"number"!=typeof t||"number"!=typeof n)throw new TypeError("Must be params number");for(var o="https://dummyimage.com/"+e+"x"+t+"/",c=[],a=0;a<n;a++)c.push(o+r().slice(1));return c}n.d(t,"a",function(){return o})}},[[13,0]]]);
//# sourceMappingURL=lazy-load-image-io.js.map