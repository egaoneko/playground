(window.webpackJsonp=window.webpackJsonp||[]).push([[52],{53:function(e,t){var o=document.querySelector("#container");function n(){for(;o.firstChild;)o.removeChild(o.lastChild)}document.querySelector("#local").addEventListener("click",function(){n();var e=document.createElement("video");e.muted=!0,e.autoplay=!0,o.appendChild(e),e.addEventListener("loadedmetadata",function(){console.log("Local video videoWidth: "+this.videoWidth+"px, videoHeight: "+this.videoHeight+"px")}),new i(e)}),document.querySelector("#remote").addEventListener("click",function(){n();var e=document.createElement("video");o.appendChild(e),e.muted=!0,e.autoplay=!0,o.appendChild(e),e.addEventListener("loadedmetadata",function(){console.log("Remote video videoWidth: "+this.videoWidth+"px, videoHeight: "+this.videoHeight+"px")}),new r(e)});var c={iceServers:[{urls:"stun:stun.l.google.com:19302"},{urls:"turn:numb.viagenie.ca",credential:"muazkh",username:"webrtc@live.com"}]},i=function(e,t){var o=this;void 0===t&&(t=c);var n=new RTCPeerConnection(t);this.pc=n,this.video=e,navigator.mediaDevices.getUserMedia({audio:!1,video:{width:1280,height:720,facingMode:"environment"}}).then(function(t){o.stream=t,e.srcObject=t;var c=t.getVideoTracks();c.length>0&&console.log("Using video device: "+c[0].label),t.getTracks().forEach(function(e){return n.addTrack(e,t)}),o.init()}).catch(function(e){return console.log(e)})};i.prototype.init=function(){var e=this,t=this.pc;p("web-rtc-local-candidate"),p("web-rtc-local-description"),p("web-rtc-remote-candidate"),p("web-rtc-remote-description"),t.addEventListener("icecandidate",function(e){var t=e.candidate;console.log("local candidate",t),t&&l("web-rtc-local-candidate",{candidate:t.candidate,sdpMid:t.sdpMid,sdpMLineIndex:t.sdpMLineIndex,foundation:t.foundation,component:t.component,priority:t.priority,protocol:t.protocol,port:t.port,type:t.type,tcpType:t.tcpType,relatedAddress:t.relatedAddress,relatedPort:t.relatedPort,usernameFragment:t.usernameFragment})}),t.addEventListener("iceconnectionstatechange",function(e){return a(t,e)});var o=s("web-rtc-remote-candidate");o?this.addIceCandidate(this.pc,o):m("web-rtc-remote-candidate",function(t){return d(e.pc,t)}),t.createOffer({offerToReceiveVideo:!0}).then(function(e){l("web-rtc-local-description",{type:e.type,sdp:e.sdp}),t.setLocalDescription(e),m("web-rtc-remote-description",function(e){console.log("remote description",e),e&&t.setRemoteDescription(e)}),console.log("Added local stream")}).catch(function(t){console.log(t),e.close()})},i.prototype.close=function(){return this.video.srcObject=null,this.stream.getTracks().forEach(function(e){return e.stop()}),p("web-rtc-local-candidate"),p("web-rtc-local-description"),this.pc.close()};var r=function(e,t){void 0===t&&(t=c),this.pc=new RTCPeerConnection(t),this.video=e,this.init()};function d(e,t){console.log("candidate",t),e.addIceCandidate(new RTCIceCandidate(t)).then(function(){console.log("ICE candidate:\n"+(t?t.candidate:"(null)"))}).catch(function(e){return console.log(e)})}function a(e,t){e&&(console.log("ICE state: "+e.iceConnectionState),console.log("ICE state change event: ",t))}function s(e){return JSON.parse(localStorage.getItem(e))}function l(e,t){localStorage.setItem(e,JSON.stringify(t))}function p(e){localStorage.removeItem(e)}r.prototype.init=function(){var e=this,t=this.pc;p("web-rtc-remote-candidate"),p("web-rtc-remote-description"),t.addEventListener("icecandidate",function(e){var t=e.candidate;console.log("remote candidate",t),t&&l("web-rtc-remote-candidate",{candidate:t.candidate,sdpMid:t.sdpMid,sdpMLineIndex:t.sdpMLineIndex,foundation:t.foundation,component:t.component,priority:t.priority,protocol:t.protocol,port:t.port,type:t.type,tcpType:t.tcpType,relatedAddress:t.relatedAddress,relatedPort:t.relatedPort,usernameFragment:t.usernameFragment})}),t.addEventListener("iceconnectionstatechange",function(e){return a(t,e)}),t.addEventListener("track",function(t){return e.gotRemoteStream(t)});var o=s("web-rtc-local-candidate");o?d(this.pc,o):m("web-rtc-local-candidate",function(t){return d(e.pc,t)});var n=s("web-rtc-local-description");n?this.setDescription(n):m.on("web-rtc-local-description",function(t){return e.setDescription(t)})},r.prototype.setDescription=function(e){var t=this,o=this.pc,n=this.video;console.log("local description",e),e&&o.setRemoteDescription(e).then(function(){return o.createAnswer()}).then(function(e){o.setLocalDescription(e),l("web-rtc-remote-description",{type:e.type,sdp:e.sdp}),n.srcObject=new MediaStream(o.getReceivers().map(function(e){return e.track})),console.log("Added remote stream")}).catch(function(e){console.log(e),t.close()})},r.prototype.gotRemoteStream=function(e){this.video.srcObject!==e.streams[0]&&(this.video.srcObject=e.streams[0],console.log("received remote stream"))},r.prototype.close=function(){return this.video.srcObject=null,p("web-rtc-remote-candidate"),p("web-rtc-remote-description"),this.pc.close()};var u={};function m(e,t){u[e]=t}window.addEventListener("storage",function(e){console.log(e);var t=u[e.key];t&&t(JSON.parse(e.newValue))})}},[[53,0]]]);
//# sourceMappingURL=web-rtc-basic.js.map