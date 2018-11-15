(window.webpackJsonp=window.webpackJsonp||[]).push([[46],{0:function(e,t,r){"use strict";var n=function(e,t,r){void 0===e&&(e=0),void 0===t&&(t=0),void 0===r&&(r=0),this.x=e,this.y=t,this.z=r};n.prototype.divide=function(e){if("number"!=typeof e)throw new Error("invalid input: "+e);return this.x/=e,this.y/=e,this.z/=e,this},n.prototype.cross=function(e){var t=this.x,r=this.y,i=this.z;if(!(e instanceof n))throw new Error("invalid input: "+e);this.x=r*e.z-i*e.y,this.y=i*e.x-t*e.z,this.z=t*e.y-r*e.x},n.prototype.length=function(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)},n.prototype.normalize=function(){return this.divide(this.length())},t.a=n},2:function(e,t,r){"use strict";r.d(t,"a",function(){return i}),r.d(t,"b",function(){return a});var n=r(0);function i(e,t,r,n){for(var i,a,o,s=(n=Object.assign({},{size:10,color:[.5,.5,1,1],translation:[0,0,0],textured:!1},n)).size,u=n.color,f=n.translation,l=n.textured,h=[],c=[],m=t.trianglesNormalBuffers,d=t.trianglesColorBuffers,v=t.trianglesVerticeBuffers,g=t.trianglesTexCoordBuffers,A=t.vertexIndexBuffers,p=0;p<5;++p)h.push(0),h.push(1),h.push(0),c.push(u[0]),c.push(u[1]),c.push(u[2]),c.push(u[3]);i=[0,0,0,-s,0,-s,s,0,-s,s,0,s,-s,0,s],o=[0,0,-s,-s,s,-s,s,s,-s,s];for(var R=0;R<i.length;R+=3)i[R]+=f[0],i[R+1]+=f[1],i[R+2]+=f[2];a=[0,1,2,0,2,3,0,3,4,0,4,1],m[r]=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,m[r]),e.bufferData(e.ARRAY_BUFFER,new Float32Array(h),e.STATIC_DRAW),m[r].itemSize=3,m[r].numItems=h.length/3,d[r]=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,d[r]),e.bufferData(e.ARRAY_BUFFER,new Float32Array(c),e.STATIC_DRAW),d[r].itemSize=4,d[r].numItems=c.length/4,v[r]=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,v[r]),e.bufferData(e.ARRAY_BUFFER,new Float32Array(i),e.STATIC_DRAW),v[r].itemSize=3,v[r].numItems=i.length/3,l&&(g[r]=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,g[r]),e.bufferData(e.ARRAY_BUFFER,new Float32Array(o),e.STATIC_DRAW),g[r].itemSize=2,g[r].numItems=o.length/2),A[r]=e.createBuffer(),e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,A[r]),e.bufferData(e.ELEMENT_ARRAY_BUFFER,new Uint16Array(a),e.STREAM_DRAW),A[r].itemSize=3,A[r].numItems=a.length}function a(e,t,r,i){for(var a=(i=Object.assign({},{color:[1,0,0,1],translation:[0,0,0],radius:1,division:30,smoothShading:!0,textured:!1},i)).color,o=i.translation,s=i.radius,u=i.division,f=i.smoothShading,l=i.textured,h=u,c=u,m=[],d=[],v=[],g=[],A=[],p=t.trianglesNormalBuffers,R=t.trianglesColorBuffers,B=t.trianglesVerticeBuffers,x=t.trianglesTexCoordBuffers,b=t.vertexIndexBuffers,E=0;E<=h;E++)for(var F=E*Math.PI/h,_=Math.sin(F),S=Math.cos(F),y=0;y<=c;y++){var T=2*y*Math.PI/c,I=Math.sin(T),w=Math.cos(T)*_,M=S,U=I*_;A.push(.5*(w+1)),A.push(.5*(M+1)),v.push(w),v.push(M),v.push(U),d.push(a[0]),d.push(a[1]),d.push(a[2]),d.push(a[3]),m.push(s*w+o[0]),m.push(s*M+o[1]),m.push(s*U+o[2])}for(var L=0;L<h;L++)for(var D=0;D<c;D++){var C=L*(c+1)+D,z=C+c+1;g.push(C),g.push(z),g.push(C+1),g.push(z),g.push(z+1),g.push(C+1)}if(!f){m=function(e,t){for(var r=[],n=0;n<t.length;++n){var i=3*t[n];r.push(e[i]),r.push(e[i+1]),r.push(e[i+2])}return r}(m,g),d=[];for(var N=0;N<g.length;++N)d.push(a[0]),d.push(a[1]),d.push(a[2]),d.push(a[3]);v=function(e,t){for(var r=[],i=0;i<t.length;i+=3){var a=3*t[i],o=3*t[i+1],s=3*t[i+2],u=new n.a(e[a],e[a+1],e[a+2]),f=new n.a(e[o],e[o+1],e[o+2]),l=new n.a(e[s],e[s+1],e[s+2]),h=(u.x+f.x+l.x)/3,c=(u.y+f.y+l.y)/3,m=(u.z+f.z+l.z)/3,d=new n.a(h,c,m);r.push(d.x),r.push(d.y),r.push(d.z),r.push(d.x),r.push(d.y),r.push(d.z),r.push(d.x),r.push(d.y),r.push(d.z)}return r}(v,g)}p[r]=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,p[r]),e.bufferData(e.ARRAY_BUFFER,new Float32Array(v),e.STATIC_DRAW),p[r].itemSize=3,p[r].numItems=v.length/3,R[r]=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,R[r]),e.bufferData(e.ARRAY_BUFFER,new Float32Array(d),e.STATIC_DRAW),R[r].itemSize=4,R[r].numItems=d.length/4,B[r]=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,B[r]),e.bufferData(e.ARRAY_BUFFER,new Float32Array(m),e.STATIC_DRAW),B[r].itemSize=3,B[r].numItems=m.length/3,l&&(x[r]=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,x[r]),e.bufferData(e.ARRAY_BUFFER,new Float32Array(A),e.STATIC_DRAW),x[r].itemSize=2,x[r].numItems=A.length/2),b[r]=e.createBuffer(),e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,b[r]),e.bufferData(e.ELEMENT_ARRAY_BUFFER,new Uint16Array(g),e.STREAM_DRAW),b[r].itemSize=3,b[r].numItems=g.length}},3:function(e,t,r){"use strict";r.d(t,"a",function(){return i});var n=r(0),i=function(e){e=Object.assign({},{radius:1,position:new n.a(0,0,0),velocity:new n.a(0,0,0),acceleration:new n.a(0,0,0)},e),this.radius=e.radius,this.position=e.position,this.velocity=e.velocity,this.acceleration=e.acceleration,this.vboIndex=e.vboIndex}},49:function(e,t,r){"use strict";r.r(t);var n=r(2),i=r(3),a=null,o=null,s=null,u=null,f=null,l=null,h=null,c=null,m=null,d=[],v=[],g=[],A=[],p=mat4.create(),R=mat4.create(),B=mat3.create(),x=!1,b={flat:{vertexShader:"\n    attribute vec3 aVertexPosition;\n    attribute vec3 aVertexColor;\n    attribute vec3 aVertexNormal;\n\n    uniform mat4 uPMatrix;    \n    uniform mat4 uMVMatrix;\n    uniform mat3 uNormalMatrix;\n    \n    varying highp vec3 vColor;\n    varying highp vec3 L;\n    varying highp vec3 N;\n    \n    void main(void) {\n      gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);\n      \n      vec3 pointLightPosition = vec3(1.0, 2.0, -1.0);\n      vec3 pointLightDirection = normalize(vec3(pointLightPosition.xyz - aVertexPosition.xyz));\n      vec3 ambientColor = vec3(0.1, 0.1, 0.1);\n      \n      L = vec3(uPMatrix * uMVMatrix * vec4(pointLightDirection, 1.0));\n      N = uNormalMatrix * aVertexNormal;\n      \n      vColor = aVertexColor;\n    }\n  ",fragmentShader:"\n    varying highp vec3 vColor;\n    varying highp vec3 N;\n    varying highp vec3 L;\n    \n    void main(void) {\n      highp float lambert = max(dot(normalize(N), normalize(L)), 0.0);\n      gl_FragColor = vec4(vColor * lambert, 1.0);\n    }\n  "}},E=[],F=[],_=0,S=0,y=1;function T(e,t){var r=a.createShader(t);return a.shaderSource(r,e),a.compileShader(r),a.getShaderParameter(r,a.COMPILE_STATUS)||alert("Error compiling shader: "+a.getShaderInfoLog(r)),r}window.addEventListener("load",function(){o=document.querySelector("#canvas"),s=document.querySelector("#container"),o.width=s.clientWidth,o.height=s.clientHeight,function(){o.addEventListener("mousedown",function(e){!0,F=[e.pageX,e.pageY];var t=function(e){var t=e.pageX-F[0],r=e.pageY-F[1];F[0]=e.pageX,F[1]=e.pageY,_+=t,S+=r},r=function(){document.removeEventListener("mousemove",t),document.removeEventListener("mouseup",r),!1};document.addEventListener("mousemove",t),document.addEventListener("mouseup",r)});var e=function(e){e>0?y+=1:(y-=.1)<.01&&(y=.1)};o.addEventListener("mousewheel",function(t){t.stopPropagation(),t.preventDefault(),e(t.wheelDelta)}),o.addEventListener("DOMMouseScroll",function(t){t.stopPropagation(),t.preventDefault(),e(-.1*t.originalEvent.detail)})}();try{a=o.getContext("webgl")||o.getContext("experimental-webgl")}catch(e){console.error(e)}a&&(!function(e){(function(e,t){var r=b[t].vertexShader,n=b[t].fragmentShader;l=T(r,a.VERTEX_SHADER),f=T(n,a.FRAGMENT_SHADER),a.attachShader(e,l),a.attachShader(e,f),a.linkProgram(e),a.getProgramParameter(e,a.LINK_STATUS)||alert("Unable to initialize the shader program.")})(u=a.createProgram(),e),a.useProgram(u),u.pMatrixUniform=a.getUniformLocation(u,"uPMatrix"),u.mvMatrixUniform=a.getUniformLocation(u,"uMVMatrix"),u.normalMatrixUniform=a.getUniformLocation(u,"uNormalMatrix")}("flat"),Object(n.b)(a,{trianglesNormalBuffers:v,trianglesColorBuffers:g,trianglesVerticeBuffers:d,vertexIndexBuffers:A},0,{translation:[-1,-.75,0],color:[1,0,0,1],division:20,smoothShading:!1}),Object(n.b)(a,{trianglesNormalBuffers:v,trianglesColorBuffers:g,trianglesVerticeBuffers:d,vertexIndexBuffers:A},1,{translation:[0,0,1],color:[0,1,0,1],division:10,smoothShading:!1}),Object(n.b)(a,{trianglesNormalBuffers:v,trianglesColorBuffers:g,trianglesVerticeBuffers:d,vertexIndexBuffers:A},2,{translation:[1,.25,-1],color:[1,1,0,1],division:5,smoothShading:!1}),Object(n.b)(a,{trianglesNormalBuffers:v,trianglesColorBuffers:g,trianglesVerticeBuffers:d,vertexIndexBuffers:A},3,{translation:[-1,1,-1],color:[1,0,1,1]}),Object(n.b)(a,{trianglesNormalBuffers:v,trianglesColorBuffers:g,trianglesVerticeBuffers:d,vertexIndexBuffers:A},4,{translation:[-0,1.75,-0],color:[0,1,1,1]}),Object(n.a)(a,{trianglesNormalBuffers:v,trianglesColorBuffers:g,trianglesVerticeBuffers:d,vertexIndexBuffers:A},5,{translation:[0,-1,0]}),E.push(new i.a({vboIndex:0})),E.push(new i.a({vboIndex:1})),E.push(new i.a({vboIndex:2})),E.push(new i.a({vboIndex:3})),E.push(new i.a({vboIndex:4})),h=a.getAttribLocation(u,"aVertexPosition"),m=a.getAttribLocation(u,"aVertexColor"),c=a.getAttribLocation(u,"aVertexNormal"),a.enableVertexAttribArray(h),a.enableVertexAttribArray(m),a.enableVertexAttribArray(c),function e(){x||(a.clearColor(.7,.7,.7,1),a.clear(a.COLOR_BUFFER_BIT|a.DEPTH_BUFFER_BIT),a.enable(a.DEPTH_TEST),a.viewport(0,0,o.width,o.height),mat4.perspective(p,45,o.width/o.height,.1,100),function(){mat4.identity(R),mat4.translate(R,R,[0,0,-20]),mat4.rotate(R,R,2*_*Math.PI/180,[0,1,0]),mat4.rotate(R,R,2*S*Math.PI/180,[1,0,0]),mat4.scale(R,R,[y,y,y]);var e=mat3.create();mat3.fromMat4(e,R),mat3.invert(B,e),mat3.transpose(B,B),a.uniformMatrix4fv(u.pMatrixUniform,!1,p),a.uniformMatrix4fv(u.mvMatrixUniform,!1,R),a.uniformMatrix3fv(u.normalMatrixUniform,!1,B);for(var t=0;t<A.length;++t)a.bindBuffer(a.ARRAY_BUFFER,d[t]),a.vertexAttribPointer(h,3,a.FLOAT,!1,0,0),a.bindBuffer(a.ARRAY_BUFFER,g[t]),a.vertexAttribPointer(m,4,a.FLOAT,!1,0,0),a.bindBuffer(a.ARRAY_BUFFER,v[t]),a.vertexAttribPointer(c,3,a.FLOAT,!1,0,0),4===t?(a.disable(a.DEPTH_TEST),a.enable(a.BLEND),a.blendFunc(a.SRC_ALPHA,a.ONE),a.blendEquation(a.FUNC_ADD)):(a.disable(a.BLEND),a.enable(a.DEPTH_TEST)),a.bindBuffer(a.ELEMENT_ARRAY_BUFFER,A[t]),t>2?a.drawElements(a.TRIANGLES,A[t].numItems,a.UNSIGNED_SHORT,0):a.drawArrays(a.TRIANGLES,0,d[t].numItems)}()),requestAnimationFrame(e)}())}),document.addEventListener("keyup",function(e){switch(e.keyCode){case 80:x=!x}})}},[[49,0]]]);
//# sourceMappingURL=webgl-physics-base.js.map