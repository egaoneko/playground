(window.webpackJsonp=window.webpackJsonp||[]).push([[55],{0:function(e,r,t){"use strict";var n=function(e,r,t){void 0===e&&(e=0),void 0===r&&(r=0),void 0===t&&(t=0),this.x=e,this.y=r,this.z=t};n.prototype.divide=function(e){if("number"!=typeof e)throw new Error("invalid input: "+e);return this.x/=e,this.y/=e,this.z/=e,this},n.prototype.cross=function(e){var r=this.x,t=this.y,a=this.z;if(!(e instanceof n))throw new Error("invalid input: "+e);this.x=t*e.z-a*e.y,this.y=a*e.x-r*e.z,this.z=r*e.y-t*e.x},n.prototype.length=function(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)},n.prototype.normalize=function(){return this.divide(this.length())},r.a=n},1:function(e,r,t){"use strict";t.d(r,"c",function(){return a}),t.d(r,"d",function(){return i}),t.d(r,"a",function(){return u}),t.d(r,"b",function(){return f});var n=t(0);function a(e,r,t,n){for(var a,i,u,f=(n=Object.assign({},{size:10,color:[.5,.5,1,1],translation:[0,0,0],textured:!1},n)).size,o=n.color,s=n.translation,h=n.textured,R=[],l=[],A=r.trianglesNormalBuffers,m=r.trianglesColorBuffers,E=r.trianglesVerticeBuffers,c=r.trianglesTexCoordBuffers,B=r.vertexIndexBuffers,d=0;d<5;++d)R.push(0),R.push(1),R.push(0),l.push(o[0]),l.push(o[1]),l.push(o[2]),l.push(o[3]);a=[0,0,0,-f,0,-f,f,0,-f,f,0,f,-f,0,f],u=[0,0,-f,-f,f,-f,f,f,-f,f];for(var p=0;p<a.length;p+=3)a[p]+=s[0],a[p+1]+=s[1],a[p+2]+=s[2];i=[0,1,2,0,2,3,0,3,4,0,4,1],A[t]=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,A[t]),e.bufferData(e.ARRAY_BUFFER,new Float32Array(R),e.STATIC_DRAW),A[t].itemSize=3,A[t].numItems=R.length/3,m[t]=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,m[t]),e.bufferData(e.ARRAY_BUFFER,new Float32Array(l),e.STATIC_DRAW),m[t].itemSize=4,m[t].numItems=l.length/4,E[t]=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,E[t]),e.bufferData(e.ARRAY_BUFFER,new Float32Array(a),e.STATIC_DRAW),E[t].itemSize=3,E[t].numItems=a.length/3,h&&(c[t]=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,c[t]),e.bufferData(e.ARRAY_BUFFER,new Float32Array(u),e.STATIC_DRAW),c[t].itemSize=2,c[t].numItems=u.length/2),B[t]=e.createBuffer(),e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,B[t]),e.bufferData(e.ELEMENT_ARRAY_BUFFER,new Uint16Array(i),e.STREAM_DRAW),B[t].itemSize=3,B[t].numItems=i.length}function i(e,r,t,a){for(var i=(a=Object.assign({},{color:[1,0,0,1],translation:[0,0,0],radius:1,division:30,smoothShading:!0,textured:!1},a)).color,u=a.translation,f=a.radius,o=a.division,s=a.smoothShading,h=a.textured,R=o,l=o,A=[],m=[],E=[],c=[],B=[],d=r.trianglesNormalBuffers,p=r.trianglesColorBuffers,v=r.trianglesVerticeBuffers,_=r.trianglesTexCoordBuffers,g=r.vertexIndexBuffers,x=0;x<=R;x++)for(var T=x*Math.PI/R,F=Math.sin(T),U=Math.cos(T),S=0;S<=l;S++){var I=2*S*Math.PI/l,b=Math.sin(I),M=Math.cos(I)*F,D=U,y=b*F;B.push(.5*(M+1)),B.push(.5*(D+1)),E.push(M),E.push(D),E.push(y),m.push(i[0]),m.push(i[1]),m.push(i[2]),m.push(i[3]),A.push(f*M+u[0]),A.push(f*D+u[1]),A.push(f*y+u[2])}for(var w=0;w<R;w++)for(var z=0;z<l;z++){var Y=w*(l+1)+z,P=Y+l+1;c.push(Y),c.push(P),c.push(Y+1),c.push(P),c.push(P+1),c.push(Y+1)}if(!s){A=function(e,r){for(var t=[],n=0;n<r.length;++n){var a=3*r[n];t.push(e[a]),t.push(e[a+1]),t.push(e[a+2])}return t}(A,c),m=[];for(var L=0;L<c.length;++L)m.push(i[0]),m.push(i[1]),m.push(i[2]),m.push(i[3]);E=function(e,r){for(var t=[],a=0;a<r.length;a+=3){var i=3*r[a],u=3*r[a+1],f=3*r[a+2],o=new n.a(e[i],e[i+1],e[i+2]),s=new n.a(e[u],e[u+1],e[u+2]),h=new n.a(e[f],e[f+1],e[f+2]),R=(o.x+s.x+h.x)/3,l=(o.y+s.y+h.y)/3,A=(o.z+s.z+h.z)/3,m=new n.a(R,l,A);t.push(m.x),t.push(m.y),t.push(m.z),t.push(m.x),t.push(m.y),t.push(m.z),t.push(m.x),t.push(m.y),t.push(m.z)}return t}(E,c)}d[t]=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,d[t]),e.bufferData(e.ARRAY_BUFFER,new Float32Array(E),e.STATIC_DRAW),d[t].itemSize=3,d[t].numItems=E.length/3,p[t]=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,p[t]),e.bufferData(e.ARRAY_BUFFER,new Float32Array(m),e.STATIC_DRAW),p[t].itemSize=4,p[t].numItems=m.length/4,v[t]=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,v[t]),e.bufferData(e.ARRAY_BUFFER,new Float32Array(A),e.STATIC_DRAW),v[t].itemSize=3,v[t].numItems=A.length/3,h&&(_[t]=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,_[t]),e.bufferData(e.ARRAY_BUFFER,new Float32Array(B),e.STATIC_DRAW),_[t].itemSize=2,_[t].numItems=B.length/2),g[t]=e.createBuffer(),e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,g[t]),e.bufferData(e.ELEMENT_ARRAY_BUFFER,new Uint16Array(c),e.STREAM_DRAW),g[t].itemSize=3,g[t].numItems=c.length}function u(e,r,t,n){void 0===t&&(t=1),void 0===n&&(n=10);for(var a=t/n,i=[],u=0;u<=n;++u)for(var f=0;f<=n;++f)i.push(u*a),i.push(0),i.push(f*a);for(var o=[0],s=0;s<n;++s)if(s%2==0)for(var h=0;h<=n;++h)0!==h&&o.push(s*(n+1)+h),o.push((s+1)*(n+1)+h);else for(var R=0;R<=n;++R)0!==R&&o.push((s+1)*(n+1)-(R+1)),o.push((s+2)*(n+1)-(R+1));r.trianglesVerticesBuffer=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,r.trianglesVerticesBuffer),e.bufferData(e.ARRAY_BUFFER,new Float32Array(i),e.STATIC_DRAW),r.trianglesVerticesBuffer.itemSize=3,r.trianglesVerticesBuffer.numItems=i.length/3,r.vertexIndexBuffer=e.createBuffer(),e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,r.vertexIndexBuffer),e.bufferData(e.ELEMENT_ARRAY_BUFFER,new Uint16Array(o),e.STREAM_DRAW),r.vertexIndexBuffer.itemSize=3,r.vertexIndexBuffer.numItems=o.length}function f(e,r,t,n){void 0===t&&(t=1),void 0===n&&(n=3);for(var a=Math.pow(2,n),i=t/a,u=[],f=0;f<=a;++f)for(var o=0;o<=a;++o)u.push(f*i-.5*t),u.push(0),u.push(o*i-.5*t);u[3*(0+0*(a+1))+1]=1.5,u[3*(a+0*(a+1))+1]=3.5,u[3*(0+a*(a+1))+1]=2,u[3*(a+a*(a+1))+1]=1,function e(r,t,n,a,i,u,f){if(t[0]+1===i[0]||t[1]+1===i[1])return;var o=[(t[0]+i[0])/2,(t[1]+i[1])/2];var s=[t[0],(t[1]+a[1])/2];var h=[n[0],(n[1]+i[1])/2];var R=[(t[0]+n[0])/2,t[1]];var l=[(a[0]+i[0])/2,a[1]];var A=r[3*(t[0]+t[1]*(u+1))+1];var m=r[3*(n[0]+n[1]*(u+1))+1];var E=r[3*(a[0]+a[1]*(u+1))+1];var c=r[3*(i[0]+i[1]*(u+1))+1];var B=(A+m)/2;r[3*(R[0]+R[1]*(u+1))+1]=B;var d=(E+c)/2;r[3*(l[0]+l[1]*(u+1))+1]=d;var p=(A+E)/2;r[3*(s[0]+s[1]*(u+1))+1]=p;var v=(m+c)/2;r[3*(h[0]+h[1]*(u+1))+1]=v;r[3*(o[0]+o[1]*(u+1))+1]=(A+m+E+c)/4+(-.5+Math.random())*Math.pow(.65,f-2);e(r,t,R,s,o,u,f+1);e(r,R,n,o,h,u,f+1);e(r,s,o,a,l,u,f+1);e(r,o,h,l,i,u,f+1)}(u,[0,0],[a,0],[0,a],[a,a],a,0);for(var s=[0],h=0;h<a;++h)if(h%2==0)for(var R=0;R<=a;++R)0!==R&&s.push(R+h*(a+1)),s.push(R+(h+1)*(a+1));else for(var l=0;l<=a;++l)0!==l&&s.push((h+1)*(a+1)-(l+1)),s.push((h+2)*(a+1)-(l+1));r.trianglesVerticesBuffer=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,r.trianglesVerticesBuffer),e.bufferData(e.ARRAY_BUFFER,new Float32Array(u),e.STATIC_DRAW),r.trianglesVerticesBuffer.itemSize=3,r.trianglesVerticesBuffer.numItems=u.length/3,r.vertexIndexBuffer=e.createBuffer(),e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,r.vertexIndexBuffer),e.bufferData(e.ELEMENT_ARRAY_BUFFER,new Uint16Array(s),e.STREAM_DRAW),r.vertexIndexBuffer.itemSize=3,r.vertexIndexBuffer.numItems=s.length}},56:function(e,r,t){"use strict";t.r(r);var n=t(1),a=null,i=null,u=null,f=null,o=null,s=null,h=null,R={trianglesVerticesBuffer:null,vertexIndexBuffer:null},l=null,A=null,m=mat4.create(),E=mat4.create(),c=mat3.create(),B=0,d=!1;function p(e,r){var t=a.createShader(r);return a.shaderSource(t,e),a.compileShader(t),a.getShaderParameter(t,a.COMPILE_STATUS)||alert("Error compiling shader: "+a.getShaderInfoLog(t)),t}window.addEventListener("load",function(){i=document.querySelector("#canvas"),u=document.querySelector("#container"),i.width=u.clientWidth,i.height=u.clientHeight;try{a=i.getContext("webgl")||i.getContext("experimental-webgl")}catch(e){console.error(e)}a&&(!function(){var e="\n    attribute vec3 aVertexPosition;\n\n    uniform mat4 uPMatrix;    \n    uniform mat4 uMVMatrix;\n    uniform sampler2D uSampler;\n    \n    varying highp float height;\n    \n    void main(void) {\n      height = texture2D( uSampler, vec2(aVertexPosition.xz )).r;\n      gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition.x, height, aVertexPosition.z, 1.0);\n    }\n  ",r="\n    varying highp float height;\n    \n    void main(void) {\n      gl_FragColor = vec4(height, height, height, 1.0);\n    }\n  ";s=p(e,a.VERTEX_SHADER),o=p(r,a.FRAGMENT_SHADER),f=a.createProgram(),a.attachShader(f,s),a.attachShader(f,o),a.linkProgram(f),a.getProgramParameter(f,a.LINK_STATUS)||alert("Unable to initialize the shader program.");a.useProgram(f)}(),Object(n.a)(a,R),f.pMatrixUniform=a.getUniformLocation(f,"uPMatrix"),f.mvMatrixUniform=a.getUniformLocation(f,"uMVMatrix"),f.samplerUniform=a.getUniformLocation(f,"uSampler"),(A=new Image).onload=function(){l=a.createTexture(),a.bindTexture(a.TEXTURE_2D,l),a.pixelStorei(a.UNPACK_FLIP_Y_WEBGL,!0),a.texImage2D(a.TEXTURE_2D,0,a.RGBA,a.RGBA,a.UNSIGNED_BYTE,A),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MAG_FILTER,a.NEAREST),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MIN_FILTER,a.NEAREST),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_S,a.CLAMP_TO_EDGE),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_T,a.CLAMP_TO_EDGE),a.uniform1i(f.samplerUniform,0),a.isTexture(l)||console.error("Error: Texture is invalid")},A.src="data/img/hf-512px.jpg",h=a.getAttribLocation(f,"aVertexPosition"),a.enableVertexAttribArray(h),function e(){d||(!function(){a.clearColor(.1,.5,.1,1),a.clear(a.COLOR_BUFFER_BIT),a.enable(a.DEPTH_TEST),a.viewport(0,0,i.width,i.height),mat4.perspective(m,45,i.width/i.height,.1,100),mat4.identity(E),mat4.translate(E,E,[.25,.25,-5]),mat4.rotate(E,E,B,[1,0,0]),mat4.rotate(E,E,B,[0,1,0]),mat4.rotate(E,E,B,[0,0,1]),B+=.01;var e=mat3.create();mat3.fromMat4(e,E),mat3.invert(c,e),mat3.transpose(c,c)}(),a.uniformMatrix4fv(f.pMatrixUniform,!1,m),a.uniformMatrix4fv(f.mvMatrixUniform,!1,E),a.bindBuffer(a.ARRAY_BUFFER,R.trianglesVerticesBuffer),a.vertexAttribPointer(h,3,a.FLOAT,!1,0,0),a.bindBuffer(a.ELEMENT_ARRAY_BUFFER,R.vertexIndexBuffer),a.drawElements(a.TRIANGLE_STRIP,R.vertexIndexBuffer.numItems,a.UNSIGNED_SHORT,0)),requestAnimationFrame(e)}())}),document.addEventListener("keyup",function(e){switch(e.keyCode){case 80:d=!d}})}},[[56,0]]]);
//# sourceMappingURL=webgl-heightmap.js.map