(window.webpackJsonp=window.webpackJsonp||[]).push([[72],{6:function(e,n,t){"use strict";function r(e){for(var n=(new Date).getTime();(new Date).getTime()<n+e;);}function o(){var e={};return e.promise=new Promise(function(n,t){e.resolve=n,e.reject=t}),e}t.d(n,"b",function(){return r}),t.d(n,"a",function(){return o})},75:function(e,n,t){"use strict";t.r(n);var r=t(6),o=document.querySelector("#log-area"),i=document.querySelector("#time-box");requestAnimationFrame(function e(){i.innerText=new Date;requestAnimationFrame(e)}),document.querySelector("#sleep1-btn").addEventListener("click",function(){o.innerHTML+="Sleep without worker!\n",Object(r.b)(3e3),console.log("Sleeping without worker!")}),document.querySelector("#sleep2-btn").addEventListener("click",function(){o.innerHTML+="Sleep with worker!\n";var e=new Worker("data/worker/basic.js");e.addEventListener("message",function(n){console.log(n.data),e.terminate()}),e.postMessage("Main to Worker message.")})}},[[75,0]]]);
//# sourceMappingURL=worker-basic.js.map