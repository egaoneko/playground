(window.webpackJsonp=window.webpackJsonp||[]).push([[50],{53:function(e,n){var t=document.querySelector("#log-area"),o=document.querySelector("#time-box");requestAnimationFrame(function e(){o.innerText=new Date;requestAnimationFrame(e)}),document.querySelector("#sleep1-btn").addEventListener("click",function(){t.innerHTML+="Sleep without worker!\n",function(e){var n=(new Date).getTime();console.log("Sleeping without worker!");for(;(new Date).getTime()<n+e;);}(3e3)}),document.querySelector("#sleep2-btn").addEventListener("click",function(){t.innerHTML+="Sleep with worker!\n";var e=new Worker("data/worker/basic.js");e.addEventListener("message",function(n){console.log(n.data),e.terminate()}),e.postMessage("Main to Worker message.")})}},[[53,0]]]);
//# sourceMappingURL=worker-basic.js.map