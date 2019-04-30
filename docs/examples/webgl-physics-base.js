(window.webpackJsonp=window.webpackJsonp||[]).push([[63],{0:function(e,t,r){"use strict";var n=function(e,t,r){void 0===e&&(e=0),void 0===t&&(t=0),void 0===r&&(r=0),this.x=e,this.y=t,this.z=r};n.prototype.divide=function(e){if("number"!=typeof e)throw new Error("invalid input: "+e);return this.x/=e,this.y/=e,this.z/=e,this},n.prototype.cross=function(e){var t=this.x,r=this.y,i=this.z;if(!(e instanceof n))throw new Error("invalid input: "+e);this.x=r*e.z-i*e.y,this.y=i*e.x-t*e.z,this.z=t*e.y-r*e.x},n.prototype.length=function(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)},n.prototype.normalize=function(){return this.divide(this.length())},t.a=n},1:function(e,t,r){"use strict";r.d(t,"c",function(){return i}),r.d(t,"d",function(){return a}),r.d(t,"a",function(){return o}),r.d(t,"b",function(){return s});var n=r(0);function i(e,t,r,n){for(var i,a,o,s=(n=Object.assign({},{size:10,color:[.5,.5,1,1],translation:[0,0,0],textured:!1},n)).size,u=n.color,f=n.translation,h=n.textured,l=[],c=[],d=t.trianglesNormalBuffers,v=t.trianglesColorBuffers,m=t.trianglesVerticeBuffers,A=t.trianglesTexCoordBuffers,p=t.vertexIndexBuffers,g=0;g<5;++g)l.push(0),l.push(1),l.push(0),c.push(u[0]),c.push(u[1]),c.push(u[2]),c.push(u[3]);i=[0,0,0,-s,0,-s,s,0,-s,s,0,s,-s,0,s],o=[0,0,-s,-s,s,-s,s,s,-s,s];for(var R=0;R<i.length;R+=3)i[R]+=f[0],i[R+1]+=f[1],i[R+2]+=f[2];a=[0,1,2,0,2,3,0,3,4,0,4,1],d[r]=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,d[r]),e.bufferData(e.ARRAY_BUFFER,new Float32Array(l),e.STATIC_DRAW),d[r].itemSize=3,d[r].numItems=l.length/3,v[r]=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,v[r]),e.bufferData(e.ARRAY_BUFFER,new Float32Array(c),e.STATIC_DRAW),v[r].itemSize=4,v[r].numItems=c.length/4,m[r]=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,m[r]),e.bufferData(e.ARRAY_BUFFER,new Float32Array(i),e.STATIC_DRAW),m[r].itemSize=3,m[r].numItems=i.length/3,h&&(A[r]=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,A[r]),e.bufferData(e.ARRAY_BUFFER,new Float32Array(o),e.STATIC_DRAW),A[r].itemSize=2,A[r].numItems=o.length/2),p[r]=e.createBuffer(),e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,p[r]),e.bufferData(e.ELEMENT_ARRAY_BUFFER,new Uint16Array(a),e.STREAM_DRAW),p[r].itemSize=3,p[r].numItems=a.length}function a(e,t,r,i){for(var a=(i=Object.assign({},{color:[1,0,0,1],translation:[0,0,0],radius:1,division:30,smoothShading:!0,textured:!1},i)).color,o=i.translation,s=i.radius,u=i.division,f=i.smoothShading,h=i.textured,l=u,c=u,d=[],v=[],m=[],A=[],p=[],g=t.trianglesNormalBuffers,R=t.trianglesColorBuffers,B=t.trianglesVerticeBuffers,x=t.trianglesTexCoordBuffers,E=t.vertexIndexBuffers,b=0;b<=l;b++)for(var F=b*Math.PI/l,M=Math.sin(F),_=Math.cos(F),y=0;y<=c;y++){var I=2*y*Math.PI/c,S=Math.sin(I),T=Math.cos(I)*M,w=_,U=S*M;p.push(.5*(T+1)),p.push(.5*(w+1)),m.push(T),m.push(w),m.push(U),v.push(a[0]),v.push(a[1]),v.push(a[2]),v.push(a[3]),d.push(s*T+o[0]),d.push(s*w+o[1]),d.push(s*U+o[2])}for(var D=0;D<l;D++)for(var Y=0;Y<c;Y++){var L=D*(c+1)+Y,z=L+c+1;A.push(L),A.push(z),A.push(L+1),A.push(z),A.push(z+1),A.push(L+1)}if(!f){d=function(e,t){for(var r=[],n=0;n<t.length;++n){var i=3*t[n];r.push(e[i]),r.push(e[i+1]),r.push(e[i+2])}return r}(d,A),v=[];for(var C=0;C<A.length;++C)v.push(a[0]),v.push(a[1]),v.push(a[2]),v.push(a[3]);m=function(e,t){for(var r=[],i=0;i<t.length;i+=3){var a=3*t[i],o=3*t[i+1],s=3*t[i+2],u=new n.a(e[a],e[a+1],e[a+2]),f=new n.a(e[o],e[o+1],e[o+2]),h=new n.a(e[s],e[s+1],e[s+2]),l=(u.x+f.x+h.x)/3,c=(u.y+f.y+h.y)/3,d=(u.z+f.z+h.z)/3,v=new n.a(l,c,d);r.push(v.x),r.push(v.y),r.push(v.z),r.push(v.x),r.push(v.y),r.push(v.z),r.push(v.x),r.push(v.y),r.push(v.z)}return r}(m,A)}g[r]=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,g[r]),e.bufferData(e.ARRAY_BUFFER,new Float32Array(m),e.STATIC_DRAW),g[r].itemSize=3,g[r].numItems=m.length/3,R[r]=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,R[r]),e.bufferData(e.ARRAY_BUFFER,new Float32Array(v),e.STATIC_DRAW),R[r].itemSize=4,R[r].numItems=v.length/4,B[r]=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,B[r]),e.bufferData(e.ARRAY_BUFFER,new Float32Array(d),e.STATIC_DRAW),B[r].itemSize=3,B[r].numItems=d.length/3,h&&(x[r]=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,x[r]),e.bufferData(e.ARRAY_BUFFER,new Float32Array(p),e.STATIC_DRAW),x[r].itemSize=2,x[r].numItems=p.length/2),E[r]=e.createBuffer(),e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,E[r]),e.bufferData(e.ELEMENT_ARRAY_BUFFER,new Uint16Array(A),e.STREAM_DRAW),E[r].itemSize=3,E[r].numItems=A.length}function o(e,t,r,n){void 0===r&&(r=1),void 0===n&&(n=10);for(var i=r/n,a=[],o=0;o<=n;++o)for(var s=0;s<=n;++s)a.push(o*i),a.push(0),a.push(s*i);for(var u=[0],f=0;f<n;++f)if(f%2==0)for(var h=0;h<=n;++h)0!==h&&u.push(f*(n+1)+h),u.push((f+1)*(n+1)+h);else for(var l=0;l<=n;++l)0!==l&&u.push((f+1)*(n+1)-(l+1)),u.push((f+2)*(n+1)-(l+1));t.trianglesVerticesBuffer=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,t.trianglesVerticesBuffer),e.bufferData(e.ARRAY_BUFFER,new Float32Array(a),e.STATIC_DRAW),t.trianglesVerticesBuffer.itemSize=3,t.trianglesVerticesBuffer.numItems=a.length/3,t.vertexIndexBuffer=e.createBuffer(),e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t.vertexIndexBuffer),e.bufferData(e.ELEMENT_ARRAY_BUFFER,new Uint16Array(u),e.STREAM_DRAW),t.vertexIndexBuffer.itemSize=3,t.vertexIndexBuffer.numItems=u.length}function s(e,t,r,n){void 0===r&&(r=1),void 0===n&&(n=3);for(var i=Math.pow(2,n),a=r/i,o=[],s=0;s<=i;++s)for(var u=0;u<=i;++u)o.push(s*a-.5*r),o.push(0),o.push(u*a-.5*r);o[3*(0+0*(i+1))+1]=1.5,o[3*(i+0*(i+1))+1]=3.5,o[3*(0+i*(i+1))+1]=2,o[3*(i+i*(i+1))+1]=1,function e(t,r,n,i,a,o,s){if(r[0]+1===a[0]||r[1]+1===a[1])return;var u=[(r[0]+a[0])/2,(r[1]+a[1])/2];var f=[r[0],(r[1]+i[1])/2];var h=[n[0],(n[1]+a[1])/2];var l=[(r[0]+n[0])/2,r[1]];var c=[(i[0]+a[0])/2,i[1]];var d=t[3*(r[0]+r[1]*(o+1))+1];var v=t[3*(n[0]+n[1]*(o+1))+1];var m=t[3*(i[0]+i[1]*(o+1))+1];var A=t[3*(a[0]+a[1]*(o+1))+1];var p=(d+v)/2;t[3*(l[0]+l[1]*(o+1))+1]=p;var g=(m+A)/2;t[3*(c[0]+c[1]*(o+1))+1]=g;var R=(d+m)/2;t[3*(f[0]+f[1]*(o+1))+1]=R;var B=(v+A)/2;t[3*(h[0]+h[1]*(o+1))+1]=B;t[3*(u[0]+u[1]*(o+1))+1]=(d+v+m+A)/4+(-.5+Math.random())*Math.pow(.65,s-2);e(t,r,l,f,u,o,s+1);e(t,l,n,u,h,o,s+1);e(t,f,u,i,c,o,s+1);e(t,u,h,c,a,o,s+1)}(o,[0,0],[i,0],[0,i],[i,i],i,0);for(var f=[0],h=0;h<i;++h)if(h%2==0)for(var l=0;l<=i;++l)0!==l&&f.push(l+h*(i+1)),f.push(l+(h+1)*(i+1));else for(var c=0;c<=i;++c)0!==c&&f.push((h+1)*(i+1)-(c+1)),f.push((h+2)*(i+1)-(c+1));t.trianglesVerticesBuffer=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,t.trianglesVerticesBuffer),e.bufferData(e.ARRAY_BUFFER,new Float32Array(o),e.STATIC_DRAW),t.trianglesVerticesBuffer.itemSize=3,t.trianglesVerticesBuffer.numItems=o.length/3,t.vertexIndexBuffer=e.createBuffer(),e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t.vertexIndexBuffer),e.bufferData(e.ELEMENT_ARRAY_BUFFER,new Uint16Array(f),e.STREAM_DRAW),t.vertexIndexBuffer.itemSize=3,t.vertexIndexBuffer.numItems=f.length}},3:function(e,t,r){"use strict";r.d(t,"b",function(){return i}),r.d(t,"c",function(){return a}),r.d(t,"a",function(){return o});var n=r(0),i=function(e){e=Object.assign({},{radius:1,position:new n.a(0,0,0),velocity:new n.a(0,0,0),acceleration:new n.a(0,0,0)},e),this.radius=e.radius,this.position=e.position,this.velocity=e.velocity,this.acceleration=e.acceleration,this.vboIndex=e.vboIndex,this.totalVelocity=0},a=function(e){e=Object.assign({},{startX:0,startY:0,endX:0,endY:0},e),this.slope=0,(e.endX-e.startX>1e-4||e.endX-e.startX<-.001)&&(this.slope=(e.endY-e.startY)/(e.endX-e.startX)),this.startX=e.startX,this.startY=e.startY,this.endX=e.endX,this.endY=e.endY;var t=[e.startX-e.endX,e.startY-e.endY];this.angle=0,this.angle=Math.atan2(t[1],t[0])},o=function(e,t){void 0===e&&(e=[.1*(Math.random()-.5),.1*(Math.random()-.5),.1*(Math.random()-.5)]),void 0===t&&(t=[1,0,0,.5]),this.position=e,this.color=t,this.velocity=[.1*(Math.random()-.5),.1*(Math.random()-.5),.1*(Math.random()-.5)],Math.abs(this.velocity[0])<.01&&Math.abs(this.velocity[1])<.01&&Math.abs(this.velocity[2])<.01&&(this.velocity[0]=.1),this.age=0,this.lifespan=20,this.size=1};o.prototype.update=function(){this.position[0]+=.1*this.velocity[0],this.position[1]+=.1*this.velocity[1],this.position[2]+=.1*this.velocity[2];var e=Math.abs(this.position[0]),t=Math.abs(this.position[1]),r=Math.abs(this.position[2]);e*e+t*t+r*r>4&&(this.position=[2*Math.random()-1,2*Math.random()-1,2*Math.random()-1],this.velocity=[2*Math.random()-1,2*Math.random()-1,2*Math.random()-1],this.age<10?this.color=[1,1,1,.75]:this.age<this.lifespan?this.color=[0,0,1,.75]:this.color=[1,1,1,0],this.age++)}},66:function(e,t,r){"use strict";r.r(t);var n=r(1),i=r(3),a=null,o=null,s=null,u=null,f=null,h=null,l=null,c=null,d=null,v=[],m=[],A=[],p=[],g=mat4.create(),R=mat4.create(),B=mat3.create(),x=!1,E={flat:{vertexShader:"\n    attribute vec3 aVertexPosition;\n    attribute vec3 aVertexColor;\n    attribute vec3 aVertexNormal;\n\n    uniform mat4 uPMatrix;    \n    uniform mat4 uMVMatrix;\n    uniform mat3 uNormalMatrix;\n    \n    varying highp vec3 vColor;\n    varying highp vec3 L;\n    varying highp vec3 N;\n    \n    void main(void) {\n      gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);\n      \n      vec3 pointLightPosition = vec3(1.0, 2.0, -1.0);\n      vec3 pointLightDirection = normalize(vec3(pointLightPosition.xyz - aVertexPosition.xyz));\n      vec3 ambientColor = vec3(0.1, 0.1, 0.1);\n      \n      L = vec3(uPMatrix * uMVMatrix * vec4(pointLightDirection, 1.0));\n      N = uNormalMatrix * aVertexNormal;\n      \n      vColor = aVertexColor;\n    }\n  ",fragmentShader:"\n    varying highp vec3 vColor;\n    varying highp vec3 N;\n    varying highp vec3 L;\n    \n    void main(void) {\n      highp float lambert = max(dot(normalize(N), normalize(L)), 0.0);\n      gl_FragColor = vec4(vColor * lambert, 1.0);\n    }\n  "}},b=[],F=[],M=0,_=0,y=1;function I(e,t){var r=a.createShader(t);return a.shaderSource(r,e),a.compileShader(r),a.getShaderParameter(r,a.COMPILE_STATUS)||alert("Error compiling shader: "+a.getShaderInfoLog(r)),r}window.addEventListener("load",function(){o=document.querySelector("#canvas"),s=document.querySelector("#container"),o.width=s.clientWidth,o.height=s.clientHeight,function(){o.addEventListener("mousedown",function(e){F=[e.pageX,e.pageY];var t=function(e){var t=e.pageX-F[0],r=e.pageY-F[1];F[0]=e.pageX,F[1]=e.pageY,M+=t,_+=r},r=function(){document.removeEventListener("mousemove",t),document.removeEventListener("mouseup",r)};document.addEventListener("mousemove",t),document.addEventListener("mouseup",r)});var e=function(e){e>0?y+=1:(y-=.1)<.01&&(y=.1)};o.addEventListener("mousewheel",function(t){t.stopPropagation(),t.preventDefault(),e(t.wheelDelta)}),o.addEventListener("DOMMouseScroll",function(t){t.stopPropagation(),t.preventDefault(),e(-.1*t.originalEvent.detail)})}();try{a=o.getContext("webgl")||o.getContext("experimental-webgl")}catch(e){console.error(e)}a&&(!function(e){(function(e,t){var r=E[t].vertexShader,n=E[t].fragmentShader;h=I(r,a.VERTEX_SHADER),f=I(n,a.FRAGMENT_SHADER),a.attachShader(e,h),a.attachShader(e,f),a.linkProgram(e),a.getProgramParameter(e,a.LINK_STATUS)||alert("Unable to initialize the shader program.")})(u=a.createProgram(),e),a.useProgram(u),u.pMatrixUniform=a.getUniformLocation(u,"uPMatrix"),u.mvMatrixUniform=a.getUniformLocation(u,"uMVMatrix"),u.normalMatrixUniform=a.getUniformLocation(u,"uNormalMatrix")}("flat"),Object(n.d)(a,{trianglesNormalBuffers:m,trianglesColorBuffers:A,trianglesVerticeBuffers:v,vertexIndexBuffers:p},0,{translation:[-1,-.75,0],color:[1,0,0,1],division:20,smoothShading:!1}),Object(n.d)(a,{trianglesNormalBuffers:m,trianglesColorBuffers:A,trianglesVerticeBuffers:v,vertexIndexBuffers:p},1,{translation:[0,0,1],color:[0,1,0,1],division:10,smoothShading:!1}),Object(n.d)(a,{trianglesNormalBuffers:m,trianglesColorBuffers:A,trianglesVerticeBuffers:v,vertexIndexBuffers:p},2,{translation:[1,.25,-1],color:[1,1,0,1],division:5,smoothShading:!1}),Object(n.d)(a,{trianglesNormalBuffers:m,trianglesColorBuffers:A,trianglesVerticeBuffers:v,vertexIndexBuffers:p},3,{translation:[-1,1,-1],color:[1,0,1,1]}),Object(n.d)(a,{trianglesNormalBuffers:m,trianglesColorBuffers:A,trianglesVerticeBuffers:v,vertexIndexBuffers:p},4,{translation:[-0,1.75,-0],color:[0,1,1,1]}),Object(n.c)(a,{trianglesNormalBuffers:m,trianglesColorBuffers:A,trianglesVerticeBuffers:v,vertexIndexBuffers:p},5,{translation:[0,-1,0]}),b.push(new i.b({vboIndex:0})),b.push(new i.b({vboIndex:1})),b.push(new i.b({vboIndex:2})),b.push(new i.b({vboIndex:3})),b.push(new i.b({vboIndex:4})),l=a.getAttribLocation(u,"aVertexPosition"),d=a.getAttribLocation(u,"aVertexColor"),c=a.getAttribLocation(u,"aVertexNormal"),a.enableVertexAttribArray(l),a.enableVertexAttribArray(d),a.enableVertexAttribArray(c),function e(){x||(a.clearColor(.7,.7,.7,1),a.clear(a.COLOR_BUFFER_BIT|a.DEPTH_BUFFER_BIT),a.enable(a.DEPTH_TEST),a.viewport(0,0,o.width,o.height),mat4.perspective(g,45,o.width/o.height,.1,100),function(){mat4.identity(R),mat4.translate(R,R,[0,0,-20]),mat4.rotate(R,R,2*M*Math.PI/180,[0,1,0]),mat4.rotate(R,R,2*_*Math.PI/180,[1,0,0]),mat4.scale(R,R,[y,y,y]);var e=mat3.create();mat3.fromMat4(e,R),mat3.invert(B,e),mat3.transpose(B,B),a.uniformMatrix4fv(u.pMatrixUniform,!1,g),a.uniformMatrix4fv(u.mvMatrixUniform,!1,R),a.uniformMatrix3fv(u.normalMatrixUniform,!1,B);for(var t=0;t<p.length;++t)a.bindBuffer(a.ARRAY_BUFFER,v[t]),a.vertexAttribPointer(l,3,a.FLOAT,!1,0,0),a.bindBuffer(a.ARRAY_BUFFER,A[t]),a.vertexAttribPointer(d,4,a.FLOAT,!1,0,0),a.bindBuffer(a.ARRAY_BUFFER,m[t]),a.vertexAttribPointer(c,3,a.FLOAT,!1,0,0),4===t?(a.disable(a.DEPTH_TEST),a.enable(a.BLEND),a.blendFunc(a.SRC_ALPHA,a.ONE),a.blendEquation(a.FUNC_ADD)):(a.disable(a.BLEND),a.enable(a.DEPTH_TEST)),a.bindBuffer(a.ELEMENT_ARRAY_BUFFER,p[t]),t>2?a.drawElements(a.TRIANGLES,p[t].numItems,a.UNSIGNED_SHORT,0):a.drawArrays(a.TRIANGLES,0,v[t].numItems)}()),requestAnimationFrame(e)}())}),document.addEventListener("keyup",function(e){switch(e.keyCode){case 80:x=!x}})}},[[66,0]]]);
//# sourceMappingURL=webgl-physics-base.js.map