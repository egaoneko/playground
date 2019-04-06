(window.webpackJsonp=window.webpackJsonp||[]).push([[65],{0:function(t,e,r){"use strict";var i=function(t,e,r){void 0===t&&(t=0),void 0===e&&(e=0),void 0===r&&(r=0),this.x=t,this.y=e,this.z=r};i.prototype.divide=function(t){if("number"!=typeof t)throw new Error("invalid input: "+t);return this.x/=t,this.y/=t,this.z/=t,this},i.prototype.cross=function(t){var e=this.x,r=this.y,n=this.z;if(!(t instanceof i))throw new Error("invalid input: "+t);this.x=r*t.z-n*t.y,this.y=n*t.x-e*t.z,this.z=e*t.y-r*t.x},i.prototype.length=function(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)},i.prototype.normalize=function(){return this.divide(this.length())},e.a=i},1:function(t,e,r){"use strict";r.d(e,"c",function(){return n}),r.d(e,"d",function(){return a}),r.d(e,"a",function(){return o}),r.d(e,"b",function(){return s});var i=r(0);function n(t,e,r,i){for(var n,a,o,s=(i=Object.assign({},{size:10,color:[.5,.5,1,1],translation:[0,0,0],textured:!1},i)).size,u=i.color,f=i.translation,h=i.textured,l=[],c=[],v=e.trianglesNormalBuffers,d=e.trianglesColorBuffers,A=e.trianglesVerticeBuffers,p=e.trianglesTexCoordBuffers,m=e.vertexIndexBuffers,R=0;R<5;++R)l.push(0),l.push(1),l.push(0),c.push(u[0]),c.push(u[1]),c.push(u[2]),c.push(u[3]);n=[0,0,0,-s,0,-s,s,0,-s,s,0,s,-s,0,s],o=[0,0,-s,-s,s,-s,s,s,-s,s];for(var g=0;g<n.length;g+=3)n[g]+=f[0],n[g+1]+=f[1],n[g+2]+=f[2];a=[0,1,2,0,2,3,0,3,4,0,4,1],v[r]=t.createBuffer(),t.bindBuffer(t.ARRAY_BUFFER,v[r]),t.bufferData(t.ARRAY_BUFFER,new Float32Array(l),t.STATIC_DRAW),v[r].itemSize=3,v[r].numItems=l.length/3,d[r]=t.createBuffer(),t.bindBuffer(t.ARRAY_BUFFER,d[r]),t.bufferData(t.ARRAY_BUFFER,new Float32Array(c),t.STATIC_DRAW),d[r].itemSize=4,d[r].numItems=c.length/4,A[r]=t.createBuffer(),t.bindBuffer(t.ARRAY_BUFFER,A[r]),t.bufferData(t.ARRAY_BUFFER,new Float32Array(n),t.STATIC_DRAW),A[r].itemSize=3,A[r].numItems=n.length/3,h&&(p[r]=t.createBuffer(),t.bindBuffer(t.ARRAY_BUFFER,p[r]),t.bufferData(t.ARRAY_BUFFER,new Float32Array(o),t.STATIC_DRAW),p[r].itemSize=2,p[r].numItems=o.length/2),m[r]=t.createBuffer(),t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,m[r]),t.bufferData(t.ELEMENT_ARRAY_BUFFER,new Uint16Array(a),t.STREAM_DRAW),m[r].itemSize=3,m[r].numItems=a.length}function a(t,e,r,n){for(var a=(n=Object.assign({},{color:[1,0,0,1],translation:[0,0,0],radius:1,division:30,smoothShading:!0,textured:!1},n)).color,o=n.translation,s=n.radius,u=n.division,f=n.smoothShading,h=n.textured,l=u,c=u,v=[],d=[],A=[],p=[],m=[],R=e.trianglesNormalBuffers,g=e.trianglesColorBuffers,B=e.trianglesVerticeBuffers,x=e.trianglesTexCoordBuffers,y=e.vertexIndexBuffers,E=0;E<=l;E++)for(var F=E*Math.PI/l,b=Math.sin(F),M=Math.cos(F),_=0;_<=c;_++){var S=2*_*Math.PI/c,w=Math.sin(S),T=Math.cos(S)*b,U=M,Y=w*b;m.push(.5*(T+1)),m.push(.5*(U+1)),A.push(T),A.push(U),A.push(Y),d.push(a[0]),d.push(a[1]),d.push(a[2]),d.push(a[3]),v.push(s*T+o[0]),v.push(s*U+o[1]),v.push(s*Y+o[2])}for(var I=0;I<l;I++)for(var D=0;D<c;D++){var z=I*(c+1)+D,V=z+c+1;p.push(z),p.push(V),p.push(z+1),p.push(V),p.push(V+1),p.push(z+1)}if(!f){v=function(t,e){for(var r=[],i=0;i<e.length;++i){var n=3*e[i];r.push(t[n]),r.push(t[n+1]),r.push(t[n+2])}return r}(v,p),d=[];for(var L=0;L<p.length;++L)d.push(a[0]),d.push(a[1]),d.push(a[2]),d.push(a[3]);A=function(t,e){for(var r=[],n=0;n<e.length;n+=3){var a=3*e[n],o=3*e[n+1],s=3*e[n+2],u=new i.a(t[a],t[a+1],t[a+2]),f=new i.a(t[o],t[o+1],t[o+2]),h=new i.a(t[s],t[s+1],t[s+2]),l=(u.x+f.x+h.x)/3,c=(u.y+f.y+h.y)/3,v=(u.z+f.z+h.z)/3,d=new i.a(l,c,v);r.push(d.x),r.push(d.y),r.push(d.z),r.push(d.x),r.push(d.y),r.push(d.z),r.push(d.x),r.push(d.y),r.push(d.z)}return r}(A,p)}R[r]=t.createBuffer(),t.bindBuffer(t.ARRAY_BUFFER,R[r]),t.bufferData(t.ARRAY_BUFFER,new Float32Array(A),t.STATIC_DRAW),R[r].itemSize=3,R[r].numItems=A.length/3,g[r]=t.createBuffer(),t.bindBuffer(t.ARRAY_BUFFER,g[r]),t.bufferData(t.ARRAY_BUFFER,new Float32Array(d),t.STATIC_DRAW),g[r].itemSize=4,g[r].numItems=d.length/4,B[r]=t.createBuffer(),t.bindBuffer(t.ARRAY_BUFFER,B[r]),t.bufferData(t.ARRAY_BUFFER,new Float32Array(v),t.STATIC_DRAW),B[r].itemSize=3,B[r].numItems=v.length/3,h&&(x[r]=t.createBuffer(),t.bindBuffer(t.ARRAY_BUFFER,x[r]),t.bufferData(t.ARRAY_BUFFER,new Float32Array(m),t.STATIC_DRAW),x[r].itemSize=2,x[r].numItems=m.length/2),y[r]=t.createBuffer(),t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,y[r]),t.bufferData(t.ELEMENT_ARRAY_BUFFER,new Uint16Array(p),t.STREAM_DRAW),y[r].itemSize=3,y[r].numItems=p.length}function o(t,e,r,i){void 0===r&&(r=1),void 0===i&&(i=10);for(var n=r/i,a=[],o=0;o<=i;++o)for(var s=0;s<=i;++s)a.push(o*n),a.push(0),a.push(s*n);for(var u=[0],f=0;f<i;++f)if(f%2==0)for(var h=0;h<=i;++h)0!==h&&u.push(f*(i+1)+h),u.push((f+1)*(i+1)+h);else for(var l=0;l<=i;++l)0!==l&&u.push((f+1)*(i+1)-(l+1)),u.push((f+2)*(i+1)-(l+1));e.trianglesVerticesBuffer=t.createBuffer(),t.bindBuffer(t.ARRAY_BUFFER,e.trianglesVerticesBuffer),t.bufferData(t.ARRAY_BUFFER,new Float32Array(a),t.STATIC_DRAW),e.trianglesVerticesBuffer.itemSize=3,e.trianglesVerticesBuffer.numItems=a.length/3,e.vertexIndexBuffer=t.createBuffer(),t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,e.vertexIndexBuffer),t.bufferData(t.ELEMENT_ARRAY_BUFFER,new Uint16Array(u),t.STREAM_DRAW),e.vertexIndexBuffer.itemSize=3,e.vertexIndexBuffer.numItems=u.length}function s(t,e,r,i){void 0===r&&(r=1),void 0===i&&(i=3);for(var n=Math.pow(2,i),a=r/n,o=[],s=0;s<=n;++s)for(var u=0;u<=n;++u)o.push(s*a-.5*r),o.push(0),o.push(u*a-.5*r);o[3*(0+0*(n+1))+1]=1.5,o[3*(n+0*(n+1))+1]=3.5,o[3*(0+n*(n+1))+1]=2,o[3*(n+n*(n+1))+1]=1,function t(e,r,i,n,a,o,s){if(r[0]+1===a[0]||r[1]+1===a[1])return;var u=[(r[0]+a[0])/2,(r[1]+a[1])/2];var f=[r[0],(r[1]+n[1])/2];var h=[i[0],(i[1]+a[1])/2];var l=[(r[0]+i[0])/2,r[1]];var c=[(n[0]+a[0])/2,n[1]];var v=e[3*(r[0]+r[1]*(o+1))+1];var d=e[3*(i[0]+i[1]*(o+1))+1];var A=e[3*(n[0]+n[1]*(o+1))+1];var p=e[3*(a[0]+a[1]*(o+1))+1];var m=(v+d)/2;e[3*(l[0]+l[1]*(o+1))+1]=m;var R=(A+p)/2;e[3*(c[0]+c[1]*(o+1))+1]=R;var g=(v+A)/2;e[3*(f[0]+f[1]*(o+1))+1]=g;var B=(d+p)/2;e[3*(h[0]+h[1]*(o+1))+1]=B;e[3*(u[0]+u[1]*(o+1))+1]=(v+d+A+p)/4+(-.5+Math.random())*Math.pow(.65,s-2);t(e,r,l,f,u,o,s+1);t(e,l,i,u,h,o,s+1);t(e,f,u,n,c,o,s+1);t(e,u,h,c,a,o,s+1)}(o,[0,0],[n,0],[0,n],[n,n],n,0);for(var f=[0],h=0;h<n;++h)if(h%2==0)for(var l=0;l<=n;++l)0!==l&&f.push(l+h*(n+1)),f.push(l+(h+1)*(n+1));else for(var c=0;c<=n;++c)0!==c&&f.push((h+1)*(n+1)-(c+1)),f.push((h+2)*(n+1)-(c+1));e.trianglesVerticesBuffer=t.createBuffer(),t.bindBuffer(t.ARRAY_BUFFER,e.trianglesVerticesBuffer),t.bufferData(t.ARRAY_BUFFER,new Float32Array(o),t.STATIC_DRAW),e.trianglesVerticesBuffer.itemSize=3,e.trianglesVerticesBuffer.numItems=o.length/3,e.vertexIndexBuffer=t.createBuffer(),t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,e.vertexIndexBuffer),t.bufferData(t.ELEMENT_ARRAY_BUFFER,new Uint16Array(f),t.STREAM_DRAW),e.vertexIndexBuffer.itemSize=3,e.vertexIndexBuffer.numItems=f.length}},3:function(t,e,r){"use strict";r.d(e,"b",function(){return n}),r.d(e,"c",function(){return a}),r.d(e,"a",function(){return o});var i=r(0),n=function(t){t=Object.assign({},{radius:1,position:new i.a(0,0,0),velocity:new i.a(0,0,0),acceleration:new i.a(0,0,0)},t),this.radius=t.radius,this.position=t.position,this.velocity=t.velocity,this.acceleration=t.acceleration,this.vboIndex=t.vboIndex,this.totalVelocity=0},a=function(t){t=Object.assign({},{startX:0,startY:0,endX:0,endY:0},t),this.slope=0,(t.endX-t.startX>1e-4||t.endX-t.startX<-.001)&&(this.slope=(t.endY-t.startY)/(t.endX-t.startX)),this.startX=t.startX,this.startY=t.startY,this.endX=t.endX,this.endY=t.endY;var e=[t.startX-t.endX,t.startY-t.endY];this.angle=0,this.angle=Math.atan2(e[1],e[0])},o=function(t,e){void 0===t&&(t=[.1*(Math.random()-.5),.1*(Math.random()-.5),.1*(Math.random()-.5)]),void 0===e&&(e=[1,0,0,.5]),this.position=t,this.color=e,this.velocity=[.1*(Math.random()-.5),.1*(Math.random()-.5),.1*(Math.random()-.5)],Math.abs(this.velocity[0])<.01&&Math.abs(this.velocity[1])<.01&&Math.abs(this.velocity[2])<.01&&(this.velocity[0]=.1),this.age=0,this.lifespan=20,this.size=1};o.prototype.update=function(){this.position[0]+=.1*this.velocity[0],this.position[1]+=.1*this.velocity[1],this.position[2]+=.1*this.velocity[2];var t=Math.abs(this.position[0]),e=Math.abs(this.position[1]),r=Math.abs(this.position[2]);t*t+e*e+r*r>4&&(this.position=[2*Math.random()-1,2*Math.random()-1,2*Math.random()-1],this.velocity=[2*Math.random()-1,2*Math.random()-1,2*Math.random()-1],this.age<10?this.color=[1,1,1,.75]:this.age<this.lifespan?this.color=[0,0,1,.75]:this.color=[1,1,1,0],this.age++)}},69:function(t,e,r){"use strict";r.r(e);var i=r(1),n=r(3),a=r(0),o=null,s=null,u=null,f=null,h=null,l=null,c=null,v=null,d=null,A=[],p=[],m=[],R=[],g=mat4.create(),B=mat4.create(),x=mat3.create(),y=!1,E={flat:{vertexShader:"\n    attribute vec3 aVertexPosition;\n    attribute vec3 aVertexColor;\n    attribute vec3 aVertexNormal;\n\n    uniform mat4 uPMatrix;    \n    uniform mat4 uMVMatrix;\n    uniform mat3 uNormalMatrix;\n    \n    varying highp vec3 vColor;\n    varying highp vec3 L;\n    varying highp vec3 N;\n    \n    void main(void) {\n      gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);\n      \n      vec3 pointLightPosition = vec3(1.0, 2.0, -1.0);\n      vec3 pointLightDirection = normalize(vec3(pointLightPosition.xyz - aVertexPosition.xyz));\n      vec3 ambientColor = vec3(0.1, 0.1, 0.1);\n      \n      L = vec3(uPMatrix * uMVMatrix * vec4(pointLightDirection, 1.0));\n      N = uNormalMatrix * aVertexNormal;\n      \n      vColor = aVertexColor;\n    }\n  ",fragmentShader:"\n    varying highp vec3 vColor;\n    varying highp vec3 N;\n    varying highp vec3 L;\n    \n    void main(void) {\n      highp float lambert = max(dot(normalize(N), normalize(L)), 0.0);\n      gl_FragColor = vec4(vColor * lambert, 1.0);\n    }\n  "}},F=[],b=.5,M=-1,_=100,S=65,w=15,T=20,U=15,Y=60,I=30,D=45,z=2*Y,V=3*Y,L=25,C=.15,N=null,P=[];function X(t,e){var r=o.createShader(e);return o.shaderSource(r,t),o.compileShader(r),o.getShaderParameter(r,o.COMPILE_STATUS)||alert("Error compiling shader: "+o.getShaderInfoLog(r)),r}function W(){o.uniformMatrix4fv(f.pMatrixUniform,!1,g),o.uniformMatrix4fv(f.mvMatrixUniform,!1,B),o.uniformMatrix3fv(f.normalMatrixUniform,!1,x)}window.addEventListener("load",function(){s=document.querySelector("#canvas"),u=document.querySelector("#container"),s.width=u.clientWidth,s.height=u.clientHeight,function(){var t=function(t){t>0?b+=1:(b-=.1)<.01&&(b=.1)};s.addEventListener("mousewheel",function(e){e.stopPropagation(),e.preventDefault(),t(e.wheelDelta)}),s.addEventListener("DOMMouseScroll",function(e){e.stopPropagation(),e.preventDefault(),t(-.1*e.originalEvent.detail)})}();try{o=s.getContext("webgl",{preserveDrawingBuffer:!0})||s.getContext("experimental-webgl",{preserveDrawingBuffer:!0})}catch(t){console.error(t)}o&&(!function(t){(function(t,e){var r=E[e].vertexShader,i=E[e].fragmentShader;l=X(r,o.VERTEX_SHADER),h=X(i,o.FRAGMENT_SHADER),o.attachShader(t,l),o.attachShader(t,h),o.linkProgram(t),o.getProgramParameter(t,o.LINK_STATUS)||alert("Unable to initialize the shader program.")})(f=o.createProgram(),t),o.useProgram(f),f.pMatrixUniform=o.getUniformLocation(f,"uPMatrix"),f.mvMatrixUniform=o.getUniformLocation(f,"uMVMatrix"),f.normalMatrixUniform=o.getUniformLocation(f,"uNormalMatrix")}("flat"),function(){Object(i.c)(o,{trianglesNormalBuffers:p,trianglesColorBuffers:m,trianglesVerticeBuffers:A,vertexIndexBuffers:R},0,{translation:[0,M,0],size:_}),function(t){var e=[0,0,0,I,0,0,D,0,0,Y,0,0,0,w,0,I,w,0,D,w,0,Y,w,0,0,S,0,Y,T,0,0,0,L,I,0,L,D,0,L,Y,0,L,0,w,L,I,w,L,D,w,L,Y,w,L,0,S,L,Y,T,L,z,0,0,V,0,0,z,U,0,z,0,L,V,0,L,z,U,L],r=[0,1,5,0,5,4,1,6,5,1,2,6,2,3,7,2,7,6,6,7,9,4,5,8,10,15,11,10,14,15,11,15,16,11,16,12,12,17,13,12,16,17,16,19,17,14,18,15,0,13,3,0,10,13,0,8,10,8,18,10,3,13,9,9,13,19,8,5,15,8,15,18,5,6,16,5,16,15,6,9,19,6,19,16,20,21,22,23,25,24,20,22,23,23,22,25,20,23,21,21,23,24,21,24,22,22,24,25],i=function(t,e){for(var r=[],i=0;i<e.length;i+=3){var n=e[i],a=e[i+1],o=e[i+2],s=[t[3*n]-t[3*a],t[3*n+1]-t[3*a+1],t[3*n+2]-t[3*a+2]],u=[t[3*n]-t[3*o],t[3*n+1]-t[3*o+1],t[3*n+2]-t[3*o+2]],f=[s[1]*u[2]-s[2]*u[1],s[2]*u[0]-s[0]*u[2],s[0]*u[1]-s[1]*u[0]];r.push.apply(r,f),r.push.apply(r,f),r.push.apply(r,f)}return r}(e,r);p[t]=o.createBuffer(),o.bindBuffer(o.ARRAY_BUFFER,p[t]),o.bufferData(o.ARRAY_BUFFER,new Float32Array(i),o.STATIC_DRAW),p[t].itemSize=3,p[t].numItems=i.length/3,A[t]=o.createBuffer(),o.bindBuffer(o.ARRAY_BUFFER,A[t]),o.bufferData(o.ARRAY_BUFFER,new Float32Array(e),o.STATIC_DRAW),A[t].itemSize=3,A[t].numItems=e.length/3,R[t]=o.createBuffer(),o.bindBuffer(o.ELEMENT_ARRAY_BUFFER,R[t]),o.bufferData(o.ELEMENT_ARRAY_BUFFER,new Uint16Array(r),o.STREAM_DRAW),R[t].itemSize=3,R[t].numItems=r.length}(1),function(){var t={startX:0,startY:S,endX:I,endY:w};P.push(new n.c(t));var e={startX:I,startY:w,endX:D,endY:w};P.push(new n.c(e)),e={startX:D,startY:w,endX:Y,endY:T},P.push(new n.c(e)),e={startX:z,startY:U,endX:V,endY:0},P.push(new n.c(e))}();Object(i.d)(o,{trianglesNormalBuffers:p,trianglesColorBuffers:m,trianglesVerticeBuffers:A,vertexIndexBuffers:R},2,{color:[1,0,0,.9],radius:2}),N=new n.b({vboIndex:2,radius:2,position:new a.a(0,S*C,0),acceleration:new a.a(0,-.001,0)}),F.push(N),c=o.getAttribLocation(f,"aVertexPosition"),d=o.getAttribLocation(f,"aVertexColor"),v=o.getAttribLocation(f,"aVertexNormal"),o.enableVertexAttribArray(c),o.enableVertexAttribArray(d),o.enableVertexAttribArray(v)}(),function t(){y||(o.enable(o.DEPTH_TEST),o.viewport(0,0,s.width,s.height),mat4.perspective(g,45,s.width/s.height,.1,100),function(){for(var t=0;t<R.length;++t){mat4.identity(B),mat4.translate(B,B,[0,-1,-20]),mat4.rotate(B,B,-40*Math.PI/180,[0,1,0]),mat4.rotate(B,B,14*Math.PI/180,[1,0,0]),mat4.scale(B,B,[b,b,b]),1===t?(mat4.translate(B,B,[.5*-V*C,M,.5*-L*C]),mat4.scale(B,B,[C,C,C])):2===t&&(mat4.translate(B,B,[(N.radius-.5*V)*C+N.position.x,(M-N.radius)*C+N.position.y,N.position.z]),mat4.scale(B,B,[C,C,C]));var e=mat3.create();mat3.fromMat4(e,B),mat3.invert(x,e),mat3.transpose(x,x),W(),o.bindBuffer(o.ARRAY_BUFFER,A[t]),o.vertexAttribPointer(c,3,o.FLOAT,!1,0,0),1===t?(o.disableVertexAttribArray(d),o.vertexAttrib4f(d,1,.9,.7,1)):(o.enableVertexAttribArray(d),o.bindBuffer(o.ARRAY_BUFFER,m[t]),o.vertexAttribPointer(d,4,o.FLOAT,!1,0,0)),o.bindBuffer(o.ARRAY_BUFFER,p[t]),o.vertexAttribPointer(v,3,o.FLOAT,!1,0,0),o.bindBuffer(o.ELEMENT_ARRAY_BUFFER,R[t]),o.drawElements(o.TRIANGLES,R[t].numItems,o.UNSIGNED_SHORT,0)}}(),function(){var t=N.position.x/C;if(N.position.y<0)return;for(var e=!1,r=0;r<P.length;r++)t>=P[r].startX&&t<=P[r].endX&&(e=!0,(P[r].slope<-.001||P[r].slope>.001)&&(P[r].slope>.001?N.totalVelocity-=N.acceleration.y:P[r].slope<-.001&&(N.totalVelocity+=N.acceleration.y),N.velocity.x=N.totalVelocity*Math.cos(P[r].angle),N.velocity.y=N.totalVelocity*Math.sin(P[r].angle),N.position.y+=N.velocity.y),N.position.x+=N.velocity.x);e||(N.velocity.y+=N.acceleration.y,N.position.x+=N.velocity.x,N.position.y+=N.velocity.y)}()),requestAnimationFrame(t)}())}),document.addEventListener("keyup",function(t){switch(console.log(t.keyCode),t.keyCode){case 80:y=!y}})}},[[69,0]]]);
//# sourceMappingURL=webgl-physics-ramp.js.map