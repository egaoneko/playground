(window.webpackJsonp=window.webpackJsonp||[]).push([[39],{1:function(t,e,r){"use strict";function n(t,e){return Math.floor(Math.random()*(e-t+1)+t)}function o(t,e){return{x:t.x*Math.cos(e)-t.y*Math.sin(e),y:t.x*Math.sin(e)+t.y*Math.cos(e)}}function i(t,e){var r=t.velocity.x-e.velocity.x,n=t.velocity.y-e.velocity.y;if(r*(e.x-t.x)+n*(e.y-t.y)<0)return!1;var i=-Math.atan2(e.y-t.y,e.x-t.x),s=t.mass,a=e.mass,c=o(t.velocity,i),u=o(e.velocity,i),p={x:c.x*(s-a)/(s+a)+2*u.x*a/(s+a),y:c.y},h={x:u.x*(s-a)/(s+a)+2*c.x*a/(s+a),y:u.y},f=o(p,-i),l=o(h,-i);return t.velocity.x=f.x,t.velocity.y=f.y,e.velocity.x=l.x,e.velocity.y=l.y,!0}r.d(e,"a",function(){return n}),r.d(e,"b",function(){return i})},4:function(t,e,r){"use strict";var n=Object.prototype.hasOwnProperty,o="~";function i(){}function s(t,e,r,n,i){if("function"!=typeof r)throw new TypeError("The listener must be a function");var s=new function(t,e,r){this.fn=t,this.context=e,this.once=r||!1}(r,n||t,i),a=o?o+e:e;return t._events[a]?t._events[a].fn?t._events[a]=[t._events[a],s]:t._events[a].push(s):(t._events[a]=s,t._eventsCount++),t}function a(t,e){0==--t._eventsCount?t._events=new i:delete t._events[e]}function c(){this._events=new i,this._eventsCount=0}Object.create&&(i.prototype=Object.create(null),(new i).__proto__||(o=!1)),c.prototype.eventNames=function(){var t,e,r=[];if(0===this._eventsCount)return r;for(e in t=this._events)n.call(t,e)&&r.push(o?e.slice(1):e);return Object.getOwnPropertySymbols?r.concat(Object.getOwnPropertySymbols(t)):r},c.prototype.listeners=function(t){var e=o?o+t:t,r=this._events[e];if(!r)return[];if(r.fn)return[r.fn];for(var n=0,i=r.length,s=new Array(i);n<i;n++)s[n]=r[n].fn;return s},c.prototype.listenerCount=function(t){var e=o?o+t:t,r=this._events[e];return r?r.fn?1:r.length:0},c.prototype.emit=function(t,e,r,n,i,s){var a=o?o+t:t;if(!this._events[a])return!1;var c,u,p=this._events[a],h=arguments.length;if(p.fn){switch(p.once&&this.removeListener(t,p.fn,void 0,!0),h){case 1:return p.fn.call(p.context),!0;case 2:return p.fn.call(p.context,e),!0;case 3:return p.fn.call(p.context,e,r),!0;case 4:return p.fn.call(p.context,e,r,n),!0;case 5:return p.fn.call(p.context,e,r,n,i),!0;case 6:return p.fn.call(p.context,e,r,n,i,s),!0}for(u=1,c=new Array(h-1);u<h;u++)c[u-1]=arguments[u];p.fn.apply(p.context,c)}else{var f,l=p.length;for(u=0;u<l;u++)switch(p[u].once&&this.removeListener(t,p[u].fn,void 0,!0),h){case 1:p[u].fn.call(p[u].context);break;case 2:p[u].fn.call(p[u].context,e);break;case 3:p[u].fn.call(p[u].context,e,r);break;case 4:p[u].fn.call(p[u].context,e,r,n);break;default:if(!c)for(f=1,c=new Array(h-1);f<h;f++)c[f-1]=arguments[f];p[u].fn.apply(p[u].context,c)}}return!0},c.prototype.on=function(t,e,r){return s(this,t,e,r,!1)},c.prototype.once=function(t,e,r){return s(this,t,e,r,!0)},c.prototype.removeListener=function(t,e,r,n){var i=o?o+t:t;if(!this._events[i])return this;if(!e)return a(this,i),this;var s=this._events[i];if(s.fn)s.fn!==e||n&&!s.once||r&&s.context!==r||a(this,i);else{for(var c=0,u=[],p=s.length;c<p;c++)(s[c].fn!==e||n&&!s[c].once||r&&s[c].context!==r)&&u.push(s[c]);u.length?this._events[i]=1===u.length?u[0]:u:a(this,i)}return this},c.prototype.removeAllListeners=function(t){var e;return t?(e=o?o+t:t,this._events[e]&&a(this,e)):(this._events=new i,this._eventsCount=0),this},c.prototype.off=c.prototype.removeListener,c.prototype.addListener=c.prototype.on,c.prefixed=o,c.EventEmitter=c,t.exports=c},6:function(t,e,r){"use strict";function n(t){for(var e=(new Date).getTime();(new Date).getTime()<e+t;);}function o(){var t={};return t.promise=new Promise(function(e,r){t.resolve=e,t.reject=r}),t}r.d(e,"b",function(){return n}),r.d(e,"a",function(){return o})},79:function(t,e,r){"use strict";r.r(e);var n=r(6),o=r(1),i=r(4),s=r.n(i);var a=function(t){function e(e,r,n){if(t.call(this),this.param=r,this.transferBuffers=n,this.importScripts=[],"function"==typeof e){var o=e.toString();this.scriptArgs=o.substring(o.indexOf("(")+1,o.indexOf(")")).split(","),this.scriptBody=o.substring(o.indexOf("{")+1,o.lastIndexOf("}")),this.scriptFile=null}else this.scriptArgs=null,this.scriptBody=null,this.scriptFile=e}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.getParameter=function(){return this.param},e.prototype.getImportScripts=function(){return this.importScripts},e.prototype.setImportScripts=function(t){this.importScripts=t},e.prototype.getBuffersToTransfer=function(){return this.transferBuffers},e.prototype.getFunction=function(){return this.scriptArgs?{args:this.scriptArgs,body:this.scriptBody}:null},e.prototype.getScriptFile=function(){return this.scriptFile},e.prototype.functionallyEquals=function(t){return t&&t instanceof e&&function(t,e){return!(t<e||t>e)}(t.scriptArgs,this.scriptArgs)&&t.body===this.body&&t.scriptFile===this.scriptFile},e.prototype.start=function(t){return this.on("start",t)},e.prototype.done=function(t){return this.on("done",t)},e.prototype.error=function(t){return this.on("error",t)},e}(s.a),c=function(t){function e(e){t.call(this);var r=new Worker(e);this.worker=r,r.addEventListener("message",this.emit.bind(this,"message")),r.addEventListener("error",this.emit.bind(this,"error"))}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.postMessage=function(){for(var t=[],e=arguments.length;e--;)t[e]=arguments[e];this.worker.postMessage.apply(this.worker,t)},e.prototype.terminate=function(){return this.worker.terminate()},e}(s.a),u="this.onmessage = function (event) {  var fnData = event.data.function;  var scripts = event.data.importScripts;  var fn = Function.apply(null, fnData.args.concat(fnData.body));  if (importScripts && scripts.length > 0) {    importScripts.apply(null, scripts);  }  fn(event.data.parameter, function(result) {    postMessage(result);  });}",p="data:text/javascript;charset=utf-8,"+encodeURI(u),h=window.createBlobURL||window.createObjectURL;if(!h){var f=window.URL||window.webkitURL;if(!f)throw new Error("No Blob creation implementation found.");h=f.createObjectURL}if("function"==typeof window.BlobBuilder&&"function"==typeof h){var l=new window.BlobBuilder;l.append(u),p=h(l.getBlob())}else if("function"==typeof Blob&&"function"==typeof h){p=h(new Blob([u],{type:"text/javascript"}))}var d={dataUri:p,genericWorkerCode:u}.dataUri,y=function(t){function e(){t.apply(this,arguments)}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.runScriptFile=function(t,e,r){void 0===r&&(r=[]);var n=new c(t);return this.emit("new",n),this.passParamsToWorkerScript(n,e,r),n},e.prototype.runCode=function(t,e,r,n){var o;void 0===r&&(r=[]),void 0===n&&(n=[]);try{o=new c(d)}catch(t){throw t}return this.emit("new",o),this.passParamsToGenericWorker(o,t,e,r,n),o},e.prototype.passParamsToWorkerScript=function(t,e,r){t.postMessage(e,r)},e.prototype.passParamsToGenericWorker=function(t,e,r,n,o){t.postMessage({function:e,importScripts:n,parameter:r},o)},e}(s.a),m=function(t){function e(e){t.call(this),this.threadPool=e,this.factory=new y,this.worker=null,this.currentJob=null,this.lastJob=null}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.terminate=function(){this.worker&&(this.worker.terminate(),this.worker=null)},e.prototype.run=function(t){var e=this,r=!0,n=t.getBuffersToTransfer()||[];this.currentJob=t,this.factory.once("new",function(r){e.wireEventListeners(r,t)}),this.worker&&(this.lastJob&&this.lastJob.functionallyEquals(t)?r=!1:(this.worker.terminate(),this.worker=null)),t.emit("start");try{r?t.getScriptFile()?this.worker=this.factory.runScriptFile(t.getScriptFile(),t.getParameter(),n):this.worker=this.factory.runCode(t.getFunction(),t.getParameter(),t.getImportScripts(),n):(this.wireEventListeners(this.worker,t,!0),t.getScriptFile()?this.factory.passParamsToWorkerScript(this.worker,t.getParameter(),n):this.factory.passParamsToGenericWorker(this.worker,t.getFunction(),t.getParameter(),t.getImportScripts(),n))}finally{this.factory.removeAllListeners("new")}},e.prototype.wireEventListeners=function(t,e,r){void 0===r&&(r=!1),r&&(t.removeAllListeners("message"),t.removeAllListeners("error")),t.on("message",this.handleSuccess.bind(this,e)),t.on("error",this.handleError.bind(this,e))},e.prototype.handleCompletion=function(t){this.currentJob=null,this.lastJob=t,this.emit("done",t)},e.prototype.handleSuccess=function(t,e){this.currentJob.emit("done",e.data),this.threadPool.emit("done",e.data),this.handleCompletion(t)},e.prototype.handleError=function(t,e){this.currentJob.emit("error",e),this.threadPool.emit("error",e),this.handleCompletion(t)},e}(s.a);var v=function(t){function e(r){t.call(this),r=r||e.defaultSize,this.size=r,this.pendingJobs=[],this.idleThreads=[],this.activeThreads=[];for(var n=0;n<r;n++){var o=new m(this);o.on("done",this.handleThreadDone.bind(this,o)),this.idleThreads.push(o)}}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.terminateAll=function(){this.idleThreads.concat(this.activeThreads).forEach(function(t){t.terminate()})},e.prototype.run=function(){for(var t,e,r,n,o,i,s,c=[],u=arguments.length;u--;)c[u]=arguments[u];if(c.length<1)throw new Error("run(): Too few parameters.");if("string"==typeof c[0])t=c.shift();else{if("object"==typeof c[0]&&c[0]instanceof Array&&(r=c.shift()),!(c.length>0&&"function"==typeof c[0]))throw new Error("run(): Missing obligatory thread logic function.");e=c.shift()}if(c.length>0&&"function"!=typeof c[0]&&(n=c.shift()),c.length>0&&"function"!=typeof c[0]&&(o=c.shift()),c.length>0&&"function"==typeof c[0]&&(i=c.shift()),c.length>0)throw new Error("run(): Unrecognized parameters: "+c);return t?s=new a(t,n,o):(s=new a(e,n,o),r&&r.length>0&&s.setImportScripts(r)),i&&s.on("done",i),this.pendingJobs.push(s),function(t){setTimeout(t,0)}(this.runJobs.bind(this)),s},e.prototype.runJobs=function(){if(this.idleThreads.length>0&&this.pendingJobs.length>0){var t=this.idleThreads.shift();this.activeThreads.push(t);var e=this.pendingJobs.shift();t.run(e)}},e.prototype.handleThreadDone=function(t){this.idleThreads.unshift(t),this.activeThreads.splice(this.activeThreads.indexOf(t),1),this.runJobs(),0===this.pendingJobs.length&&0===this.activeThreads.length&&this.emit("allDone")},e.prototype.clearDone=function(){this.removeAllListeners("done")},e.prototype.done=function(t){return this.on("done",t)},e.prototype.error=function(t){return this.on("error",t)},e.prototype.allDone=function(t){return this.once("allDone",t)},e}(s.a),w=v;v.defaultSize=8;var g=function(){this.clear()},b={size:{configurable:!0}};b.size.get=function(){return this.end-this.front},g.prototype.clear=function(){this.store={},this.front=0,this.end=0},g.prototype.enqueue=function(t){this.store[this.end]=t,this.end++},g.prototype.dequeue=function(){if(this.front===this.end)return null;var t=this.store[this.front];return delete this.store[this.front],this.front++,t},g.prototype.peek=function(){return 0===this.size?null:this.store[this.front]},Object.defineProperties(g.prototype,b);var k,x,T=g,E={ESSENTIAL:{key:"ESSENTIAL",priority:0},CRITICAL:{key:"CRITICAL",priority:1},NORMAL:{key:"NORMAL",priority:2},IDLE:{key:"IDLE",priority:3}},O=function(t){function e(e){var r=this;void 0===e&&(e={}),t.call(this),this.processLimitTime=e.processLimitTime?e.processLimitTime:3,this._taskQueues=Object.values(E).sort(function(t,e){return t.priority-e.priority}),this._taskQueueMap=new Map,this._taskQueues.forEach(function(t){return r._taskQueueMap.set(t.key,new T)}),this._threadMap=new Map,this._threadPool=new w,requestAnimationFrame(this.run.bind(this))}t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e;var r={status:{configurable:!0}};return r.status.get=function(){var t=this,e=this._taskQueues.map(function(e){return{key:e.k,priority:e,queue:t._taskQueueMap.get(e.key).size}});return e.push({key:"WORKER",queue:this._threadMap.size}),e},e.prototype.terminate=function(t){if(!t||!this._taskQueueMap.has(t.key))throw new Error("This priority is not exist: "+t.key);this._taskQueueMap.get(t.key).clear(),this.emit("terminate:priority",t)},e.prototype.terminateAll=function(){var t=this;this._taskQueues.forEach(function(e){return t._taskQueueMap.get(e.key).clear()}),this._threadMap.clear(),this._threadPool.terminateAll(),this.emit("terminate:all")},e.prototype.enroll=function(t,e){if(!(t instanceof A))throw new Error("This task is not instance of Task");if(t instanceof S)this._threadMap.set(t.uuid,t),this._processThreadTask(t);else{if(!e||!this._taskQueueMap.has(e.key))throw new Error("This priority is not exist: "+e.key);this._taskQueueMap.get(e.key).enqueue(t)}return this.emit("task:enroll",t),t.promise},e.prototype.run=function(t){var e;do{var r=this._getTask();if(!r)break;this._processTask(r),e=window.performance.now()}while(e-t<this.processLimitTime);requestAnimationFrame(this.run.bind(this))},e.prototype._getTask=function(){var t=this,e=null;return this._taskQueues.some(function(r){return!!(e=t._taskQueueMap.get(r.key).dequeue())}),e},e.prototype._processTask=function(t){t.process(),this.emit("task:process")},e.prototype._processThreadTask=function(t){var e=this;t.process(this._threadPool);var r=function(){e._threadMap.delete(t.uuid),e.emit("worker-task:process")};t.once("done",r),t.once("error",r)},Object.defineProperties(e.prototype,r),e}(s.a),L={NORMAL:0,DONE:1,ERROR:2,ABORT:3},A=function(t){function e(e){for(var r=[],o=arguments.length-1;o-- >0;)r[o]=arguments[o+1];t.call(this),this._deferred=Object(n.a)(),this._uuid=this._uuidv4(),this._initAction(this._deferred,e,r),this.status=L.NORMAL,this.promise=this._deferred.promise}t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e;var r={uuid:{configurable:!0}};return r.uuid.get=function(){return this._uuid},e.prototype.process=function(){this.status===L.NORMAL?this.action():this.status===L.ABORT&&this._abort()},e.prototype._initAction=function(t,e,r){var n=this;this.action=function(){var t;try{t=e.apply(null,r)}catch(t){return void n._error(t)}n._done(t)}},e.prototype._uuidv4=function(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(t){var e=16*Math.random()|0;return("x"===t?e:3&e|8).toString(16)})},e.prototype._error=function(t){this._deferred.reject(t),this.status=L.ERROR,this.emit("error",t)},e.prototype._done=function(t){this._deferred.resolve(t),this.status=L.DONE,this.emit("done",t)},e.prototype._abort=function(){this._deferred.resolve(),this.status=L.ABORT,this.emit("abort")},Object.defineProperties(e.prototype,r),e}(s.a),S=function(t){function e(e){for(var r=[],n=arguments.length-1;n-- >0;)r[n]=arguments[n+1];t.apply(this,[e].concat(r))}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.process=function(t){this.status===L.ABORT&&this._abort(),this.action(t)},e.prototype._initAction=function(t,e,r){var n=this;this.action=function(t){t.run(e,r).error(function(t){n._error(t)}).done(function(t){n._done(t)})}},e}(A);if(!window.perfomance||!window.perfomance.now){Date.now||(Date.now=function(){return(new this).getTime()}),window.perfomance||(window.perfomance={});var M=(window.perfomance.timing||(window.perfomance.timing={})).navigatorStart||(window.perfomance.timing.navigatorStart=Date.now());window.perfomance.now=function(){return Date.now()-M}}!function(){var t=document.getElementById("container"),e=t.clientWidth,r=t.clientHeight,i=document.getElementById("chart"),s=i.getContext("2d");i.width=e,i.height=r;var a=_.throttle(function(){k.data.datasets[0].data=x.status.map(function(t){return t.queue}),k.update()},100);(x=new O).on("task:enroll",a),x.on("task:process",a),x.on("worker-task:process",a),x.on("terminate:priority",a),x.on("terminate:all",a),k=new Chart(s,{type:"horizontalBar",data:{labels:["ESSENTIAL","CRITICAL","NORMAL","IDLE","WORKER"],datasets:[{label:"# of tasks",data:x.status.map(function(t){return t.queue}),backgroundColor:["rgba(255, 99, 132, 0.2)","rgba(255, 206, 86, 0.2)","rgba(54, 162, 235, 0.2)","rgba(75, 192, 192, 0.2)"],borderColor:["rgba(255,99,132,1)","rgba(255, 206, 86, 1)","rgba(54, 162, 235, 1)","rgba(75, 192, 192, 1)"],borderWidth:1}]},options:{scales:{xAxes:[{ticks:{beginAtZero:!0}}]}}}),Object.values(E).forEach(function(t){var e=document.getElementById("enroll-"+t.key.toLowerCase());e&&e.addEventListener("click",function(){for(var e=[],r=Object(o.a)(100,500),n=0;n<r;n++)e.push(x.enroll(u(),t));Promise.all(e).then(function(){return console.log(t.key+" finished")})})}),Object.values(E).forEach(function(t){var e=document.getElementById("terminate-"+t.key.toLowerCase());e&&e.addEventListener("click",function(){x.terminate(t)})});var c=document.getElementById("enroll-worker");function u(){return new A(function(){Object(n.b)(Object(o.a)(1,4))})}c.addEventListener("click",function(){x.enroll(new S(function(t,e){var r=(new Date).getTime();for(console.time("worker");(new Date).getTime()<r+3e3;);console.timeEnd("worker"),e()})).then(function(){return console.log("worker finished")})}),(c=document.getElementById("terminate-all")).addEventListener("click",function(){x.terminateAll()}),(c=document.getElementById("enroll-abort")).addEventListener("click",function(){for(var t=[],e=Object(o.a)(500,1e3),r=0;r<e;r++){var n=u();t.push(x.enroll(n,E.ESSENTIAL)),n.status=L.ABORT}Promise.all(t).then(function(){return console.log("Aborted finished")})})}(),window.DEBUG={taskRunner:x}}},[[79,0]]]);
//# sourceMappingURL=task-runner.js.map