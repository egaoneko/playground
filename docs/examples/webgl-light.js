(window.webpackJsonp=window.webpackJsonp||[]).push([[49],{0:function(n,i,e){"use strict";var t=function(n,i,e){void 0===n&&(n=0),void 0===i&&(i=0),void 0===e&&(e=0),this.x=n,this.y=i,this.z=e};t.prototype.divide=function(n){if("number"!=typeof n)throw new Error("invalid input: "+n);return this.x/=n,this.y/=n,this.z/=n,this},t.prototype.cross=function(n){var i=this.x,e=this.y,r=this.z;if(!(n instanceof t))throw new Error("invalid input: "+n);this.x=e*n.z-r*n.y,this.y=r*n.x-i*n.z,this.z=i*n.y-e*n.x},t.prototype.length=function(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)},t.prototype.normalize=function(){return this.divide(this.length())},i.a=t},1:function(n,i,e){"use strict";e.d(i,"c",function(){return r}),e.d(i,"d",function(){return o}),e.d(i,"a",function(){return a}),e.d(i,"b",function(){return h});var t=e(0);function r(n,i,e,t){for(var r,o,a,h=(t=Object.assign({},{size:10,color:[.5,.5,1,1],translation:[0,0,0],textured:!1},t)).size,v=t.color,l=t.translation,u=t.textured,f=[],g=[],c=i.trianglesNormalBuffers,s=i.trianglesColorBuffers,p=i.trianglesVerticeBuffers,m=i.trianglesTexCoordBuffers,x=i.vertexIndexBuffers,d=0;d<5;++d)f.push(0),f.push(1),f.push(0),g.push(v[0]),g.push(v[1]),g.push(v[2]),g.push(v[3]);r=[0,0,0,-h,0,-h,h,0,-h,h,0,h,-h,0,h],a=[0,0,-h,-h,h,-h,h,h,-h,h];for(var M=0;M<r.length;M+=3)r[M]+=l[0],r[M+1]+=l[1],r[M+2]+=l[2];o=[0,1,2,0,2,3,0,3,4,0,4,1],c[e]=n.createBuffer(),n.bindBuffer(n.ARRAY_BUFFER,c[e]),n.bufferData(n.ARRAY_BUFFER,new Float32Array(f),n.STATIC_DRAW),c[e].itemSize=3,c[e].numItems=f.length/3,s[e]=n.createBuffer(),n.bindBuffer(n.ARRAY_BUFFER,s[e]),n.bufferData(n.ARRAY_BUFFER,new Float32Array(g),n.STATIC_DRAW),s[e].itemSize=4,s[e].numItems=g.length/4,p[e]=n.createBuffer(),n.bindBuffer(n.ARRAY_BUFFER,p[e]),n.bufferData(n.ARRAY_BUFFER,new Float32Array(r),n.STATIC_DRAW),p[e].itemSize=3,p[e].numItems=r.length/3,u&&(m[e]=n.createBuffer(),n.bindBuffer(n.ARRAY_BUFFER,m[e]),n.bufferData(n.ARRAY_BUFFER,new Float32Array(a),n.STATIC_DRAW),m[e].itemSize=2,m[e].numItems=a.length/2),x[e]=n.createBuffer(),n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,x[e]),n.bufferData(n.ELEMENT_ARRAY_BUFFER,new Uint16Array(o),n.STREAM_DRAW),x[e].itemSize=3,x[e].numItems=o.length}function o(n,i,e,r){for(var o=(r=Object.assign({},{color:[1,0,0,1],translation:[0,0,0],radius:1,division:30,smoothShading:!0,textured:!1},r)).color,a=r.translation,h=r.radius,v=r.division,l=r.smoothShading,u=r.textured,f=v,g=v,c=[],s=[],p=[],m=[],x=[],d=i.trianglesNormalBuffers,M=i.trianglesColorBuffers,y=i.trianglesVerticeBuffers,C=i.trianglesTexCoordBuffers,V=i.vertexIndexBuffers,P=0;P<=f;P++)for(var b=P*Math.PI/f,A=Math.sin(b),L=Math.cos(b),R=0;R<=g;R++){var B=2*R*Math.PI/g,N=Math.sin(B),S=Math.cos(B)*A,D=L,F=N*A;x.push(.5*(S+1)),x.push(.5*(D+1)),p.push(S),p.push(D),p.push(F),s.push(o[0]),s.push(o[1]),s.push(o[2]),s.push(o[3]),c.push(h*S+a[0]),c.push(h*D+a[1]),c.push(h*F+a[2])}for(var _=0;_<f;_++)for(var E=0;E<g;E++){var z=_*(g+1)+E,I=z+g+1;m.push(z),m.push(I),m.push(z+1),m.push(I),m.push(I+1),m.push(z+1)}if(!l){c=function(n,i){for(var e=[],t=0;t<i.length;++t){var r=3*i[t];e.push(n[r]),e.push(n[r+1]),e.push(n[r+2])}return e}(c,m),s=[];for(var T=0;T<m.length;++T)s.push(o[0]),s.push(o[1]),s.push(o[2]),s.push(o[3]);p=function(n,i){for(var e=[],r=0;r<i.length;r+=3){var o=3*i[r],a=3*i[r+1],h=3*i[r+2],v=new t.a(n[o],n[o+1],n[o+2]),l=new t.a(n[a],n[a+1],n[a+2]),u=new t.a(n[h],n[h+1],n[h+2]),f=(v.x+l.x+u.x)/3,g=(v.y+l.y+u.y)/3,c=(v.z+l.z+u.z)/3,s=new t.a(f,g,c);e.push(s.x),e.push(s.y),e.push(s.z),e.push(s.x),e.push(s.y),e.push(s.z),e.push(s.x),e.push(s.y),e.push(s.z)}return e}(p,m)}d[e]=n.createBuffer(),n.bindBuffer(n.ARRAY_BUFFER,d[e]),n.bufferData(n.ARRAY_BUFFER,new Float32Array(p),n.STATIC_DRAW),d[e].itemSize=3,d[e].numItems=p.length/3,M[e]=n.createBuffer(),n.bindBuffer(n.ARRAY_BUFFER,M[e]),n.bufferData(n.ARRAY_BUFFER,new Float32Array(s),n.STATIC_DRAW),M[e].itemSize=4,M[e].numItems=s.length/4,y[e]=n.createBuffer(),n.bindBuffer(n.ARRAY_BUFFER,y[e]),n.bufferData(n.ARRAY_BUFFER,new Float32Array(c),n.STATIC_DRAW),y[e].itemSize=3,y[e].numItems=c.length/3,u&&(C[e]=n.createBuffer(),n.bindBuffer(n.ARRAY_BUFFER,C[e]),n.bufferData(n.ARRAY_BUFFER,new Float32Array(x),n.STATIC_DRAW),C[e].itemSize=2,C[e].numItems=x.length/2),V[e]=n.createBuffer(),n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,V[e]),n.bufferData(n.ELEMENT_ARRAY_BUFFER,new Uint16Array(m),n.STREAM_DRAW),V[e].itemSize=3,V[e].numItems=m.length}function a(n,i,e,t){void 0===e&&(e=1),void 0===t&&(t=10);for(var r=e/t,o=[],a=0;a<=t;++a)for(var h=0;h<=t;++h)o.push(a*r),o.push(0),o.push(h*r);for(var v=[0],l=0;l<t;++l)if(l%2==0)for(var u=0;u<=t;++u)0!==u&&v.push(l*(t+1)+u),v.push((l+1)*(t+1)+u);else for(var f=0;f<=t;++f)0!==f&&v.push((l+1)*(t+1)-(f+1)),v.push((l+2)*(t+1)-(f+1));i.trianglesVerticesBuffer=n.createBuffer(),n.bindBuffer(n.ARRAY_BUFFER,i.trianglesVerticesBuffer),n.bufferData(n.ARRAY_BUFFER,new Float32Array(o),n.STATIC_DRAW),i.trianglesVerticesBuffer.itemSize=3,i.trianglesVerticesBuffer.numItems=o.length/3,i.vertexIndexBuffer=n.createBuffer(),n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,i.vertexIndexBuffer),n.bufferData(n.ELEMENT_ARRAY_BUFFER,new Uint16Array(v),n.STREAM_DRAW),i.vertexIndexBuffer.itemSize=3,i.vertexIndexBuffer.numItems=v.length}function h(n,i,e,t){void 0===e&&(e=1),void 0===t&&(t=3);for(var r=Math.pow(2,t),o=e/r,a=[],h=0;h<=r;++h)for(var v=0;v<=r;++v)a.push(h*o-.5*e),a.push(0),a.push(v*o-.5*e);a[3*(0+0*(r+1))+1]=1.5,a[3*(r+0*(r+1))+1]=3.5,a[3*(0+r*(r+1))+1]=2,a[3*(r+r*(r+1))+1]=1,function n(i,e,t,r,o,a,h){if(e[0]+1===o[0]||e[1]+1===o[1])return;var v=[(e[0]+o[0])/2,(e[1]+o[1])/2];var l=[e[0],(e[1]+r[1])/2];var u=[t[0],(t[1]+o[1])/2];var f=[(e[0]+t[0])/2,e[1]];var g=[(r[0]+o[0])/2,r[1]];var c=i[3*(e[0]+e[1]*(a+1))+1];var s=i[3*(t[0]+t[1]*(a+1))+1];var p=i[3*(r[0]+r[1]*(a+1))+1];var m=i[3*(o[0]+o[1]*(a+1))+1];var x=(c+s)/2;i[3*(f[0]+f[1]*(a+1))+1]=x;var d=(p+m)/2;i[3*(g[0]+g[1]*(a+1))+1]=d;var M=(c+p)/2;i[3*(l[0]+l[1]*(a+1))+1]=M;var y=(s+m)/2;i[3*(u[0]+u[1]*(a+1))+1]=y;i[3*(v[0]+v[1]*(a+1))+1]=(c+s+p+m)/4+(-.5+Math.random())*Math.pow(.65,h-2);n(i,e,f,l,v,a,h+1);n(i,f,t,v,u,a,h+1);n(i,l,v,r,g,a,h+1);n(i,v,u,g,o,a,h+1)}(a,[0,0],[r,0],[0,r],[r,r],r,0);for(var l=[0],u=0;u<r;++u)if(u%2==0)for(var f=0;f<=r;++f)0!==f&&l.push(f+u*(r+1)),l.push(f+(u+1)*(r+1));else for(var g=0;g<=r;++g)0!==g&&l.push((u+1)*(r+1)-(g+1)),l.push((u+2)*(r+1)-(g+1));i.trianglesVerticesBuffer=n.createBuffer(),n.bindBuffer(n.ARRAY_BUFFER,i.trianglesVerticesBuffer),n.bufferData(n.ARRAY_BUFFER,new Float32Array(a),n.STATIC_DRAW),i.trianglesVerticesBuffer.itemSize=3,i.trianglesVerticesBuffer.numItems=a.length/3,i.vertexIndexBuffer=n.createBuffer(),n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,i.vertexIndexBuffer),n.bufferData(n.ELEMENT_ARRAY_BUFFER,new Uint16Array(l),n.STREAM_DRAW),i.vertexIndexBuffer.itemSize=3,i.vertexIndexBuffer.numItems=l.length}},53:function(n,i,e){"use strict";e.r(i);var t=e(1),r=null,o=null,a=null,h=null,v=null,l=null,u=null,f=null,g=null,c=[],s=[],p=[],m=[],x=mat4.create(),d=mat4.create(),M=mat3.create(),y=0,C=!1,V={flat:{vertexShader:"\n    attribute vec3 aVertexPosition;\n    attribute vec3 aVertexColor;\n    attribute vec3 aVertexNormal;\n\n    uniform mat4 uPMatrix;    \n    uniform mat4 uMVMatrix;\n    uniform mat3 uNormalMatrix;\n    \n    varying highp vec3 vColor;\n    varying highp vec3 L;\n    varying highp vec3 N;\n    \n    void main(void) {\n      gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);\n      \n      vec3 pointLightPosition = vec3(1.0, 2.0, -1.0);\n      vec3 pointLightDirection = normalize(vec3(pointLightPosition.xyz - aVertexPosition.xyz));\n      vec3 ambientColor = vec3(0.1, 0.1, 0.1);\n      \n      L = vec3(uPMatrix * uMVMatrix * vec4(pointLightDirection, 1.0));\n      N = uNormalMatrix * aVertexNormal;\n      \n      vColor = aVertexColor;\n    }\n  ",fragmentShader:"\n    varying highp vec3 vColor;\n    varying highp vec3 N;\n    varying highp vec3 L;\n    \n    void main(void) {\n      highp float lambert = max(dot(normalize(N), normalize(L)), 0.0);\n      gl_FragColor = vec4(vColor * lambert, 1.0);\n    }\n  "},phong:{vertexShader:"\n    attribute vec3 aVertexPosition;\n    attribute vec3 aVertexColor;\n    attribute vec3 aVertexNormal;\n\n    uniform highp mat4 uPMatrix;    \n    uniform highp mat4 uMVMatrix;\n    uniform highp mat3 uNormalMatrix;\n    \n    varying highp vec3 vColor;\n    varying highp vec3 vPosition;\n    varying highp vec3 N;\n    \n    void main(void) {\n      gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);\n      \n      vColor = aVertexColor;\n      vPosition = aVertexPosition;\n      N = aVertexNormal;\n    }\n  ",fragmentShader:"\n    uniform highp mat4 uPMatrix;\n    uniform highp mat4 uMVMatrix;\n    uniform highp mat3 uNormalMatrix;\n    \n    varying highp vec3 vColor;\n    varying highp vec3 vPosition;\n    varying highp vec3 N;\n    \n    void main(void) {\n      highp vec3 n = uNormalMatrix * N;\n      \n      highp vec3 pointLightPosition = vec3(1.0, 2.0, -1.0);\n      highp vec3 pointLightDirection = normalize(vec3(pointLightPosition.xyz - vPosition.xyz));\n      \n      highp vec3 L = vec3(uPMatrix * uMVMatrix * vec4(pointLightDirection, 1.0));\n      \n      highp float lambert = max(dot(normalize(n), normalize(L)), 0.0);\n      gl_FragColor = vec4(vColor * lambert, 1.0);\n    }\n  "},gouraud_phong:{vertexShader:"\n    attribute vec3 aVertexPosition;\n    attribute vec3 aVertexColor;\n    attribute vec3 aVertexNormal;\n\n    uniform highp mat4 uPMatrix;    \n    uniform highp mat4 uMVMatrix;\n    uniform highp mat3 uNormalMatrix;\n    \n    varying highp vec3 vColor;\n    varying highp float diffuseLambert;\n    varying highp float specular;\n    \n    void main(void) {\n      gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);\n      vColor = aVertexColor;\n      \n      vec3 pointLightPosition = vec3(1.0, 2.0, -1.0);\n      vec3 pointLightDirection = vec3(pointLightPosition.xyz - aVertexPosition.xyz);\n      \n      vec3 L = vec3(uPMatrix * uMVMatrix * vec4(pointLightDirection, 1.0));\n      vec3 N = normalize(uNormalMatrix * aVertexNormal);\n      vec3 V = -vec3(uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0));\n      \n      L = normalize(L);\n      V = normalize(V); \n      \n      vec3 R = reflect(-L, N);\n      float shininess = 128.0;\n      \n      specular = pow(max(0.0, dot(R, V)), shininess);\n      diffuseLambert = dot(L, N);\n    }\n  ",fragmentShader:" \n    varying highp vec3 vColor;\n    varying highp float diffuseLambert;\n    varying highp float specular;\n    \n    void main(void) {\n      highp float AmbientIntensity = 0.3;\n      highp vec3 DiffuseLightIntensity = vec3(0.9, 0.9, 0.9);\n      highp float SpecularIntensity = 0.5;\n      \n      highp vec3 AmbientColour = vec3(0.1, 0.1, 0.1);\n      highp vec3 DiffuseMaterialColour = vColor;\n      highp vec3 SpecularColour = vec3(1.0, 1.0, 1.0);\n      \n      gl_FragColor = vec4(AmbientColour * AmbientIntensity +\n        diffuseLambert * DiffuseMaterialColour * DiffuseLightIntensity +\n        SpecularColour * specular * SpecularIntensity, 1.0);\n    }\n  "},phong_phong:{vertexShader:"\n    attribute vec3 aVertexPosition;\n    attribute vec3 aVertexColor;\n    attribute vec3 aVertexNormal;\n\n    uniform highp mat4 uPMatrix;    \n    uniform highp mat4 uMVMatrix;\n    \n    varying highp vec3 vColor;\n    varying highp vec3 vPosition;\n    varying highp vec3 N;\n    \n    void main(void) {\n      gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);\n      \n      vColor = aVertexColor;\n      vPosition = aVertexPosition;\n      N = aVertexNormal;\n    }\n  ",fragmentShader:" \n    uniform highp mat4 uPMatrix;\n    uniform highp mat4 uMVMatrix;\n    uniform highp mat3 uNormalMatrix;\n\n    varying highp vec3 vColor;\n    varying highp vec3 vPosition;\n    varying highp vec3 N;\n\n    void main(void) {\n      highp vec3 pointLightPosition = vec3(5.0, 1.0, 5.0);\n\n      highp vec3 pointLightDirection = vec3(pointLightPosition.xyz - vPosition.xyz);\n      \n      highp mat4 mvp = uPMatrix * uMVMatrix;\n\n      highp vec3 L = vec3(mvp * vec4(pointLightDirection, 1.0));\n      highp vec3 V = -vec3(mvp * vec4(vPosition,1.0));\n\n      highp vec3 l = normalize(L);\n      highp vec3 n = normalize(uNormalMatrix * N);\n      highp vec3 v = normalize(V);\n      \n      highp vec3 R = reflect(l, n);\n\n      highp float diffuseLambert = dot(l,n);\n      highp float Roughness = 1.0;\n      highp float AmbientIntensity = 0.3;\n      highp vec3 DiffuseLightIntensity = vec3(0.9, 0.9, 0.9);\n      highp float SpecularIntensity = 0.5;\n      highp float shininess = 128.0;\n\n      highp float specular = pow( max(0.0,dot(R,v)), shininess);\n\n      highp vec3 AmbientColour = vec3(0.1, 0.1, 0.1);\n      highp vec3 DiffuseMaterialColour = vColor.xyz;\n      highp vec3 SpecularColour = vec3(1.0, 1.0, 1.0);\n    \n      gl_FragColor = vec4(AmbientColour*AmbientIntensity + \n        diffuseLambert * DiffuseMaterialColour*DiffuseLightIntensity +\n        SpecularColour * specular*SpecularIntensity, 1.0);\n    }\n  "},attenuation:{vertexShader:"\n    attribute vec3 aVertexPosition;\n    attribute vec3 aVertexColor;\n    attribute vec3 aVertexNormal;\n\n    uniform highp mat4 uPMatrix;    \n    uniform highp mat4 uMVMatrix;\n    \n    varying highp vec3 vColor;\n    varying highp vec3 vPosition;\n    varying highp vec3 N;\n    \n    void main(void) {\n      gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);\n      \n      vColor = aVertexColor;\n      vPosition = aVertexPosition;\n      N = aVertexNormal;\n    }\n  ",fragmentShader:" \n    uniform highp mat4 uPMatrix;\n    uniform highp mat4 uMVMatrix;\n    uniform highp mat3 uNormalMatrix;\n\n    varying highp vec3 vColor;\n    varying highp vec3 vPosition;\n    varying highp vec3 N;\n\n    void main(void) {\n      highp vec3 pointLightPosition = vec3(5.0, 1.0, 5.0);\n\n      highp vec3 pointLightDirection = vec3(pointLightPosition.xyz - vPosition.xyz);\n      highp float d = length(pointLightDirection);\n      highp float attenuation = 1.0/(.01 + .01*d+.02*d*d);\n      \n      highp mat4 mvp = uPMatrix * uMVMatrix;\n\n      highp vec3 L = vec3(mvp * vec4(pointLightDirection, 1.0));\n      highp vec3 V = -vec3(mvp * vec4(vPosition,1.0));\n\n      highp vec3 l = normalize(L);\n      highp vec3 n = normalize(uNormalMatrix * N);\n      highp vec3 v = normalize(V);\n      \n      highp vec3 R = reflect(l, n);\n\n      highp float diffuseLambert = dot(l,n);\n      highp float Roughness = 1.0;\n      highp float AmbientIntensity = 0.3;\n      highp vec3 DiffuseLightIntensity = vec3(0.9, 0.9, 0.9);\n      highp float SpecularIntensity = 0.5;\n      highp float shininess = 128.0;\n\n      highp float specular = pow(max(0.0,dot(R,v)), shininess);\n\n      highp vec3 AmbientColour = vec3(0.1, 0.1, 0.1) * attenuation;\n      highp vec3 DiffuseMaterialColour = vColor.xyz * attenuation;\n      highp vec3 SpecularColour = vec3(1.0, 1.0, 1.0) * attenuation;\n    \n      gl_FragColor = vec4(AmbientColour*AmbientIntensity + \n        diffuseLambert * DiffuseMaterialColour*DiffuseLightIntensity +\n        SpecularColour * specular*SpecularIntensity, 1.0);\n    }\n  "},spotlight:{vertexShader:"\n    attribute vec3 aVertexPosition;\n    attribute vec3 aVertexColor;\n    attribute vec3 aVertexNormal;\n\n    uniform highp mat4 uPMatrix;    \n    uniform highp mat4 uMVMatrix;\n    \n    varying highp vec3 vColor;\n    varying highp vec3 vPosition;\n    varying highp vec3 N;\n    \n    void main(void) {\n      gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);\n      \n      vColor = aVertexColor;\n      vPosition = aVertexPosition;\n      N = aVertexNormal;\n    }\n  ",fragmentShader:" \n    uniform highp mat4 uPMatrix;\n    uniform highp mat4 uMVMatrix;\n    uniform highp mat3 uNormalMatrix;\n\n    varying highp vec3 vColor;\n    varying highp vec3 vPosition;\n    varying highp vec3 N;\n\n    void main(void) {\n      highp vec3 pointLightPosition = vec3(5.0, 1.0, 5.0);\n\n      highp vec3 pointLightDirection = vec3(pointLightPosition.xyz - vPosition.xyz);\n      highp float d = length(pointLightDirection);\n      highp float attenuation = 1.0/(.01 + .01*d + .02*d*d);\n      \n      highp mat4 mvp = uPMatrix * uMVMatrix;\n\n      highp vec3 L = vec3(mvp * vec4(pointLightDirection, 1.0));\n      highp vec3 V = -vec3(mvp * vec4(vPosition,1.0));\n\n      highp vec3 l = normalize(L);\n      highp vec3 n = normalize(uNormalMatrix * N);\n      highp vec3 v = normalize(V);\n      \n      highp vec3 R = reflect(l, n);\n\n      highp float diffuseLambert = dot(l,n);\n      \n      // spotlight\n      highp float spotCosCutoff = 0.6;\n      highp float spotExponent = 2.0;\n      highp vec3 spotDirection = vec3(0.5, 0.5, 0.5);\n      highp float spotEffect = dot(normalize(spotDirection), l);\n      \n      if (diffuseLambert > 0.0) {\n        if(spotEffect > spotCosCutoff) {\n          highp float Roughness = 1.0;\n          highp float AmbientIntensity = 0.3;\n          highp vec3 DiffuseLightIntensity = vec3(0.9, 0.9, 0.9);\n          highp float SpecularIntensity = 0.5;\n          highp float shininess = 32.0;\n\n          highp float specular = pow(max(0.0,dot(R,v)), shininess);\n\n          highp vec3 AmbientColour = vec3(0.1, 0.1, 0.1) * attenuation;\n          highp vec3 DiffuseMaterialColour = vColor.xyz * attenuation;\n          highp vec3 SpecularColour = vec3(1.0, 1.0, 1.0) * attenuation;\n    \n          gl_FragColor = vec4(AmbientColour*AmbientIntensity + \n            diffuseLambert * DiffuseMaterialColour*DiffuseLightIntensity +\n            SpecularColour * specular*SpecularIntensity, 1.0);\n        } else {\n          gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);\n        }\n      } else {\n        gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);\n      }\n    } \n  "},fog:{vertexShader:"\n    attribute vec3 aVertexPosition;\n    attribute vec3 aVertexColor;\n    attribute vec3 aVertexNormal;\n\n    uniform highp mat4 uPMatrix;    \n    uniform highp mat4 uMVMatrix;\n    \n    varying highp vec3 vColor;\n    varying highp vec3 vPosition;\n    varying highp vec3 N;\n    varying highp float fogZ;\n    \n    void main(void) {\n      gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);\n      \n      vColor = aVertexColor;\n      vPosition = aVertexPosition;\n      N = aVertexNormal;\n      fogZ = length(gl_Position.xyz);\n    }\n  ",fragmentShader:" \n    uniform highp mat4 uPMatrix;\n    uniform highp mat4 uMVMatrix;\n    uniform highp mat3 uNormalMatrix;\n\n    varying highp vec3 vColor;\n    varying highp vec3 vPosition;\n    varying highp vec3 N;\n    varying highp float fogZ;\n\n    void main(void) {\n      highp vec3 pointLightPosition = vec3(5.0, 1.0, 5.0);\n\n      highp vec3 pointLightDirection = vec3(pointLightPosition.xyz - vPosition.xyz);\n      highp float d = length(pointLightDirection);\n      highp float attenuation = 68.0/(.31 + .01*d+.22*d*d);\n      \n      highp mat4 mvp = uPMatrix * uMVMatrix;\n\n      highp vec3 L = vec3(mvp * vec4(pointLightDirection, 1.0));\n      highp vec3 V = -vec3(mvp * vec4(vPosition,1.0));\n\n      highp vec3 l = normalize(L);\n      highp vec3 n = normalize(uNormalMatrix * N);\n      highp vec3 v = normalize(V);\n      \n      highp vec3 R = reflect(l, n);\n\n      highp float diffuseLambert = dot(l,n);\n      highp float Roughness = 1.0;\n      highp float AmbientIntensity = 0.75;\n      highp vec3 DiffuseLightIntensity = vec3(0.9, 0.9, 0.9);\n      highp float SpecularIntensity = 0.8;\n      highp float shininess = 128.0;\n\n      highp float specular = pow(max(0.0,dot(R,v)), shininess);\n\n      highp vec3 AmbientColour = vec3(0.1, 0.1, 0.1) * attenuation;\n      highp vec3 DiffuseMaterialColour = vColor.xyz * attenuation;\n      highp vec3 SpecularColour = vec3(1.0, 1.0, 1.0) * attenuation;\n      \n      // calculate fog\n      highp float fogDensity = 0.25;\n      highp vec4 fogColor = vec4(0.1, 0.2, 0.1, 0.6);\n      \n      highp float fogFactor = exp(-fogDensity * fogDensity * fogZ * fogZ);\n      fogFactor = clamp(fogFactor, 0.0, 1.0);\n    \n      highp vec4 materialColor = vec4(AmbientColour*AmbientIntensity + \n        diffuseLambert * DiffuseMaterialColour*DiffuseLightIntensity +\n        SpecularColour * specular*SpecularIntensity, 1.0);\n      \n      gl_FragColor = mix(fogColor, materialColor, fogFactor);\n    }\n  "},fog_spotlight:{vertexShader:"\n    attribute vec3 aVertexPosition;\n    attribute vec3 aVertexColor;\n    attribute vec3 aVertexNormal;\n\n    uniform highp mat4 uPMatrix;    \n    uniform highp mat4 uMVMatrix;\n    \n    varying highp vec3 vColor;\n    varying highp vec3 vPosition;\n    varying highp vec3 N;\n    varying highp float fogZ;\n    \n    void main(void) {\n      gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);\n      \n      vColor = aVertexColor;\n      vPosition = aVertexPosition;\n      N = aVertexNormal;\n      fogZ = length(gl_Position.xyz);\n    }\n  ",fragmentShader:" \n    uniform highp mat4 uPMatrix;\n    uniform highp mat4 uMVMatrix;\n    uniform highp mat3 uNormalMatrix;\n\n    varying highp vec3 vColor;\n    varying highp vec3 vPosition;\n    varying highp vec3 N;\n    varying highp float fogZ;\n\n    void main(void) {\n      highp vec3 pointLightPosition = vec3(5.0, 1.0, 5.0);\n\n      highp vec3 pointLightDirection = vec3(pointLightPosition.xyz - vPosition.xyz);\n      highp float d = length(pointLightDirection);\n      highp float attenuation = 1.0/(.01 + .01*d + .02*d*d);\n      \n      highp mat4 mvp = uPMatrix * uMVMatrix;\n\n      highp vec3 L = vec3(mvp * vec4(pointLightDirection, 1.0));\n      highp vec3 V = -vec3(mvp * vec4(vPosition,1.0));\n\n      highp vec3 l = normalize(L);\n      highp vec3 n = normalize(uNormalMatrix * N);\n      highp vec3 v = normalize(V);\n      \n      highp vec3 R = reflect(l, n);\n\n      highp float diffuseLambert = dot(l,n);\n      \n      // spotlight\n      highp float spotCosCutoff = 0.6;\n      highp float spotExponent = 2.0;\n      highp vec3 spotDirection = vec3(0.5, 0.5, 0.5);\n      highp float spotEffect = dot(normalize(spotDirection), l);\n      \n      // calculate fog\n      highp float fogDensity = 0.075;\n      highp vec4 fogColor = vec4(0.1, 0.2, 0.1, 0.6);\n      \n      highp float fogFactor = exp(-fogDensity * fogDensity * fogZ * fogZ);\n      fogFactor = clamp(fogFactor, 0.0, 1.0);\n      \n      highp vec4 materialColor = vec4(0.0, 0.0, 0.0, 1.0);\n      \n      if (diffuseLambert > 0.0) {\n        if(spotEffect > spotCosCutoff) {\n          highp float Roughness = 1.0;\n          highp float AmbientIntensity = 0.3;\n          highp vec3 DiffuseLightIntensity = vec3(0.9, 0.9, 0.9);\n          highp float SpecularIntensity = 0.5;\n          highp float shininess = 32.0;\n\n          highp float specular = pow( max(0.0,dot(R,v)), shininess);\n\n          highp vec3 AmbientColour = vec3(0.1, 0.1, 0.1) * attenuation;\n          highp vec3 DiffuseMaterialColour = vColor.xyz * attenuation;\n          highp vec3 SpecularColour = vec3(1.0, 1.0, 1.0) * attenuation;\n    \n          materialColor = vec4(AmbientColour*AmbientIntensity + \n            diffuseLambert * DiffuseMaterialColour*DiffuseLightIntensity +\n            SpecularColour * specular*SpecularIntensity, 1.0);\n        } \n      }\n      \n      gl_FragColor = mix(fogColor, materialColor, fogFactor); \n    } \n  "},cartoon:{vertexShader:"\n    attribute vec3 aVertexPosition;\n    attribute vec3 aVertexColor;\n    attribute vec3 aVertexNormal;\n\n    uniform mat3 uNormalMatrix;\n    uniform mat4 uMVMatrix;\n    uniform mat4 uPMatrix;\n\n    varying vec3 vColor;\n    varying float diffuseLambert;\n    varying float specular;\n    \n    void main(void) {\n      gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);\n      vColor = aVertexColor;\n\n      vec3 pointLightPosition = vec3(1.0,2.0,-1.0);\n      vec3 pointLightDirection = vec3(pointLightPosition.xyz - aVertexPosition.xyz);\n        \n      vec3 L = vec3(uPMatrix * uMVMatrix * vec4(pointLightDirection, 1.0));\n      vec3 N = normalize(uNormalMatrix * aVertexNormal);         \n      vec3 V = -vec3(uPMatrix * uMVMatrix * vec4(aVertexPosition,1.0));\n\n      L = normalize(L);\n      V = normalize(V);\n        \n      vec3 R = reflect(-L, N);\n      float shininess = 128.0;\n        \n      specular = pow(max(0.0,dot(R, V)), shininess);\n      diffuseLambert = dot(L, N);\n    }\n  ",fragmentShader:" \n    varying highp vec3 vColor;\n    varying highp float diffuseLambert;\n    \n    void main(void) {\n      highp vec4 color = vec4( vColor * .1, 1.0);\n      \n      if (diffuseLambert > 0.9) {\n        color = vec4(vColor * .8, 1.0);\n      } else if (diffuseLambert > 0.6) {\n        color = vec4(vColor * .5, 1.0);\n      } else if (diffuseLambert > 0.3){\n        color = vec4(vColor * .3, 1.0);\n      }\n      \n      gl_FragColor = color;\n      // gl_FragColor = vec4(vColor * floor(diffuseLambert*10.0)*.1, 1.0);         \n    }\n  "},gooch_vs:{vertexShader:"\n    attribute vec3 aVertexPosition;\n    attribute vec3 aVertexColor;\n    attribute vec3 aVertexNormal;\n    \n    uniform mat3 uNormalMatrix;\n    uniform mat4 uMVMatrix;\n    uniform mat4 uPMatrix;\n    \n    varying vec3 vColor;\n    varying float diffuseLambert;\n    varying float specular;\n    \n    void main(void) {\n      gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);\n      vColor = aVertexColor;\n      \n      vec3 pointLightPosition = vec3(1.0,2.0,-1.0);\n      vec3 pointLightDirection = vec3(pointLightPosition.xyz - aVertexPosition.xyz);\n      \n      vec3 L = vec3(uPMatrix * uMVMatrix * vec4(pointLightDirection, 1.0));\n      vec3 N = normalize(uNormalMatrix * aVertexNormal);         \n      vec3 V = -vec3(uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0));\n      \n      L = normalize(L);\n      V = normalize(V);\n      \n      vec3 R = reflect(-L, N);\n      float shininess = 128.0;\n      \n      specular = pow(max(0.0,dot(R, V)), shininess);\n      diffuseLambert = dot(L, N);\n    }\n  ",fragmentShader:" \n    varying highp vec3 vColor;\n    varying highp float diffuseLambert;\n    varying highp float specular;\n    \n    void main(void) {\n      //below is modified from http://3dshaders.com/shaders/CH15-Gooch.frag.txt\n      highp vec3  SurfaceColor = vec3(0.75, 0.75, 0.75);\n      highp vec3  WarmColor = vec3(0.6, 0.6, 0.0);\n      highp vec3  CoolColor = vec3(0.0, 0.0, 0.6);\n      highp float DiffuseWarm = 0.45;\n      highp float DiffuseCool = 0.45;\n      \n      highp vec3 kcool = min(CoolColor + DiffuseCool * SurfaceColor, 1.0);\n      highp vec3 kwarm = min(WarmColor + DiffuseWarm * SurfaceColor, 1.0); \n      highp vec3 kfinal = mix(kcool, kwarm, diffuseLambert);\n      \n      gl_FragColor = vec4(min(kfinal + specular, 1.0), 1.0);\n    }\n  "},gooch_fs:{vertexShader:"\n    uniform mat4 uMVMatrix;\n    uniform mat4 uPMatrix;\n    \n    attribute vec3 aVertexPosition;\n    attribute vec4 aVertexColor;\n    attribute vec3 aVertexNormal;\n    \n    varying highp vec4 vColor;\n    varying highp vec3 vPosition;\n    varying highp vec3 N;\n\n    void main(void) {\n      gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);\n      \n      vColor = aVertexColor;\n      vPosition = aVertexPosition;\n      N = aVertexNormal;         \n    }\n  ",fragmentShader:" \n    uniform highp mat3 uNormalMatrix;\n    uniform highp mat4 uMVMatrix;\n    uniform highp mat4 uPMatrix;\n    \n    varying highp vec4 vColor;\n    varying highp vec3 vPosition;\n    varying highp vec3 N;\n    \n    void main(void) {        \n      highp vec3 pointLightPosition = vec3(1.0,2.0,1.0);\n      \n      highp vec3 pointLightDirection = vec3(pointLightPosition.xyz - vPosition.xyz);\n      \n      highp mat4 mvp = uPMatrix * uMVMatrix;\n      \n      highp vec3 L = vec3(mvp * vec4(pointLightDirection, 1.0));\n      highp vec3 V = -vec3(mvp * vec4(vPosition,1.0));\n      \n      highp vec3 l = normalize(L);\n      highp vec3 n = normalize(uNormalMatrix * N);\n      highp vec3 v = normalize(V);\n      \n      highp vec3 R = reflect(l, n);\n      \n      highp float diffuseLambert = dot(l,n);\n      highp float Roughness = 1.0;\n      highp vec3 DiffuseLightIntensity = vec3(0.9, 0.9, 0.9);\n      highp float SpecularIntensity = 0.5;\n      highp float shininess = 128.0;\n      \n      highp float specular = pow( max(0.0,dot(R,v)), shininess);\n    \n      //below is modified from http://3dshaders.com/shaders/CH15-Gooch.frag.txt\n      highp vec3  SurfaceColor = vec3(0.75, 0.75, 0.75);\n      highp vec3  WarmColor = vec3(0.6, 0.6, 0.0);\n      highp vec3  CoolColor = vec3(0.0, 0.0, 0.6);\n      highp float DiffuseWarm = 0.45;\n      highp float DiffuseCool = 0.45;\n      \n      highp vec3 kcool = min(CoolColor + DiffuseCool * SurfaceColor, 1.0);\n      highp vec3 kwarm = min(WarmColor + DiffuseWarm * SurfaceColor, 1.0); \n      highp vec3 kfinal = mix(kcool, kwarm, diffuseLambert);\n      \n      gl_FragColor = vec4(min(kfinal + specular, 1.0), 1.0);\n    }\n  "}},P=document.querySelectorAll('input[type=radio][name="light"]');function b(){r.deleteProgram(h),A(this.value)}function A(n){(function(n,i){var e=V[i].vertexShader,t=V[i].fragmentShader;l=L(e,r.VERTEX_SHADER),v=L(t,r.FRAGMENT_SHADER),r.attachShader(n,l),r.attachShader(n,v),r.linkProgram(n),r.getProgramParameter(n,r.LINK_STATUS)||alert("Unable to initialize the shader program.")})(h=r.createProgram(),n),r.useProgram(h),h.pMatrixUniform=r.getUniformLocation(h,"uPMatrix"),h.mvMatrixUniform=r.getUniformLocation(h,"uMVMatrix"),h.normalMatrixUniform=r.getUniformLocation(h,"uNormalMatrix")}function L(n,i){var e=r.createShader(i);return r.shaderSource(e,n),r.compileShader(e),r.getShaderParameter(e,r.COMPILE_STATUS)||alert("Error compiling shader: "+r.getShaderInfoLog(e)),e}window.addEventListener("load",function(){o=document.querySelector("#canvas"),a=document.querySelector("#container"),o.width=a.clientWidth,o.height=a.clientHeight;try{r=o.getContext("webgl")||o.getContext("experimental-webgl")}catch(n){console.error(n)}r&&(A("flat"),Object(t.d)(r,{trianglesNormalBuffers:s,trianglesColorBuffers:p,trianglesVerticeBuffers:c,vertexIndexBuffers:m},0,{translation:[-1,-.75,0],color:[1,0,0,1],division:20,smoothShading:!1}),Object(t.d)(r,{trianglesNormalBuffers:s,trianglesColorBuffers:p,trianglesVerticeBuffers:c,vertexIndexBuffers:m},1,{translation:[0,0,1],color:[0,1,0,1],division:10,smoothShading:!1}),Object(t.d)(r,{trianglesNormalBuffers:s,trianglesColorBuffers:p,trianglesVerticeBuffers:c,vertexIndexBuffers:m},2,{translation:[1,.25,-1],color:[1,1,0,1],division:5,smoothShading:!1}),Object(t.d)(r,{trianglesNormalBuffers:s,trianglesColorBuffers:p,trianglesVerticeBuffers:c,vertexIndexBuffers:m},3,{translation:[-1,1,-1],color:[1,0,1,1]}),Object(t.d)(r,{trianglesNormalBuffers:s,trianglesColorBuffers:p,trianglesVerticeBuffers:c,vertexIndexBuffers:m},4,{translation:[-0,1.75,-0],color:[0,1,1,1]}),Object(t.c)(r,{trianglesNormalBuffers:s,trianglesColorBuffers:p,trianglesVerticeBuffers:c,vertexIndexBuffers:m},5,{translation:[0,-1,0]}),u=r.getAttribLocation(h,"aVertexPosition"),g=r.getAttribLocation(h,"aVertexColor"),f=r.getAttribLocation(h,"aVertexNormal"),r.enableVertexAttribArray(u),r.enableVertexAttribArray(g),r.enableVertexAttribArray(f),function n(){C||(r.clearColor(.7,.7,.7,1),r.clear(r.COLOR_BUFFER_BIT|r.DEPTH_BUFFER_BIT),r.enable(r.DEPTH_TEST),r.viewport(0,0,o.width,o.height),mat4.perspective(x,45,o.width/o.height,.1,100),function(){mat4.identity(d),mat4.translate(d,d,[0,.4,-6.5]),mat4.rotate(d,d,-.3,[-.3,0,.2]),mat4.rotate(d,d,y,[0,1,0]);var n=mat3.create();mat3.fromMat4(n,d),mat3.invert(M,n),mat3.transpose(M,M),y+=.005,r.uniformMatrix4fv(h.pMatrixUniform,!1,x),r.uniformMatrix4fv(h.mvMatrixUniform,!1,d),r.uniformMatrix3fv(h.normalMatrixUniform,!1,M);for(var i=0;i<m.length;++i)r.bindBuffer(r.ARRAY_BUFFER,c[i]),r.vertexAttribPointer(u,3,r.FLOAT,!1,0,0),r.bindBuffer(r.ARRAY_BUFFER,p[i]),r.vertexAttribPointer(g,4,r.FLOAT,!1,0,0),r.bindBuffer(r.ARRAY_BUFFER,s[i]),r.vertexAttribPointer(f,3,r.FLOAT,!1,0,0),4===i?(r.disable(r.DEPTH_TEST),r.enable(r.BLEND),r.blendFunc(r.SRC_ALPHA,r.ONE),r.blendEquation(r.FUNC_ADD)):(r.disable(r.BLEND),r.enable(r.DEPTH_TEST)),r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,m[i]),i>2?r.drawElements(r.TRIANGLES,m[i].numItems,r.UNSIGNED_SHORT,0):r.drawArrays(r.TRIANGLES,0,c[i].numItems)}()),requestAnimationFrame(n)}())}),document.addEventListener("keyup",function(n){switch(n.keyCode){case 80:C=!C}}),Array.prototype.forEach.call(P,function(n){n.addEventListener("change",b)})}},[[53,0]]]);
//# sourceMappingURL=webgl-light.js.map