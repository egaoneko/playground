(window.webpackJsonp=window.webpackJsonp||[]).push([[59],{0:function(t,i,e){"use strict";var n=function(t,i,e){void 0===t&&(t=0),void 0===i&&(i=0),void 0===e&&(e=0),this.x=t,this.y=i,this.z=e};n.prototype.divide=function(t){if("number"!=typeof t)throw new Error("invalid input: "+t);return this.x/=t,this.y/=t,this.z/=t,this},n.prototype.cross=function(t){var i=this.x,e=this.y,o=this.z;if(!(t instanceof n))throw new Error("invalid input: "+t);this.x=e*t.z-o*t.y,this.y=o*t.x-i*t.z,this.z=i*t.y-e*t.x},n.prototype.length=function(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)},n.prototype.normalize=function(){return this.divide(this.length())},i.a=n},3:function(t,i,e){"use strict";e.d(i,"b",function(){return o}),e.d(i,"c",function(){return r}),e.d(i,"a",function(){return a});var n=e(0),o=function(t){t=Object.assign({},{radius:1,position:new n.a(0,0,0),velocity:new n.a(0,0,0),acceleration:new n.a(0,0,0)},t),this.radius=t.radius,this.position=t.position,this.velocity=t.velocity,this.acceleration=t.acceleration,this.vboIndex=t.vboIndex,this.totalVelocity=0},r=function(t){t=Object.assign({},{startX:0,startY:0,endX:0,endY:0},t),this.slope=0,(t.endX-t.startX>1e-4||t.endX-t.startX<-.001)&&(this.slope=(t.endY-t.startY)/(t.endX-t.startX)),this.startX=t.startX,this.startY=t.startY,this.endX=t.endX,this.endY=t.endY;var i=[t.startX-t.endX,t.startY-t.endY];this.angle=0,this.angle=Math.atan2(i[1],i[0])},a=function(t,i){void 0===t&&(t=[.1*(Math.random()-.5),.1*(Math.random()-.5),.1*(Math.random()-.5)]),void 0===i&&(i=[1,0,0,.5]),this.position=t,this.color=i,this.velocity=[.1*(Math.random()-.5),.1*(Math.random()-.5),.1*(Math.random()-.5)],Math.abs(this.velocity[0])<.01&&Math.abs(this.velocity[1])<.01&&Math.abs(this.velocity[2])<.01&&(this.velocity[0]=.1),this.age=0,this.lifespan=20,this.size=1};a.prototype.update=function(){this.position[0]+=.1*this.velocity[0],this.position[1]+=.1*this.velocity[1],this.position[2]+=.1*this.velocity[2];var t=Math.abs(this.position[0]),i=Math.abs(this.position[1]),e=Math.abs(this.position[2]);t*t+i*i+e*e>4&&(this.position=[2*Math.random()-1,2*Math.random()-1,2*Math.random()-1],this.velocity=[2*Math.random()-1,2*Math.random()-1,2*Math.random()-1],this.age<10?this.color=[1,1,1,.75]:this.age<this.lifespan?this.color=[0,0,1,.75]:this.color=[1,1,1,0],this.age++)}},63:function(t,i,e){"use strict";e.r(i);var n=e(3),o=null,r=null,a=null,s=null,h=null,c=null,l=null,u=null,d=[],f=[],p=[],m=null,v=null,g=mat4.create(),y=mat4.create(),M=mat3.create(),A=!1,b=1e4,x=document.querySelector("#volume"),R=document.querySelector("#volume_label");function S(t){b=t,R.innerHTML=t,E(b)}function w(t,i){var e=o.createShader(i);return o.shaderSource(e,t),o.compileShader(e),o.getShaderParameter(e,o.COMPILE_STATUS)||alert("Error compiling shader: "+o.getShaderInfoLog(e)),e}function E(t){d=[];for(var i=0;i<t;++i)d[i]=new n.a;f=[];for(var e=0;e<d.length;++e)f.push(d[e].position[0]),f.push(d[e].position[1]),f.push(d[e].position[2]);p=[];for(var o=0;o<d.length;++o)p.push(d[o].color[0]),p.push(d[o].color[1]),p.push(d[o].color[2]),p.push(d[o].color[3])}x.value=b,S(b),x.addEventListener("change",function(t){S(t.target.value)}),window.addEventListener("load",function(){r=document.querySelector("#canvas"),a=document.querySelector("#container"),r.width=a.clientWidth,r.height=a.clientHeight;try{o=r.getContext("webgl")||r.getContext("experimental-webgl")}catch(t){console.error(t)}o&&(!function(){var t="\n    attribute vec3 aVertexPosition;\n    attribute vec4 aVertexColor;\n\n    uniform mat4 uPMatrix;\n    uniform mat4 uMVMatrix;\n\n    varying vec4 color;\n\n    void main(void) {\n      color = aVertexColor;\n      gl_PointSize = 3.0;\n      gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition.xyz, 1.0);\n    }\n  ",i="\n    varying highp vec4 color;\n\n    void main(void) {   \n      gl_FragColor = color;\n    }\n  ";c=w(t,o.VERTEX_SHADER),h=w(i,o.FRAGMENT_SHADER),s=o.createProgram(),o.attachShader(s,c),o.attachShader(s,h),o.linkProgram(s),o.getProgramParameter(s,o.LINK_STATUS)||alert("Unable to initialize the shader program.");o.useProgram(s)}(),E(b),s.pMatrixUniform=o.getUniformLocation(s,"uPMatrix"),s.mvMatrixUniform=o.getUniformLocation(s,"uMVMatrix"),l=o.getAttribLocation(s,"aVertexPosition"),u=o.getAttribLocation(s,"aVertexColor"),o.enableVertexAttribArray(l),o.enableVertexAttribArray(u),m=o.createBuffer(),v=o.createBuffer(),function t(){A||(!function(){o.clearColor(.1,.1,.1,1),o.clear(o.COLOR_BUFFER_BIT),o.enable(o.DEPTH_TEST),o.enable(o.BLEND),o.blendFunc(o.SRC_ALPHA,o.ONE_MINUS_SRC_ALPHA),o.viewport(0,0,r.width,r.height),mat4.perspective(g,45,r.width/r.height,.1,100),mat4.identity(y),mat4.translate(y,y,[0,0,-4]);var t=mat3.create();mat3.fromMat4(t,y),mat3.invert(M,t),mat3.transpose(M,M)}(),function(){for(var t=0;t<d.length;++t)d[t].update();f=[];for(var i=0;i<d.length;++i)f.push(d[i].position[0]),f.push(d[i].position[1]),f.push(d[i].position[2]);p=[];for(var e=0;e<d.length;++e)p.push(d[e].color[0]),p.push(d[e].color[1]),p.push(d[e].color[2]),p.push(d[e].color[3])}(),o.bindBuffer(o.ARRAY_BUFFER,m),o.bufferData(o.ARRAY_BUFFER,new Float32Array(f),o.STATIC_DRAW),m.itemSize=3,m.numItems=f.length/3,o.bindBuffer(o.ARRAY_BUFFER,v),o.bufferData(o.ARRAY_BUFFER,new Float32Array(p),o.STATIC_DRAW),v.itemSize=4,v.numItems=p.length/4,o.uniformMatrix4fv(s.pMatrixUniform,!1,g),o.uniformMatrix4fv(s.mvMatrixUniform,!1,y),o.bindBuffer(o.ARRAY_BUFFER,m),o.vertexAttribPointer(l,3,o.FLOAT,!1,0,0),o.bindBuffer(o.ARRAY_BUFFER,v),o.vertexAttribPointer(u,4,o.FLOAT,!1,0,0),o.drawArrays(o.POINTS,0,f.length/3)),requestAnimationFrame(t)}())}),document.addEventListener("keyup",function(t){switch(t.keyCode){case 80:A=!A}})}},[[63,0]]]);
//# sourceMappingURL=webgl-particle-system.js.map