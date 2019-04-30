(window.webpackJsonp=window.webpackJsonp||[]).push([[68],{0:function(e,r,t){"use strict";var n=function(e,r,t){void 0===e&&(e=0),void 0===r&&(r=0),void 0===t&&(t=0),this.x=e,this.y=r,this.z=t};n.prototype.divide=function(e){if("number"!=typeof e)throw new Error("invalid input: "+e);return this.x/=e,this.y/=e,this.z/=e,this},n.prototype.cross=function(e){var r=this.x,t=this.y,i=this.z;if(!(e instanceof n))throw new Error("invalid input: "+e);this.x=t*e.z-i*e.y,this.y=i*e.x-r*e.z,this.z=r*e.y-t*e.x},n.prototype.length=function(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)},n.prototype.normalize=function(){return this.divide(this.length())},r.a=n},1:function(e,r,t){"use strict";t.d(r,"c",function(){return i}),t.d(r,"d",function(){return a}),t.d(r,"a",function(){return u}),t.d(r,"b",function(){return f});var n=t(0);function i(e,r,t,n){for(var i,a,u,f=(n=Object.assign({},{size:10,color:[.5,.5,1,1],translation:[0,0,0],textured:!1},n)).size,o=n.color,s=n.translation,h=n.textured,R=[],A=[],l=r.trianglesNormalBuffers,c=r.trianglesColorBuffers,m=r.trianglesVerticeBuffers,p=r.trianglesTexCoordBuffers,B=r.vertexIndexBuffers,d=0;d<5;++d)R.push(0),R.push(1),R.push(0),A.push(o[0]),A.push(o[1]),A.push(o[2]),A.push(o[3]);i=[0,0,0,-f,0,-f,f,0,-f,f,0,f,-f,0,f],u=[0,0,-f,-f,f,-f,f,f,-f,f];for(var v=0;v<i.length;v+=3)i[v]+=s[0],i[v+1]+=s[1],i[v+2]+=s[2];a=[0,1,2,0,2,3,0,3,4,0,4,1],l[t]=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,l[t]),e.bufferData(e.ARRAY_BUFFER,new Float32Array(R),e.STATIC_DRAW),l[t].itemSize=3,l[t].numItems=R.length/3,c[t]=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,c[t]),e.bufferData(e.ARRAY_BUFFER,new Float32Array(A),e.STATIC_DRAW),c[t].itemSize=4,c[t].numItems=A.length/4,m[t]=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,m[t]),e.bufferData(e.ARRAY_BUFFER,new Float32Array(i),e.STATIC_DRAW),m[t].itemSize=3,m[t].numItems=i.length/3,h&&(p[t]=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,p[t]),e.bufferData(e.ARRAY_BUFFER,new Float32Array(u),e.STATIC_DRAW),p[t].itemSize=2,p[t].numItems=u.length/2),B[t]=e.createBuffer(),e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,B[t]),e.bufferData(e.ELEMENT_ARRAY_BUFFER,new Uint16Array(a),e.STREAM_DRAW),B[t].itemSize=3,B[t].numItems=a.length}function a(e,r,t,i){for(var a=(i=Object.assign({},{color:[1,0,0,1],translation:[0,0,0],radius:1,division:30,smoothShading:!0,textured:!1},i)).color,u=i.translation,f=i.radius,o=i.division,s=i.smoothShading,h=i.textured,R=o,A=o,l=[],c=[],m=[],p=[],B=[],d=r.trianglesNormalBuffers,v=r.trianglesColorBuffers,E=r.trianglesVerticeBuffers,F=r.trianglesTexCoordBuffers,g=r.vertexIndexBuffers,x=0;x<=R;x++)for(var _=x*Math.PI/R,I=Math.sin(_),S=Math.cos(_),T=0;T<=A;T++){var b=2*T*Math.PI/A,y=Math.sin(b),U=Math.cos(b)*I,M=S,w=y*I;B.push(.5*(U+1)),B.push(.5*(M+1)),m.push(U),m.push(M),m.push(w),c.push(a[0]),c.push(a[1]),c.push(a[2]),c.push(a[3]),l.push(f*U+u[0]),l.push(f*M+u[1]),l.push(f*w+u[2])}for(var z=0;z<R;z++)for(var D=0;D<A;D++){var Y=z*(A+1)+D,C=Y+A+1;p.push(Y),p.push(C),p.push(Y+1),p.push(C),p.push(C+1),p.push(Y+1)}if(!s){l=function(e,r){for(var t=[],n=0;n<r.length;++n){var i=3*r[n];t.push(e[i]),t.push(e[i+1]),t.push(e[i+2])}return t}(l,p),c=[];for(var P=0;P<p.length;++P)c.push(a[0]),c.push(a[1]),c.push(a[2]),c.push(a[3]);m=function(e,r){for(var t=[],i=0;i<r.length;i+=3){var a=3*r[i],u=3*r[i+1],f=3*r[i+2],o=new n.a(e[a],e[a+1],e[a+2]),s=new n.a(e[u],e[u+1],e[u+2]),h=new n.a(e[f],e[f+1],e[f+2]),R=(o.x+s.x+h.x)/3,A=(o.y+s.y+h.y)/3,l=(o.z+s.z+h.z)/3,c=new n.a(R,A,l);t.push(c.x),t.push(c.y),t.push(c.z),t.push(c.x),t.push(c.y),t.push(c.z),t.push(c.x),t.push(c.y),t.push(c.z)}return t}(m,p)}d[t]=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,d[t]),e.bufferData(e.ARRAY_BUFFER,new Float32Array(m),e.STATIC_DRAW),d[t].itemSize=3,d[t].numItems=m.length/3,v[t]=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,v[t]),e.bufferData(e.ARRAY_BUFFER,new Float32Array(c),e.STATIC_DRAW),v[t].itemSize=4,v[t].numItems=c.length/4,E[t]=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,E[t]),e.bufferData(e.ARRAY_BUFFER,new Float32Array(l),e.STATIC_DRAW),E[t].itemSize=3,E[t].numItems=l.length/3,h&&(F[t]=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,F[t]),e.bufferData(e.ARRAY_BUFFER,new Float32Array(B),e.STATIC_DRAW),F[t].itemSize=2,F[t].numItems=B.length/2),g[t]=e.createBuffer(),e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,g[t]),e.bufferData(e.ELEMENT_ARRAY_BUFFER,new Uint16Array(p),e.STREAM_DRAW),g[t].itemSize=3,g[t].numItems=p.length}function u(e,r,t,n){void 0===t&&(t=1),void 0===n&&(n=10);for(var i=t/n,a=[],u=0;u<=n;++u)for(var f=0;f<=n;++f)a.push(u*i),a.push(0),a.push(f*i);for(var o=[0],s=0;s<n;++s)if(s%2==0)for(var h=0;h<=n;++h)0!==h&&o.push(s*(n+1)+h),o.push((s+1)*(n+1)+h);else for(var R=0;R<=n;++R)0!==R&&o.push((s+1)*(n+1)-(R+1)),o.push((s+2)*(n+1)-(R+1));r.trianglesVerticesBuffer=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,r.trianglesVerticesBuffer),e.bufferData(e.ARRAY_BUFFER,new Float32Array(a),e.STATIC_DRAW),r.trianglesVerticesBuffer.itemSize=3,r.trianglesVerticesBuffer.numItems=a.length/3,r.vertexIndexBuffer=e.createBuffer(),e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,r.vertexIndexBuffer),e.bufferData(e.ELEMENT_ARRAY_BUFFER,new Uint16Array(o),e.STREAM_DRAW),r.vertexIndexBuffer.itemSize=3,r.vertexIndexBuffer.numItems=o.length}function f(e,r,t,n){void 0===t&&(t=1),void 0===n&&(n=3);for(var i=Math.pow(2,n),a=t/i,u=[],f=0;f<=i;++f)for(var o=0;o<=i;++o)u.push(f*a-.5*t),u.push(0),u.push(o*a-.5*t);u[3*(0+0*(i+1))+1]=1.5,u[3*(i+0*(i+1))+1]=3.5,u[3*(0+i*(i+1))+1]=2,u[3*(i+i*(i+1))+1]=1,function e(r,t,n,i,a,u,f){if(t[0]+1===a[0]||t[1]+1===a[1])return;var o=[(t[0]+a[0])/2,(t[1]+a[1])/2];var s=[t[0],(t[1]+i[1])/2];var h=[n[0],(n[1]+a[1])/2];var R=[(t[0]+n[0])/2,t[1]];var A=[(i[0]+a[0])/2,i[1]];var l=r[3*(t[0]+t[1]*(u+1))+1];var c=r[3*(n[0]+n[1]*(u+1))+1];var m=r[3*(i[0]+i[1]*(u+1))+1];var p=r[3*(a[0]+a[1]*(u+1))+1];var B=(l+c)/2;r[3*(R[0]+R[1]*(u+1))+1]=B;var d=(m+p)/2;r[3*(A[0]+A[1]*(u+1))+1]=d;var v=(l+m)/2;r[3*(s[0]+s[1]*(u+1))+1]=v;var E=(c+p)/2;r[3*(h[0]+h[1]*(u+1))+1]=E;r[3*(o[0]+o[1]*(u+1))+1]=(l+c+m+p)/4+(-.5+Math.random())*Math.pow(.65,f-2);e(r,t,R,s,o,u,f+1);e(r,R,n,o,h,u,f+1);e(r,s,o,i,A,u,f+1);e(r,o,h,A,a,u,f+1)}(u,[0,0],[i,0],[0,i],[i,i],i,0);for(var s=[0],h=0;h<i;++h)if(h%2==0)for(var R=0;R<=i;++R)0!==R&&s.push(R+h*(i+1)),s.push(R+(h+1)*(i+1));else for(var A=0;A<=i;++A)0!==A&&s.push((h+1)*(i+1)-(A+1)),s.push((h+2)*(i+1)-(A+1));r.trianglesVerticesBuffer=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,r.trianglesVerticesBuffer),e.bufferData(e.ARRAY_BUFFER,new Float32Array(u),e.STATIC_DRAW),r.trianglesVerticesBuffer.itemSize=3,r.trianglesVerticesBuffer.numItems=u.length/3,r.vertexIndexBuffer=e.createBuffer(),e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,r.vertexIndexBuffer),e.bufferData(e.ELEMENT_ARRAY_BUFFER,new Uint16Array(s),e.STREAM_DRAW),r.vertexIndexBuffer.itemSize=3,r.vertexIndexBuffer.numItems=s.length}},71:function(e,r,t){"use strict";t.r(r);var n=t(1),i=null,a=null,u=null,f=null,o=null,s=null,h=null,R={trianglesVerticesBuffer:null,vertexIndexBuffer:null},A=mat4.create(),l=mat4.create(),c=mat3.create(),m=!1;function p(e,r){var t=i.createShader(r);return i.shaderSource(t,e),i.compileShader(t),i.getShaderParameter(t,i.COMPILE_STATUS)||alert("Error compiling shader: "+i.getShaderInfoLog(t)),t}window.addEventListener("load",function(){a=document.querySelector("#canvas"),u=document.querySelector("#container"),a.width=u.clientWidth,a.height=u.clientHeight;try{i=a.getContext("webgl")||a.getContext("experimental-webgl")}catch(e){console.error(e)}i&&(!function(){var e="\n    attribute vec3 aVertexPosition;\n\n    uniform mat4 uPMatrix;    \n    uniform mat4 uMVMatrix;\n    \n    varying highp vec3 position;\n    \n    void main(void) {\n      position = aVertexPosition;\n      position.y *= 1.2;\n      gl_Position = uPMatrix * uMVMatrix * vec4(position, 1.0);\n    }\n  ",r="\n    varying highp vec3 position;\n    \n    void main(void) {\n      gl_FragColor = vec4(position.y*.025, .1+position.y*.25, position.y*.025, 1.0);\n    }\n  ";s=p(e,i.VERTEX_SHADER),o=p(r,i.FRAGMENT_SHADER),f=i.createProgram(),i.attachShader(f,s),i.attachShader(f,o),i.linkProgram(f),i.getProgramParameter(f,i.LINK_STATUS)||alert("Unable to initialize the shader program.");i.useProgram(f)}(),Object(n.b)(i,R,7,7),f.pMatrixUniform=i.getUniformLocation(f,"uPMatrix"),f.mvMatrixUniform=i.getUniformLocation(f,"uMVMatrix"),h=i.getAttribLocation(f,"aVertexPosition"),i.enableVertexAttribArray(h),function e(){m||(!function(){i.clearColor(.1,.1,.1,1),i.clear(i.COLOR_BUFFER_BIT),i.enable(i.DEPTH_TEST),i.viewport(0,0,a.width,a.height),mat4.perspective(A,45,a.width/a.height,.1,100),mat4.identity(l),mat4.translate(l,l,[0,0,-10]),mat4.rotate(l,l,60*Math.PI/180,[1,0,0]),mat4.rotate(l,l,120*Math.PI/180,[0,1,0]);var e=mat3.create();mat3.fromMat4(e,l),mat3.invert(c,e),mat3.transpose(c,c)}(),i.uniformMatrix4fv(f.pMatrixUniform,!1,A),i.uniformMatrix4fv(f.mvMatrixUniform,!1,l),i.bindBuffer(i.ARRAY_BUFFER,R.trianglesVerticesBuffer),i.vertexAttribPointer(h,3,i.FLOAT,!1,0,0),i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,R.vertexIndexBuffer),i.drawElements(i.TRIANGLE_STRIP,R.vertexIndexBuffer.numItems,i.UNSIGNED_SHORT,0)),requestAnimationFrame(e)}())}),document.addEventListener("keyup",function(e){switch(e.keyCode){case 80:m=!m}})}},[[71,0]]]);
//# sourceMappingURL=webgl-terrain.js.map