(window.webpackJsonp=window.webpackJsonp||[]).push([[73],{0:function(t,e,r){"use strict";var i=function(t,e,r){void 0===t&&(t=0),void 0===e&&(e=0),void 0===r&&(r=0),this.x=t,this.y=e,this.z=r};i.prototype.divide=function(t){if("number"!=typeof t)throw new Error("invalid input: "+t);return this.x/=t,this.y/=t,this.z/=t,this},i.prototype.cross=function(t){var e=this.x,r=this.y,n=this.z;if(!(t instanceof i))throw new Error("invalid input: "+t);this.x=r*t.z-n*t.y,this.y=n*t.x-e*t.z,this.z=e*t.y-r*t.x},i.prototype.length=function(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)},i.prototype.normalize=function(){return this.divide(this.length())},e.a=i},1:function(t,e,r){"use strict";r.d(e,"c",function(){return n}),r.d(e,"d",function(){return a}),r.d(e,"a",function(){return o}),r.d(e,"b",function(){return s});var i=r(0);function n(t,e,r,i){for(var n,a,o,s=(i=Object.assign({},{size:10,color:[.5,.5,1,1],translation:[0,0,0],textured:!1},i)).size,u=i.color,f=i.translation,h=i.textured,l=[],c=[],v=e.trianglesNormalBuffers,d=e.trianglesColorBuffers,m=e.trianglesVerticeBuffers,p=e.trianglesTexCoordBuffers,A=e.vertexIndexBuffers,R=0;R<5;++R)l.push(0),l.push(1),l.push(0),c.push(u[0]),c.push(u[1]),c.push(u[2]),c.push(u[3]);n=[0,0,0,-s,0,-s,s,0,-s,s,0,s,-s,0,s],o=[0,0,-s,-s,s,-s,s,s,-s,s];for(var g=0;g<n.length;g+=3)n[g]+=f[0],n[g+1]+=f[1],n[g+2]+=f[2];a=[0,1,2,0,2,3,0,3,4,0,4,1],v[r]=t.createBuffer(),t.bindBuffer(t.ARRAY_BUFFER,v[r]),t.bufferData(t.ARRAY_BUFFER,new Float32Array(l),t.STATIC_DRAW),v[r].itemSize=3,v[r].numItems=l.length/3,d[r]=t.createBuffer(),t.bindBuffer(t.ARRAY_BUFFER,d[r]),t.bufferData(t.ARRAY_BUFFER,new Float32Array(c),t.STATIC_DRAW),d[r].itemSize=4,d[r].numItems=c.length/4,m[r]=t.createBuffer(),t.bindBuffer(t.ARRAY_BUFFER,m[r]),t.bufferData(t.ARRAY_BUFFER,new Float32Array(n),t.STATIC_DRAW),m[r].itemSize=3,m[r].numItems=n.length/3,h&&(p[r]=t.createBuffer(),t.bindBuffer(t.ARRAY_BUFFER,p[r]),t.bufferData(t.ARRAY_BUFFER,new Float32Array(o),t.STATIC_DRAW),p[r].itemSize=2,p[r].numItems=o.length/2),A[r]=t.createBuffer(),t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,A[r]),t.bufferData(t.ELEMENT_ARRAY_BUFFER,new Uint16Array(a),t.STREAM_DRAW),A[r].itemSize=3,A[r].numItems=a.length}function a(t,e,r,n){for(var a=(n=Object.assign({},{color:[1,0,0,1],translation:[0,0,0],radius:1,division:30,smoothShading:!0,textured:!1},n)).color,o=n.translation,s=n.radius,u=n.division,f=n.smoothShading,h=n.textured,l=u,c=u,v=[],d=[],m=[],p=[],A=[],R=e.trianglesNormalBuffers,g=e.trianglesColorBuffers,x=e.trianglesVerticeBuffers,B=e.trianglesTexCoordBuffers,E=e.vertexIndexBuffers,y=0;y<=l;y++)for(var F=y*Math.PI/l,b=Math.sin(F),M=Math.cos(F),_=0;_<=c;_++){var T=2*_*Math.PI/c,S=Math.sin(T),U=Math.cos(T)*b,w=M,z=S*b;A.push(.5*(U+1)),A.push(.5*(w+1)),m.push(U),m.push(w),m.push(z),d.push(a[0]),d.push(a[1]),d.push(a[2]),d.push(a[3]),v.push(s*U+o[0]),v.push(s*w+o[1]),v.push(s*z+o[2])}for(var I=0;I<l;I++)for(var D=0;D<c;D++){var Y=I*(c+1)+D,L=Y+c+1;p.push(Y),p.push(L),p.push(Y+1),p.push(L),p.push(L+1),p.push(Y+1)}if(!f){v=function(t,e){for(var r=[],i=0;i<e.length;++i){var n=3*e[i];r.push(t[n]),r.push(t[n+1]),r.push(t[n+2])}return r}(v,p),d=[];for(var C=0;C<p.length;++C)d.push(a[0]),d.push(a[1]),d.push(a[2]),d.push(a[3]);m=function(t,e){for(var r=[],n=0;n<e.length;n+=3){var a=3*e[n],o=3*e[n+1],s=3*e[n+2],u=new i.a(t[a],t[a+1],t[a+2]),f=new i.a(t[o],t[o+1],t[o+2]),h=new i.a(t[s],t[s+1],t[s+2]),l=(u.x+f.x+h.x)/3,c=(u.y+f.y+h.y)/3,v=(u.z+f.z+h.z)/3,d=new i.a(l,c,v);r.push(d.x),r.push(d.y),r.push(d.z),r.push(d.x),r.push(d.y),r.push(d.z),r.push(d.x),r.push(d.y),r.push(d.z)}return r}(m,p)}R[r]=t.createBuffer(),t.bindBuffer(t.ARRAY_BUFFER,R[r]),t.bufferData(t.ARRAY_BUFFER,new Float32Array(m),t.STATIC_DRAW),R[r].itemSize=3,R[r].numItems=m.length/3,g[r]=t.createBuffer(),t.bindBuffer(t.ARRAY_BUFFER,g[r]),t.bufferData(t.ARRAY_BUFFER,new Float32Array(d),t.STATIC_DRAW),g[r].itemSize=4,g[r].numItems=d.length/4,x[r]=t.createBuffer(),t.bindBuffer(t.ARRAY_BUFFER,x[r]),t.bufferData(t.ARRAY_BUFFER,new Float32Array(v),t.STATIC_DRAW),x[r].itemSize=3,x[r].numItems=v.length/3,h&&(B[r]=t.createBuffer(),t.bindBuffer(t.ARRAY_BUFFER,B[r]),t.bufferData(t.ARRAY_BUFFER,new Float32Array(A),t.STATIC_DRAW),B[r].itemSize=2,B[r].numItems=A.length/2),E[r]=t.createBuffer(),t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,E[r]),t.bufferData(t.ELEMENT_ARRAY_BUFFER,new Uint16Array(p),t.STREAM_DRAW),E[r].itemSize=3,E[r].numItems=p.length}function o(t,e,r,i){void 0===r&&(r=1),void 0===i&&(i=10);for(var n=r/i,a=[],o=0;o<=i;++o)for(var s=0;s<=i;++s)a.push(o*n),a.push(0),a.push(s*n);for(var u=[0],f=0;f<i;++f)if(f%2==0)for(var h=0;h<=i;++h)0!==h&&u.push(f*(i+1)+h),u.push((f+1)*(i+1)+h);else for(var l=0;l<=i;++l)0!==l&&u.push((f+1)*(i+1)-(l+1)),u.push((f+2)*(i+1)-(l+1));e.trianglesVerticesBuffer=t.createBuffer(),t.bindBuffer(t.ARRAY_BUFFER,e.trianglesVerticesBuffer),t.bufferData(t.ARRAY_BUFFER,new Float32Array(a),t.STATIC_DRAW),e.trianglesVerticesBuffer.itemSize=3,e.trianglesVerticesBuffer.numItems=a.length/3,e.vertexIndexBuffer=t.createBuffer(),t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,e.vertexIndexBuffer),t.bufferData(t.ELEMENT_ARRAY_BUFFER,new Uint16Array(u),t.STREAM_DRAW),e.vertexIndexBuffer.itemSize=3,e.vertexIndexBuffer.numItems=u.length}function s(t,e,r,i){void 0===r&&(r=1),void 0===i&&(i=3);for(var n=Math.pow(2,i),a=r/n,o=[],s=0;s<=n;++s)for(var u=0;u<=n;++u)o.push(s*a-.5*r),o.push(0),o.push(u*a-.5*r);o[3*(0+0*(n+1))+1]=1.5,o[3*(n+0*(n+1))+1]=3.5,o[3*(0+n*(n+1))+1]=2,o[3*(n+n*(n+1))+1]=1,function t(e,r,i,n,a,o,s){if(r[0]+1===a[0]||r[1]+1===a[1])return;var u=[(r[0]+a[0])/2,(r[1]+a[1])/2];var f=[r[0],(r[1]+n[1])/2];var h=[i[0],(i[1]+a[1])/2];var l=[(r[0]+i[0])/2,r[1]];var c=[(n[0]+a[0])/2,n[1]];var v=e[3*(r[0]+r[1]*(o+1))+1];var d=e[3*(i[0]+i[1]*(o+1))+1];var m=e[3*(n[0]+n[1]*(o+1))+1];var p=e[3*(a[0]+a[1]*(o+1))+1];var A=(v+d)/2;e[3*(l[0]+l[1]*(o+1))+1]=A;var R=(m+p)/2;e[3*(c[0]+c[1]*(o+1))+1]=R;var g=(v+m)/2;e[3*(f[0]+f[1]*(o+1))+1]=g;var x=(d+p)/2;e[3*(h[0]+h[1]*(o+1))+1]=x;e[3*(u[0]+u[1]*(o+1))+1]=(v+d+m+p)/4+(-.5+Math.random())*Math.pow(.65,s-2);t(e,r,l,f,u,o,s+1);t(e,l,i,u,h,o,s+1);t(e,f,u,n,c,o,s+1);t(e,u,h,c,a,o,s+1)}(o,[0,0],[n,0],[0,n],[n,n],n,0);for(var f=[0],h=0;h<n;++h)if(h%2==0)for(var l=0;l<=n;++l)0!==l&&f.push(l+h*(n+1)),f.push(l+(h+1)*(n+1));else for(var c=0;c<=n;++c)0!==c&&f.push((h+1)*(n+1)-(c+1)),f.push((h+2)*(n+1)-(c+1));e.trianglesVerticesBuffer=t.createBuffer(),t.bindBuffer(t.ARRAY_BUFFER,e.trianglesVerticesBuffer),t.bufferData(t.ARRAY_BUFFER,new Float32Array(o),t.STATIC_DRAW),e.trianglesVerticesBuffer.itemSize=3,e.trianglesVerticesBuffer.numItems=o.length/3,e.vertexIndexBuffer=t.createBuffer(),t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,e.vertexIndexBuffer),t.bufferData(t.ELEMENT_ARRAY_BUFFER,new Uint16Array(f),t.STREAM_DRAW),e.vertexIndexBuffer.itemSize=3,e.vertexIndexBuffer.numItems=f.length}},3:function(t,e,r){"use strict";r.d(e,"b",function(){return n}),r.d(e,"c",function(){return a}),r.d(e,"a",function(){return o});var i=r(0),n=function(t){t=Object.assign({},{radius:1,position:new i.a(0,0,0),velocity:new i.a(0,0,0),acceleration:new i.a(0,0,0)},t),this.radius=t.radius,this.position=t.position,this.velocity=t.velocity,this.acceleration=t.acceleration,this.vboIndex=t.vboIndex,this.totalVelocity=0},a=function(t){t=Object.assign({},{startX:0,startY:0,endX:0,endY:0},t),this.slope=0,(t.endX-t.startX>1e-4||t.endX-t.startX<-.001)&&(this.slope=(t.endY-t.startY)/(t.endX-t.startX)),this.startX=t.startX,this.startY=t.startY,this.endX=t.endX,this.endY=t.endY;var e=[t.startX-t.endX,t.startY-t.endY];this.angle=0,this.angle=Math.atan2(e[1],e[0])},o=function(t,e){void 0===t&&(t=[.1*(Math.random()-.5),.1*(Math.random()-.5),.1*(Math.random()-.5)]),void 0===e&&(e=[1,0,0,.5]),this.position=t,this.color=e,this.velocity=[.1*(Math.random()-.5),.1*(Math.random()-.5),.1*(Math.random()-.5)],Math.abs(this.velocity[0])<.01&&Math.abs(this.velocity[1])<.01&&Math.abs(this.velocity[2])<.01&&(this.velocity[0]=.1),this.age=0,this.lifespan=20,this.size=1};o.prototype.update=function(){this.position[0]+=.1*this.velocity[0],this.position[1]+=.1*this.velocity[1],this.position[2]+=.1*this.velocity[2];var t=Math.abs(this.position[0]),e=Math.abs(this.position[1]),r=Math.abs(this.position[2]);t*t+e*e+r*r>4&&(this.position=[2*Math.random()-1,2*Math.random()-1,2*Math.random()-1],this.velocity=[2*Math.random()-1,2*Math.random()-1,2*Math.random()-1],this.age<10?this.color=[1,1,1,.75]:this.age<this.lifespan?this.color=[0,0,1,.75]:this.color=[1,1,1,0],this.age++)}},74:function(t,e,r){"use strict";r.r(e);var i=r(1),n=r(3),a=r(0),o=null,s=null,u=null,f=null,h=null,l=null,c=null,v=null,d=null,m=[],p=[],A=[],R=[],g=mat4.create(),x=mat4.create(),B=mat3.create(),E=!1,y={flat:{vertexShader:"\n    attribute vec3 aVertexPosition;\n    attribute vec3 aVertexColor;\n    attribute vec3 aVertexNormal;\n\n    uniform mat4 uPMatrix;    \n    uniform mat4 uMVMatrix;\n    uniform mat3 uNormalMatrix;\n    \n    varying highp vec3 vColor;\n    varying highp vec3 L;\n    varying highp vec3 N;\n    \n    void main(void) {\n      gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);\n      \n      vec3 pointLightPosition = vec3(1.0, 2.0, -1.0);\n      vec3 pointLightDirection = normalize(vec3(pointLightPosition.xyz - aVertexPosition.xyz));\n      vec3 ambientColor = vec3(0.1, 0.1, 0.1);\n      \n      L = vec3(uPMatrix * uMVMatrix * vec4(pointLightDirection, 1.0));\n      N = uNormalMatrix * aVertexNormal;\n      \n      vColor = aVertexColor;\n    }\n  ",fragmentShader:"\n    varying highp vec3 vColor;\n    varying highp vec3 N;\n    varying highp vec3 L;\n    \n    void main(void) {\n      highp float lambert = max(dot(normalize(N), normalize(L)), 0.0);\n      gl_FragColor = vec4(vColor * lambert, 1.0);\n    }\n  "}},F=[],b=1,M=5,_=-1,T=-.8,S=10,U=50;function w(t,e){var r=o.createShader(e);return o.shaderSource(r,t),o.compileShader(r),o.getShaderParameter(r,o.COMPILE_STATUS)||alert("Error compiling shader: "+o.getShaderInfoLog(r)),r}function z(t,e){for(var r=0;r<t.length;r++)if(t[r].vboIndex===e)return r;return-1}function I(t,e){var r=t[e];t.forEach(function(i,n){if(e!==n){var o=r.position,s=i.position;if(new a.a(o.x-s.x,o.y-s.y,o.z-s.z).length()<r.radius+i.radius){var u=r.velocity,f=i.velocity,h=r.radius,l=i.radius,c=D(u.x,f.x,h,l),v=D(u.y,f.y,h,l);r.velocity=new a.a(c[0],v[0],r.velocity.z),i.velocity=new a.a(c[1],v[1],i.velocity.z),Y(t,e),Y(t,n)}}})}function D(t,e,r,i){var n=r*r*r/(i*i*i);return[(n-1)/(n+1)*t+2/(n+1)*e,(1-n)/(1+n)*e+2*n/(1+n)*t]}function Y(t,e){var r=t[e];!function(t){var e=F[t];return M-(e.position.y+e.radius)>_}(e)?(r.position.y-=r.velocity.y,r.velocity.y*=T):(r.velocity.y+=r.acceleration.y,r.position.y+=r.velocity.y),r.position.x>S||r.position.x<-S?(r.position.x+=-1*r.velocity.x,r.position.x*=-1):r.position.x+=r.velocity.x,r.position.z>S||r.position.z<-S?(r.position.z+=-1*r.velocity.z,r.position.z*=-1):r.position.z+=r.velocity.z}function L(){o.uniformMatrix4fv(f.pMatrixUniform,!1,g),o.uniformMatrix4fv(f.mvMatrixUniform,!1,x),o.uniformMatrix3fv(f.normalMatrixUniform,!1,B)}window.addEventListener("load",function(){s=document.querySelector("#canvas"),u=document.querySelector("#container"),s.width=u.clientWidth,s.height=u.clientHeight,function(){var t=function(t){t>0?b+=1:(b-=.1)<.01&&(b=.1)};s.addEventListener("mousewheel",function(e){e.stopPropagation(),e.preventDefault(),t(e.wheelDelta)}),s.addEventListener("DOMMouseScroll",function(e){e.stopPropagation(),e.preventDefault(),t(-.1*e.originalEvent.detail)})}();try{o=s.getContext("webgl")||s.getContext("experimental-webgl")}catch(t){console.error(t)}o&&(!function(t){(function(t,e){var r=y[e].vertexShader,i=y[e].fragmentShader;l=w(r,o.VERTEX_SHADER),h=w(i,o.FRAGMENT_SHADER),o.attachShader(t,l),o.attachShader(t,h),o.linkProgram(t),o.getProgramParameter(t,o.LINK_STATUS)||alert("Unable to initialize the shader program.")})(f=o.createProgram(),t),o.useProgram(f),f.pMatrixUniform=o.getUniformLocation(f,"uPMatrix"),f.mvMatrixUniform=o.getUniformLocation(f,"uMVMatrix"),f.normalMatrixUniform=o.getUniformLocation(f,"uNormalMatrix")}("flat"),function(){Object(i.c)(o,{trianglesNormalBuffers:p,trianglesColorBuffers:A,trianglesVerticeBuffers:m,vertexIndexBuffers:R},0,{translation:[0,_,0]});for(var t=1;t<=U;++t){var e=.5*Math.random()+0;Object(i.d)(o,{trianglesNormalBuffers:p,trianglesColorBuffers:A,trianglesVerticeBuffers:m,vertexIndexBuffers:R},t,{color:[Math.random(),Math.random(),Math.random(),1],radius:e}),F.push(new n.b({vboIndex:t,radius:e,position:new a.a(10*Math.random()-5,-5*Math.random(),10*Math.random()-5),acceleration:new a.a(0,.01,0)}))}c=o.getAttribLocation(f,"aVertexPosition"),d=o.getAttribLocation(f,"aVertexColor"),v=o.getAttribLocation(f,"aVertexNormal"),o.enableVertexAttribArray(c),o.enableVertexAttribArray(d),o.enableVertexAttribArray(v)}(),function t(){E||(o.clearColor(.7,.7,.7,1),o.clear(o.COLOR_BUFFER_BIT|o.DEPTH_BUFFER_BIT),o.enable(o.DEPTH_TEST),o.viewport(0,0,s.width,s.height),mat4.perspective(g,45,s.width/s.height,.1,100),function(){for(var t=0;t<R.length;++t){mat4.identity(x),mat4.translate(x,x,[0,-1,-15.5]);var e=z(F,t);if(-1!==e){var r=F[e];Y(F,e),I(F,e),mat4.translate(x,x,[r.position.x,M-r.position.y,r.position.z])}mat4.scale(x,x,[b,b,b]);var i=mat3.create();mat3.fromMat4(i,x),mat3.invert(B,i),mat3.transpose(B,B),L(),o.bindBuffer(o.ARRAY_BUFFER,m[t]),o.vertexAttribPointer(c,3,o.FLOAT,!1,0,0),o.bindBuffer(o.ARRAY_BUFFER,A[t]),o.vertexAttribPointer(d,4,o.FLOAT,!1,0,0),o.bindBuffer(o.ARRAY_BUFFER,p[t]),o.vertexAttribPointer(v,3,o.FLOAT,!1,0,0),0!==t&&t%2==0?(o.disable(o.DEPTH_TEST),o.enable(o.BLEND),o.blendFunc(o.SRC_ALPHA,o.ONE),o.blendEquation(o.FUNC_ADD)):(o.disable(o.BLEND),o.enable(o.DEPTH_TEST)),o.bindBuffer(o.ELEMENT_ARRAY_BUFFER,R[t]),o.drawElements(o.TRIANGLES,R[t].numItems,o.UNSIGNED_SHORT,0)}}()),requestAnimationFrame(t)}())}),document.addEventListener("keyup",function(t){switch(t.keyCode){case 80:E=!E}})}},[[74,0]]]);
//# sourceMappingURL=webgl-physics-inter-collision-detection.js.map