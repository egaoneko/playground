(window.webpackJsonp=window.webpackJsonp||[]).push([[77],{78:function(e,r){var t=null,o=null,i=null,n=null,a=null,l=null,u=null,m=null,c=null,g=null,v=null,f=null,h=0,x=1,s=[],p=[],T=mat4.create(),d=mat4.create(),A=mat3.create(),R=0,E=!1,L=!1,b=!1;function U(e,r){var o=t.createShader(r);return t.shaderSource(o,e),t.compileShader(o),t.getShaderParameter(o,t.COMPILE_STATUS)||alert("Error compiling shader: "+t.getShaderInfoLog(o)),o}function C(e){t.activeTexture(t.TEXTURE0+e),s[e]=t.createTexture(),t.bindTexture(t.TEXTURE_2D,s[e]),t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,!0),t.texImage2D(t.TEXTURE_2D,0,t.RGBA,t.RGBA,t.UNSIGNED_BYTE,p[e]),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.NEAREST),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.NEAREST),n.uDoTexturing=t.getUniformLocation(n,"uDoTexturing"),t.uniform1i(n.uDoTexturing,1),t.isTexture(s[e])||console.error("Error: Texture is invalid")}window.addEventListener("load",function(){o=document.querySelector("#canvas"),i=document.querySelector("#container"),o.width=i.clientWidth,o.height=i.clientHeight;try{t=o.getContext("webgl")||o.getContext("experimental-webgl")}catch(e){console.error(e)}t&&(!function(){var e="\n    attribute vec3 aVertexPosition;\n    attribute vec2 aVertexTexCoord;\n    attribute vec3 aVertexNormal;\n\n    uniform mat4 uPMatrix;    \n    uniform mat4 uMVMatrix;\n    uniform mat3 uNormalMatrix;\n    \n    varying highp vec2 vTextureCoord;\n    varying highp vec3 vLight;\n    \n    void main(void) {\n      gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);\n      vTextureCoord = aVertexTexCoord;\n      \n      // lighting\n      vec3 ambientLight = vec3(0.3, 0.3, 0.3);\n      vec3 transformedNormal = uNormalMatrix * aVertexNormal;\n      vec3 lightColor = vec3(0.5, 0.5, 0.5);\n      \n      // vec3 directionalLightPosition = normalize(vec3(10.0, 10.0, 5.0));\n      // vec3 light = vec3(uPMatrix * uMVMatrix * vec4(directionalLightPosition, 1.0));\n      \n      vec3 pointLightPosition = vec3(1.0,2.0,-1.0);\n      vec3 pointLightDirection = normalize(vec3(pointLightPosition.xyz - aVertexPosition.xyz));\n      vec3 light = vec3(uPMatrix * uMVMatrix * vec4(pointLightDirection, 1.0));\n      \n      float diffuseLightAmount = max(dot(normalize(transformedNormal), normalize(light)), 0.0);\n      vLight = ambientLight + (diffuseLightAmount * lightColor);\n    }\n  ",r="\n    varying highp vec2 vTextureCoord;\n    varying highp vec3 vLight;\n    \n    uniform sampler2D uSampler0;\n    uniform sampler2D uSampler1;\n    uniform int uDoTexturing;\n    \n    void main(void) {\n      if (uDoTexturing == 1) {\n        highp vec4 stoneColor = texture2D(uSampler0, vec2(vTextureCoord.st));\n        highp vec4 webglLogoColor = texture2D(uSampler1, vec2(vTextureCoord.st));\n        \n        // highp vec4 vColor = mix(stoneColor, webglLogoColor, 0.5);\n        highp vec4 vColor = mix(stoneColor, webglLogoColor, webglLogoColor.a);\n        // highp vec4 vColor = mix(stoneColor, webglLogoColor, 1.0 - webglLogoColor.a);\n        \n        gl_FragColor = vec4(vColor.xyz * vLight, vColor.a);\n      } else {\n        gl_FragColor = vec4(vec3(1.0, 0.1, 0.1) * vLight, 1.0);\n      }\n    }\n  ";l=U(e,t.VERTEX_SHADER),a=U(r,t.FRAGMENT_SHADER),n=t.createProgram(),t.attachShader(n,l),t.attachShader(n,a),t.linkProgram(n),t.getProgramParameter(n,t.LINK_STATUS)||alert("Unable to initialize the shader program.");t.useProgram(n)}(),function(){for(var e=[0,0,0,1,0,0,2,0,0,.5,1,0,1.5,1,0,1,2,0,0,0,-2,1,0,-2,2,0,-2,.5,1,-2,1.5,1,-2,1,2,-2],r=[0,1,3,1,4,3,1,2,4,3,4,5,6,9,7,7,9,10,7,10,8,9,11,10,0,3,6,3,9,6,3,5,9,5,11,9,2,8,4,4,8,10,4,10,5,5,10,11],o=[],i=[],n=0;n<r.length;++n){var a=r[n];o.push(e[3*a]),o.push(e[3*a+1]),o.push(e[3*a+2]),n>=24?(i.push(e[3*a+1]),i.push(e[3*a+2])):(i.push(e[3*a]),i.push(e[3*a+1]))}m=t.createBuffer(),t.bindBuffer(t.ARRAY_BUFFER,m),t.bufferData(t.ARRAY_BUFFER,new Float32Array(o),t.STATIC_DRAW),g=t.createBuffer(),t.bindBuffer(t.ARRAY_BUFFER,g),t.bufferData(t.ARRAY_BUFFER,new Float32Array(i),t.STATIC_DRAW);for(var l=[],u=0;u<r.length;u+=3){var c=r[u],v=r[u+1],h=r[u+2],x=[e[3*c]-e[3*v],e[3*c+1]-e[3*v+1],e[3*c+2]-e[3*v+2]],s=[e[3*c]-e[3*h],e[3*c+1]-e[3*h+1],e[3*c+2]-e[3*h+2]],p=[x[1]*s[2]-x[2]*s[1],x[2]*s[0]-x[0]*s[2],x[0]*s[1]-x[1]*s[0]];l.push.apply(l,p),l.push.apply(l,p),l.push.apply(l,p)}f=t.createBuffer(),t.bindBuffer(t.ARRAY_BUFFER,f),t.bufferData(t.ARRAY_BUFFER,new Float32Array(l),t.STATIC_DRAW)}(),n.pMatrixUniform=t.getUniformLocation(n,"uPMatrix"),n.mvMatrixUniform=t.getUniformLocation(n,"uMVMatrix"),n.samplerUniform0=t.getUniformLocation(n,"uSampler0"),n.samplerUniform1=t.getUniformLocation(n,"uSampler1"),n.normalMatrixUniform=t.getUniformLocation(n,"uNormalMatrix"),p[h]=new Image,p[h].onload=function(){C(0),t.uniform1i(n.samplerUniform0,0)},p[h].src="data/img/stone-128px.jpg",p[x]=new Image,p[x].onload=function(){C(1),t.uniform1i(n.samplerUniform1,1)},p[x].src="data/img/webgl_logo-512px.png",function e(){E||(!function(){t.clearColor(.1,.5,.1,1),t.clear(t.COLOR_BUFFER_BIT),t.enable(t.DEPTH_TEST),t.viewport(0,0,o.width,o.height),mat4.perspective(T,45,o.width/o.height,.1,100),mat4.identity(d),mat4.translate(d,d,[-1,-1,-7]),mat4.rotate(d,d,R,[0,1,0]),R+=.01;var e=mat3.create();mat3.fromMat4(e,d),mat3.invert(A,e),mat3.transpose(A,A)}(),t.uniformMatrix4fv(n.pMatrixUniform,!1,T),t.uniformMatrix4fv(n.mvMatrixUniform,!1,d),t.uniformMatrix3fv(n.normalMatrixUniform,!1,A),u=t.getAttribLocation(n,"aVertexPosition"),t.enableVertexAttribArray(u),t.bindBuffer(t.ARRAY_BUFFER,m),t.vertexAttribPointer(u,3,t.FLOAT,!1,0,0),c=t.getAttribLocation(n,"aVertexTexCoord"),t.enableVertexAttribArray(c),t.bindBuffer(t.ARRAY_BUFFER,g),t.vertexAttribPointer(c,2,t.FLOAT,!1,0,0),v=t.getAttribLocation(n,"aVertexNormal"),t.enableVertexAttribArray(v),t.bindBuffer(t.ARRAY_BUFFER,f),t.vertexAttribPointer(v,3,t.FLOAT,!1,0,0),t.drawArrays(t.TRIANGLES,0,48)),requestAnimationFrame(e)}())}),document.addEventListener("keyup",function(e){switch(e.keyCode){case 80:E=!E;break;case 84:(L=!L)?t.uniform1i(n.uDoTexturing,1):t.uniform1i(n.uDoTexturing,0);break;case 76:b=!b}})}},[[78,0]]]);
//# sourceMappingURL=webgl-triangular-prism-texture.js.map