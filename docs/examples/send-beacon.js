(window.webpackJsonp=window.webpackJsonp||[]).push([[41],{45:function(e,n){var t="https://putsreq.herokuapp.com/"+("smilecat-beacon-"+(new Date).toISOString().split("T")[0]),o=t+"/inspect";function r(e,n){navigator.sendBeacon(e,n)}function a(e,n,t){var o=new XMLHttpRequest;o.open("POST",e,t),o.setRequestHeader("Content-Type","text/plain;charset=UTF-8"),o.send(n)}document.querySelector("#inspect-link").addEventListener("click",function(e){e.preventDefault(),e.stopPropagation(),location.href=o}),document.querySelector("#send-beacon-1").addEventListener("click",function(){"sendBeacon"in navigator||alert("Not support sendBeacon in this browser."),r(t,"Just sent by a beacon! @"+new Date)}),document.querySelector("#send-beacon-2").addEventListener("click",function(){"sendBeacon"in navigator||alert("Not support sendBeacon in this browser."),window.addEventListener("beforeunload",function(){r(t,"Sent by a beacon when beforeunload! @"+new Date)},!1)}),document.querySelector("#send-beacon-3").addEventListener("click",function(){"sendBeacon"in navigator||alert("Not support sendBeacon in this browser."),window.addEventListener("unload",function(){r(t,"Sent by a beacon when unload! @"+new Date)},!1)}),document.querySelector("#send-beacon-4").addEventListener("click",function(){"sendBeacon"in navigator||alert("Not support sendBeacon in this browser."),window.addEventListener("pagehide",function(){r(t,"Sent by a beacon when pagehide! @"+new Date)},!1)}),document.querySelector("#send-beacon-5").addEventListener("click",function(){throw"sendBeacon"in navigator||alert("Not support sendBeacon in this browser."),new Error("Global Error Test")}),document.querySelector("#send-beacon-5").addEventListener("click",function(){"sendBeacon"in navigator||alert("Not support sendBeacon in this browser.");var e=function(n){var o=n.message,a=n.filename,i=n.lineno,c=n.colno,s=n.error,d=new FormData;d.append("message",o),d.append("filename",a),d.append("lineno",i),d.append("colno",c),d.append("error",s),r(t,d),window.removeEventListener("error",e,!1)};throw window.addEventListener("error",e,!1),"Sent by a beacon when global error! @"+new Date}),document.querySelector("#send-beacon-6").addEventListener("click",function(){"sendBeacon"in navigator||alert("Not support sendBeacon in this browser.");var e=new XMLHttpRequest;e.open("GET","http://numbersapi.com/42",!1),e.send(null),200===e.status&&console.log(e.responseText),new ReportingObserver(function(e,n){e.forEach(function(e){r(t,JSON.stringify(e.body,["id","columnNumber","lineNumber","message","sourceFile"]))}),n.disconnect()},{types:["intervention","deprecation"],buffered:!0}).observe()}),document.querySelector("#async-xmlhttprequest").addEventListener("click",function(){window.addEventListener("beforeunload",function(){a(t,"Sent by a async XMLHttpRequest when beforeunload! @"+new Date,!0)},!1)}),document.querySelector("#sync-xmlhttprequest").addEventListener("click",function(){window.addEventListener("beforeunload",function(){a(t,"Sent by a sync XMLHttpRequest when beforeunload! @"+new Date,!1)},!1)})}},[[45,0]]]);
//# sourceMappingURL=send-beacon.js.map