(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{0:function(n,e,t){"use strict";function o(){for(var n="#",e=0;e<6;e++)n+="0123456789ABCDEF"[Math.floor(16*Math.random())];return n}function r(n,e,t){if("number"!=typeof n||"number"!=typeof e||"number"!=typeof t)throw new TypeError("Must be params number");for(var r="https://dummyimage.com/"+n+"x"+e+"/",a=[],u=0;u<t;u++)a.push(r+o().slice(1));return a}t.d(e,"a",function(){return r})},14:function(n,e,t){"use strict";t.r(e);var o=t(0),r=document.getElementById("image-box"),a=0,u=Object(o.a)(400,200,10);r.style.backgroundImage=b(u[a]),g("image-box-prev-btn",function(){a<1||(a-=1,r.style.backgroundImage=b(u[a]))}),g("image-box-next-btn",function(){a>=u.length-1||(a+=1,r.style.backgroundImage=b(u[a]))});var c=document.getElementById("preload-image-box"),i=0,m=Object(o.a)(400,200,10);function b(n){return"url("+n+")"}function g(n,e){document.getElementById(n).addEventListener("click",e)}c.style.backgroundImage=b(m[i]),function(n){n.forEach(function(n){setTimeout(function(){var e=new Image;e.src=n,e.onload=function(){e=null}})})}(m),g("preload-image-box-prev-btn",function(){i<1||(i-=1,c.style.backgroundImage=b(m[i]))}),g("preload-image-box-next-btn",function(){i>=m.length-1||(i+=1,c.style.backgroundImage=b(m[i]))})}},[[14,0]]]);
//# sourceMappingURL=pre-load-image-js.js.map