(window.webpackJsonp=window.webpackJsonp||[]).push([[79],{0:function(e,t,r){"use strict";var n=function(e,t,r){void 0===e&&(e=0),void 0===t&&(t=0),void 0===r&&(r=0),this.x=e,this.y=t,this.z=r};n.prototype.divide=function(e){if("number"!=typeof e)throw new Error("invalid input: "+e);return this.x/=e,this.y/=e,this.z/=e,this},n.prototype.cross=function(e){var t=this.x,r=this.y,a=this.z;if(!(e instanceof n))throw new Error("invalid input: "+e);this.x=r*e.z-a*e.y,this.y=a*e.x-t*e.z,this.z=t*e.y-r*e.x},n.prototype.length=function(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)},n.prototype.normalize=function(){return this.divide(this.length())},t.a=n},1:function(e,t,r){"use strict";r.d(t,"c",function(){return a}),r.d(t,"d",function(){return i}),r.d(t,"a",function(){return o}),r.d(t,"b",function(){return s});var n=r(0);function a(e,t,r,n){for(var a,i,o,s=(n=Object.assign({},{size:10,color:[.5,.5,1,1],translation:[0,0,0],textured:!1},n)).size,u=n.color,f=n.translation,h=n.textured,l=[],c=[],v=t.trianglesNormalBuffers,m=t.trianglesColorBuffers,d=t.trianglesVerticeBuffers,A=t.trianglesTexCoordBuffers,p=t.vertexIndexBuffers,R=0;R<5;++R)l.push(0),l.push(1),l.push(0),c.push(u[0]),c.push(u[1]),c.push(u[2]),c.push(u[3]);a=[0,0,0,-s,0,-s,s,0,-s,s,0,s,-s,0,s],o=[0,0,-s,-s,s,-s,s,s,-s,s];for(var g=0;g<a.length;g+=3)a[g]+=f[0],a[g+1]+=f[1],a[g+2]+=f[2];i=[0,1,2,0,2,3,0,3,4,0,4,1],v[r]=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,v[r]),e.bufferData(e.ARRAY_BUFFER,new Float32Array(l),e.STATIC_DRAW),v[r].itemSize=3,v[r].numItems=l.length/3,m[r]=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,m[r]),e.bufferData(e.ARRAY_BUFFER,new Float32Array(c),e.STATIC_DRAW),m[r].itemSize=4,m[r].numItems=c.length/4,d[r]=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,d[r]),e.bufferData(e.ARRAY_BUFFER,new Float32Array(a),e.STATIC_DRAW),d[r].itemSize=3,d[r].numItems=a.length/3,h&&(A[r]=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,A[r]),e.bufferData(e.ARRAY_BUFFER,new Float32Array(o),e.STATIC_DRAW),A[r].itemSize=2,A[r].numItems=o.length/2),p[r]=e.createBuffer(),e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,p[r]),e.bufferData(e.ELEMENT_ARRAY_BUFFER,new Uint16Array(i),e.STREAM_DRAW),p[r].itemSize=3,p[r].numItems=i.length}function i(e,t,r,a){for(var i=(a=Object.assign({},{color:[1,0,0,1],translation:[0,0,0],radius:1,division:30,smoothShading:!0,textured:!1},a)).color,o=a.translation,s=a.radius,u=a.division,f=a.smoothShading,h=a.textured,l=u,c=u,v=[],m=[],d=[],A=[],p=[],R=t.trianglesNormalBuffers,g=t.trianglesColorBuffers,B=t.trianglesVerticeBuffers,E=t.trianglesTexCoordBuffers,F=t.vertexIndexBuffers,x=0;x<=l;x++)for(var b=x*Math.PI/l,y=Math.sin(b),M=Math.cos(b),_=0;_<=c;_++){var S=2*_*Math.PI/c,T=Math.sin(S),U=Math.cos(S)*y,I=M,w=T*y;p.push(.5*(U+1)),p.push(.5*(I+1)),d.push(U),d.push(I),d.push(w),m.push(i[0]),m.push(i[1]),m.push(i[2]),m.push(i[3]),v.push(s*U+o[0]),v.push(s*I+o[1]),v.push(s*w+o[2])}for(var Y=0;Y<l;Y++)for(var D=0;D<c;D++){var z=Y*(c+1)+D,L=z+c+1;A.push(z),A.push(L),A.push(z+1),A.push(L),A.push(L+1),A.push(z+1)}if(!f){v=function(e,t){for(var r=[],n=0;n<t.length;++n){var a=3*t[n];r.push(e[a]),r.push(e[a+1]),r.push(e[a+2])}return r}(v,A),m=[];for(var C=0;C<A.length;++C)m.push(i[0]),m.push(i[1]),m.push(i[2]),m.push(i[3]);d=function(e,t){for(var r=[],a=0;a<t.length;a+=3){var i=3*t[a],o=3*t[a+1],s=3*t[a+2],u=new n.a(e[i],e[i+1],e[i+2]),f=new n.a(e[o],e[o+1],e[o+2]),h=new n.a(e[s],e[s+1],e[s+2]),l=(u.x+f.x+h.x)/3,c=(u.y+f.y+h.y)/3,v=(u.z+f.z+h.z)/3,m=new n.a(l,c,v);r.push(m.x),r.push(m.y),r.push(m.z),r.push(m.x),r.push(m.y),r.push(m.z),r.push(m.x),r.push(m.y),r.push(m.z)}return r}(d,A)}R[r]=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,R[r]),e.bufferData(e.ARRAY_BUFFER,new Float32Array(d),e.STATIC_DRAW),R[r].itemSize=3,R[r].numItems=d.length/3,g[r]=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,g[r]),e.bufferData(e.ARRAY_BUFFER,new Float32Array(m),e.STATIC_DRAW),g[r].itemSize=4,g[r].numItems=m.length/4,B[r]=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,B[r]),e.bufferData(e.ARRAY_BUFFER,new Float32Array(v),e.STATIC_DRAW),B[r].itemSize=3,B[r].numItems=v.length/3,h&&(E[r]=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,E[r]),e.bufferData(e.ARRAY_BUFFER,new Float32Array(p),e.STATIC_DRAW),E[r].itemSize=2,E[r].numItems=p.length/2),F[r]=e.createBuffer(),e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,F[r]),e.bufferData(e.ELEMENT_ARRAY_BUFFER,new Uint16Array(A),e.STREAM_DRAW),F[r].itemSize=3,F[r].numItems=A.length}function o(e,t,r,n){void 0===r&&(r=1),void 0===n&&(n=10);for(var a=r/n,i=[],o=0;o<=n;++o)for(var s=0;s<=n;++s)i.push(o*a),i.push(0),i.push(s*a);for(var u=[0],f=0;f<n;++f)if(f%2==0)for(var h=0;h<=n;++h)0!==h&&u.push(f*(n+1)+h),u.push((f+1)*(n+1)+h);else for(var l=0;l<=n;++l)0!==l&&u.push((f+1)*(n+1)-(l+1)),u.push((f+2)*(n+1)-(l+1));t.trianglesVerticesBuffer=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,t.trianglesVerticesBuffer),e.bufferData(e.ARRAY_BUFFER,new Float32Array(i),e.STATIC_DRAW),t.trianglesVerticesBuffer.itemSize=3,t.trianglesVerticesBuffer.numItems=i.length/3,t.vertexIndexBuffer=e.createBuffer(),e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t.vertexIndexBuffer),e.bufferData(e.ELEMENT_ARRAY_BUFFER,new Uint16Array(u),e.STREAM_DRAW),t.vertexIndexBuffer.itemSize=3,t.vertexIndexBuffer.numItems=u.length}function s(e,t,r,n){void 0===r&&(r=1),void 0===n&&(n=3);for(var a=Math.pow(2,n),i=r/a,o=[],s=0;s<=a;++s)for(var u=0;u<=a;++u)o.push(s*i-.5*r),o.push(0),o.push(u*i-.5*r);o[3*(0+0*(a+1))+1]=1.5,o[3*(a+0*(a+1))+1]=3.5,o[3*(0+a*(a+1))+1]=2,o[3*(a+a*(a+1))+1]=1,function e(t,r,n,a,i,o,s){if(r[0]+1===i[0]||r[1]+1===i[1])return;var u=[(r[0]+i[0])/2,(r[1]+i[1])/2];var f=[r[0],(r[1]+a[1])/2];var h=[n[0],(n[1]+i[1])/2];var l=[(r[0]+n[0])/2,r[1]];var c=[(a[0]+i[0])/2,a[1]];var v=t[3*(r[0]+r[1]*(o+1))+1];var m=t[3*(n[0]+n[1]*(o+1))+1];var d=t[3*(a[0]+a[1]*(o+1))+1];var A=t[3*(i[0]+i[1]*(o+1))+1];var p=(v+m)/2;t[3*(l[0]+l[1]*(o+1))+1]=p;var R=(d+A)/2;t[3*(c[0]+c[1]*(o+1))+1]=R;var g=(v+d)/2;t[3*(f[0]+f[1]*(o+1))+1]=g;var B=(m+A)/2;t[3*(h[0]+h[1]*(o+1))+1]=B;t[3*(u[0]+u[1]*(o+1))+1]=(v+m+d+A)/4+(-.5+Math.random())*Math.pow(.65,s-2);e(t,r,l,f,u,o,s+1);e(t,l,n,u,h,o,s+1);e(t,f,u,a,c,o,s+1);e(t,u,h,c,i,o,s+1)}(o,[0,0],[a,0],[0,a],[a,a],a,0);for(var f=[0],h=0;h<a;++h)if(h%2==0)for(var l=0;l<=a;++l)0!==l&&f.push(l+h*(a+1)),f.push(l+(h+1)*(a+1));else for(var c=0;c<=a;++c)0!==c&&f.push((h+1)*(a+1)-(c+1)),f.push((h+2)*(a+1)-(c+1));t.trianglesVerticesBuffer=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,t.trianglesVerticesBuffer),e.bufferData(e.ARRAY_BUFFER,new Float32Array(o),e.STATIC_DRAW),t.trianglesVerticesBuffer.itemSize=3,t.trianglesVerticesBuffer.numItems=o.length/3,t.vertexIndexBuffer=e.createBuffer(),e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t.vertexIndexBuffer),e.bufferData(e.ELEMENT_ARRAY_BUFFER,new Uint16Array(f),e.STREAM_DRAW),t.vertexIndexBuffer.itemSize=3,t.vertexIndexBuffer.numItems=f.length}},3:function(e,t,r){"use strict";r.d(t,"b",function(){return a}),r.d(t,"c",function(){return i}),r.d(t,"a",function(){return o});var n=r(0),a=function(e){e=Object.assign({},{radius:1,position:new n.a(0,0,0),velocity:new n.a(0,0,0),acceleration:new n.a(0,0,0)},e),this.radius=e.radius,this.position=e.position,this.velocity=e.velocity,this.acceleration=e.acceleration,this.vboIndex=e.vboIndex,this.totalVelocity=0},i=function(e){e=Object.assign({},{startX:0,startY:0,endX:0,endY:0},e),this.slope=0,(e.endX-e.startX>1e-4||e.endX-e.startX<-.001)&&(this.slope=(e.endY-e.startY)/(e.endX-e.startX)),this.startX=e.startX,this.startY=e.startY,this.endX=e.endX,this.endY=e.endY;var t=[e.startX-e.endX,e.startY-e.endY];this.angle=0,this.angle=Math.atan2(t[1],t[0])},o=function(e,t){void 0===e&&(e=[.1*(Math.random()-.5),.1*(Math.random()-.5),.1*(Math.random()-.5)]),void 0===t&&(t=[1,0,0,.5]),this.position=e,this.color=t,this.velocity=[.1*(Math.random()-.5),.1*(Math.random()-.5),.1*(Math.random()-.5)],Math.abs(this.velocity[0])<.01&&Math.abs(this.velocity[1])<.01&&Math.abs(this.velocity[2])<.01&&(this.velocity[0]=.1),this.age=0,this.lifespan=20,this.size=1};o.prototype.update=function(){this.position[0]+=.1*this.velocity[0],this.position[1]+=.1*this.velocity[1],this.position[2]+=.1*this.velocity[2];var e=Math.abs(this.position[0]),t=Math.abs(this.position[1]),r=Math.abs(this.position[2]);e*e+t*t+r*r>4&&(this.position=[2*Math.random()-1,2*Math.random()-1,2*Math.random()-1],this.velocity=[2*Math.random()-1,2*Math.random()-1,2*Math.random()-1],this.age<10?this.color=[1,1,1,.75]:this.age<this.lifespan?this.color=[0,0,1,.75]:this.color=[1,1,1,0],this.age++)}},80:function(e,t,r){"use strict";r.r(t);var n=r(1),a=r(3),i=r(0),o=null,s=null,u=null,f=null,h=null,l=null,c=null,v=null,m=null,d=[],A=[],p=[],R=[],g=mat4.create(),B=mat4.create(),E=mat3.create(),F=[],x=0,b=0,y=!1,M={flat:{vertexShader:"\n    attribute vec3 aVertexPosition;\n    attribute vec3 aVertexColor;\n    attribute vec3 aVertexNormal;\n\n    uniform mat4 uPMatrix;    \n    uniform mat4 uMVMatrix;\n    uniform mat3 uNormalMatrix;\n    \n    varying highp vec3 vColor;\n    varying highp vec3 L;\n    varying highp vec3 N;\n    \n    void main(void) {\n      gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);\n      \n      vec3 pointLightPosition = vec3(1.0, 2.0, -1.0);\n      vec3 pointLightDirection = normalize(vec3(pointLightPosition.xyz - aVertexPosition.xyz));\n      vec3 ambientColor = vec3(0.1, 0.1, 0.1);\n      \n      L = vec3(uPMatrix * uMVMatrix * vec4(pointLightDirection, 1.0));\n      N = uNormalMatrix * aVertexNormal;\n      \n      vColor = aVertexColor;\n    }\n  ",fragmentShader:"\n    varying highp vec3 vColor;\n    varying highp vec3 N;\n    varying highp vec3 L;\n    \n    void main(void) {\n      highp float lambert = max(dot(normalize(N), normalize(L)), 0.0);\n      gl_FragColor = vec4(vColor * lambert, 1.0);\n    }\n  "}},_=[],S=.2,T=0,U=!1,I=-1,w=4;function Y(e,t){var r=o.createShader(t);return o.shaderSource(r,e),o.compileShader(r),o.getShaderParameter(r,o.COMPILE_STATUS)||alert("Error compiling shader: "+o.getShaderInfoLog(r)),r}function D(){o.uniformMatrix4fv(f.pMatrixUniform,!1,g),o.uniformMatrix4fv(f.mvMatrixUniform,!1,B),o.uniformMatrix3fv(f.normalMatrixUniform,!1,E)}window.addEventListener("load",function(){s=document.querySelector("#canvas"),u=document.querySelector("#container"),s.width=u.clientWidth,s.height=u.clientHeight,function(){s.addEventListener("mousedown",function(e){F=[e.pageX,e.pageY];var t=function(e){var t=e.pageX-F[0],r=e.pageY-F[1];F[0]=e.pageX,F[1]=e.pageY,x+=t,b+=r},r=function(){document.removeEventListener("mousemove",t),document.removeEventListener("mouseup",r)};document.addEventListener("mousemove",t),document.addEventListener("mouseup",r)});var e=function(e){e>0?S+=1:(S-=.1)<.01&&(S=.1)};s.addEventListener("mousewheel",function(t){t.stopPropagation(),t.preventDefault(),e(t.wheelDelta)}),s.addEventListener("DOMMouseScroll",function(t){t.stopPropagation(),t.preventDefault(),e(-.1*t.originalEvent.detail)})}();try{o=s.getContext("webgl")||s.getContext("experimental-webgl")}catch(e){console.error(e)}o&&(!function(e){(function(e,t){var r=M[t].vertexShader,n=M[t].fragmentShader;l=Y(r,o.VERTEX_SHADER),h=Y(n,o.FRAGMENT_SHADER),o.attachShader(e,l),o.attachShader(e,h),o.linkProgram(e),o.getProgramParameter(e,o.LINK_STATUS)||alert("Unable to initialize the shader program.")})(f=o.createProgram(),e),o.useProgram(f),f.pMatrixUniform=o.getUniformLocation(f,"uPMatrix"),f.mvMatrixUniform=o.getUniformLocation(f,"uMVMatrix"),f.normalMatrixUniform=o.getUniformLocation(f,"uNormalMatrix")}("flat"),function(){Object(n.c)(o,{trianglesNormalBuffers:A,trianglesColorBuffers:p,trianglesVerticeBuffers:d,vertexIndexBuffers:R},0,{translation:[0,I,0]}),function(e){var t=[0,0,0,w,0,0,w,.5*w,0,0,.5*w,0,0,0,.5*w,w,0,.5*w,w,.5*w,.5*w,0,.5*w,.5*w],r=[0,1,2,0,2,3,0,3,7,0,7,4,2,7,3,2,6,7,4,6,5,4,7,6,1,0,4,1,4,5],n=function(e,t){for(var r=[],n=0;n<t.length;n+=3){var a=t[n],i=t[n+1],o=t[n+2],s=[e[3*a]-e[3*i],e[3*a+1]-e[3*i+1],e[3*a+2]-e[3*i+2]],u=[e[3*a]-e[3*o],e[3*a+1]-e[3*o+1],e[3*a+2]-e[3*o+2]],f=[s[1]*u[2]-s[0]*u[1],s[2]*u[0]-s[0]*u[2],s[0]*u[1]-s[1]*u[0]];r.push.apply(r,f),r.push.apply(r,f),r.push.apply(r,f)}return r}(t,r);A[e]=o.createBuffer(),o.bindBuffer(o.ARRAY_BUFFER,A[e]),o.bufferData(o.ARRAY_BUFFER,new Float32Array(n),o.STATIC_DRAW),A[e].itemSize=3,A[e].numItems=n.length/3,d[e]=o.createBuffer(),o.bindBuffer(o.ARRAY_BUFFER,d[e]),o.bufferData(o.ARRAY_BUFFER,new Float32Array(t),o.STATIC_DRAW),d[e].itemSize=3,d[e].numItems=t.length/3,R[e]=o.createBuffer(),o.bindBuffer(o.ELEMENT_ARRAY_BUFFER,R[e]),o.bufferData(o.ELEMENT_ARRAY_BUFFER,new Uint16Array(r),o.STREAM_DRAW),R[e].itemSize=3,R[e].numItems=r.length}(1);Object(n.d)(o,{trianglesNormalBuffers:A,trianglesColorBuffers:p,trianglesVerticeBuffers:d,vertexIndexBuffers:R},2,{color:[1,0,0,.9],radius:1}),_.push(new a.b({vboIndex:2,radius:1,position:new i.a(0,0,0),acceleration:new i.a(0,-.01,0)})),c=o.getAttribLocation(f,"aVertexPosition"),m=o.getAttribLocation(f,"aVertexColor"),v=o.getAttribLocation(f,"aVertexNormal"),o.enableVertexAttribArray(c),o.enableVertexAttribArray(m),o.enableVertexAttribArray(v)}(),function e(){y||(o.clearColor(.7,.7,.7,1),o.clear(o.COLOR_BUFFER_BIT|o.DEPTH_BUFFER_BIT),o.enable(o.DEPTH_TEST),o.viewport(0,0,s.width,s.height),mat4.perspective(g,45,s.width/s.height,.1,100),function(){for(var e=0;e<R.length;++e){mat4.identity(B),mat4.translate(B,B,[-10,-1,-30]),mat4.rotate(B,B,2*x*Math.PI/180,[0,1,0]),mat4.rotate(B,B,2*b*Math.PI/180,[1,0,0]),mat4.scale(B,B,[S,S,S]),1===e?(mat4.translate(B,B,[.1*-w,3,0]),mat4.rotate(B,B,.1*T,[0,0,1.3])):0===e?(mat4.rotate(B,B,-.3,[-.3,0,.2]),mat4.rotate(B,B,90,[0,1,0])):2===e&&(mat4.translate(B,B,[_[0].position.x+Math.cos(.1*T),_[0].position.y+3+_[0].radius+Math.sin(.1*T),_[0].position.z+0+_[0].radius]),U&&(_[0].velocity.y+=_[0].acceleration.y,_[0].position.x+=_[0].velocity.x,_[0].position.y+=_[0].velocity.y,_[0].position.z+=_[0].velocity.z));var t=mat3.create();mat3.fromMat4(t,B),mat3.invert(E,t),mat3.transpose(E,E),D(),1===e?(o.disableVertexAttribArray(m),o.vertexAttrib4f(m,1,.9,.7,1)):(o.enableVertexAttribArray(m),o.bindBuffer(o.ARRAY_BUFFER,p[e]),o.vertexAttribPointer(m,4,o.FLOAT,!1,0,0)),o.bindBuffer(o.ARRAY_BUFFER,d[e]),o.vertexAttribPointer(c,3,o.FLOAT,!1,0,0),o.bindBuffer(o.ARRAY_BUFFER,A[e]),o.vertexAttribPointer(v,3,o.FLOAT,!1,0,0),o.bindBuffer(o.ELEMENT_ARRAY_BUFFER,R[e]),o.drawElements(o.TRIANGLES,R[e].numItems,o.UNSIGNED_SHORT,0)}}()),requestAnimationFrame(e)}())}),document.addEventListener("keyup",function(e){switch(console.log(e.keyCode),e.keyCode){case 80:y=!y;break;case 38:++T;break;case 40:--T;break;case 70:U=!0,console.log("fire!"),_[0].position=new i.a(0,0,0),_[0].velocity=new i.a(Math.cos(.1*T),Math.sin(.1*T),0)}})}},[[80,0]]]);
//# sourceMappingURL=webgl-physics-projectile.js.map