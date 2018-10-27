(window.webpackJsonp=window.webpackJsonp||[]).push([[43],{43:function(e,r){var t=null,o=null,n=null,i=null,a=null,l=null,u=null,m=null,c=null,g=null,v=null,f=0,h=1,x=[],p=[],s=mat4.create(),T=mat4.create(),d=mat3.create(),A=0,R=!1,E=!1,L=!1;function b(e,r){var o=t.createShader(r);return t.shaderSource(o,e),t.compileShader(o),t.getShaderParameter(o,t.COMPILE_STATUS)||alert("Error compiling shader: "+t.getShaderInfoLog(o)),o}function U(e){t.activeTexture(t.TEXTURE0+e),x[e]=t.createTexture(),t.bindTexture(t.TEXTURE_2D,x[e]),t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,!0),t.texImage2D(t.TEXTURE_2D,0,t.RGBA,t.RGBA,t.UNSIGNED_BYTE,p[e]),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.NEAREST),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.NEAREST),n.uDoTexturing=t.getUniformLocation(n,"uDoTexturing"),t.uniform1i(n.uDoTexturing,1),t.isTexture(x[e])||console.error("Error: Texture is invalid")}window.addEventListener("load",function(){o=document.querySelector("#canvas"),container=document.querySelector("#container"),o.width=container.clientWidth,o.height=container.clientHeight;try{t=o.getContext("webgl")||o.getContext("experimental-webgl")}catch(e){}t&&(!function(){var e="\n    attribute vec3 aVertexPosition;\n    attribute vec2 aVertexTexCoord;\n    attribute vec3 aVertexNormal;\n\n    uniform mat4 uPMatrix;    \n    uniform mat4 uMVMatrix;\n    uniform mat3 uNormalMatrix;\n    \n    varying highp vec2 vTextureCoord;\n    varying highp vec3 vLight;\n    \n    void main(void) {\n      gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);\n      vTextureCoord = aVertexTexCoord;\n      \n      // lighting\n      vec3 ambientLight = vec3(0.3, 0.3, 0.3);\n      vec3 transformedNormal = uNormalMatrix * aVertexNormal;\n      vec3 lightColor = vec3(0.5, 0.5, 0.5);\n      \n      // vec3 directionalLightPosition = normalize(vec3(10.0, 10.0, 5.0));\n      // vec3 light = vec3(uPMatrix * uMVMatrix * vec4(directionalLightPosition, 1.0));\n      \n      vec3 pointLightPosition = vec3(1.0,2.0,-1.0);\n      vec3 pointLightDirection = normalize(vec3(pointLightPosition.xyz - aVertexPosition.xyz));\n      vec3 light = vec3(uPMatrix * uMVMatrix * vec4(pointLightDirection, 1.0));\n      \n      float diffuseLightAmount = max(dot(normalize(transformedNormal), normalize(light)), 0.0);\n      vLight = ambientLight + (diffuseLightAmount * lightColor);\n    }\n  ",r="\n    varying highp vec2 vTextureCoord;\n    varying highp vec3 vLight;\n    \n    uniform sampler2D uSampler0;\n    uniform sampler2D uSampler1;\n    uniform int uDoTexturing;\n    \n    void main(void) {\n      if (uDoTexturing == 1) {\n        highp vec4 stoneColor = texture2D(uSampler0, vec2(vTextureCoord.st));\n        highp vec4 webglLogoColor = texture2D(uSampler1, vec2(vTextureCoord.st));\n        \n        // highp vec4 vColor = mix(stoneColor, webglLogoColor, 0.5);\n        highp vec4 vColor = mix(stoneColor, webglLogoColor, webglLogoColor.a);\n        // highp vec4 vColor = mix(stoneColor, webglLogoColor, 1.0 - webglLogoColor.a);\n        \n        gl_FragColor = vec4(vColor.xyz * vLight, vColor.a);\n      } else {\n        gl_FragColor = vec4(vec3(1.0, 0.1, 0.1) * vLight, 1.0);\n      }\n    }\n  ";a=b(e,t.VERTEX_SHADER),i=b(r,t.FRAGMENT_SHADER),n=t.createProgram(),t.attachShader(n,a),t.attachShader(n,i),t.linkProgram(n),t.getProgramParameter(n,t.LINK_STATUS)||alert("Unable to initialize the shader program.");t.useProgram(n)}(),function(){for(var e=[0,0,0,1,0,0,2,0,0,.5,1,0,1.5,1,0,1,2,0,0,0,-2,1,0,-2,2,0,-2,.5,1,-2,1.5,1,-2,1,2,-2],r=[0,1,3,1,4,3,1,2,4,3,4,5,6,9,7,7,9,10,7,10,8,9,11,10,0,3,6,3,9,6,3,5,9,5,11,9,2,8,4,4,8,10,4,10,5,5,10,11],o=[],n=[],i=0;i<r.length;++i){var a=r[i];o.push(e[3*a]),o.push(e[3*a+1]),o.push(e[3*a+2]),i>=24?(n.push(e[3*a+1]),n.push(e[3*a+2])):(n.push(e[3*a]),n.push(e[3*a+1]))}u=t.createBuffer(),t.bindBuffer(t.ARRAY_BUFFER,u),t.bufferData(t.ARRAY_BUFFER,new Float32Array(o),t.STATIC_DRAW),c=t.createBuffer(),t.bindBuffer(t.ARRAY_BUFFER,c),t.bufferData(t.ARRAY_BUFFER,new Float32Array(n),t.STATIC_DRAW);for(var l=[],m=0;m<r.length;m+=3){var g=r[m],f=r[m+1],h=r[m+2],x=[e[3*g]-e[3*f],e[3*g+1]-e[3*f+1],e[3*g+2]-e[3*f+2]],p=[e[3*g]-e[3*h],e[3*g+1]-e[3*h+1],e[3*g+2]-e[3*h+2]],s=[x[1]*p[2]-x[2]*p[1],x[2]*p[0]-x[0]*p[2],x[0]*p[1]-x[1]*p[0]];l.push.apply(l,s),l.push.apply(l,s),l.push.apply(l,s)}v=t.createBuffer(),t.bindBuffer(t.ARRAY_BUFFER,v),t.bufferData(t.ARRAY_BUFFER,new Float32Array(l),t.STATIC_DRAW)}(),n.pMatrixUniform=t.getUniformLocation(n,"uPMatrix"),n.mvMatrixUniform=t.getUniformLocation(n,"uMVMatrix"),n.samplerUnifrom0=t.getUniformLocation(n,"uSampler0"),n.samplerUnifrom1=t.getUniformLocation(n,"uSampler1"),n.normalMatrixUniform=t.getUniformLocation(n,"uNormalMatrix"),p[f]=new Image,p[f].onload=function(){U(0),t.uniform1i(n.samplerUnifrom0,0)},p[f].src="data/img/stone-128px.jpg",p[h]=new Image,p[h].onload=function(){U(1),t.uniform1i(n.samplerUnifrom1,1)},p[h].src="data/img/webgl_logo-512px.png",function e(){R||(!function(){t.clearColor(.1,.5,.1,1),t.clear(t.COLOR_BUFFER_BIT),t.enable(t.DEPTH_TEST),t.viewport(0,0,o.width,o.height),mat4.perspective(s,45,o.width/o.height,.1,100),mat4.identity(T),mat4.translate(T,T,[-1,-1,-7]),mat4.rotate(T,T,A,[0,1,0]),A+=.01;var e=mat3.create();mat3.fromMat4(e,T),mat3.invert(d,e),mat3.transpose(d,d)}(),t.uniformMatrix4fv(n.pMatrixUniform,!1,s),t.uniformMatrix4fv(n.mvMatrixUniform,!1,T),t.uniformMatrix3fv(n.normalMatrixUniform,!1,d),l=t.getAttribLocation(n,"aVertexPosition"),t.enableVertexAttribArray(l),t.bindBuffer(t.ARRAY_BUFFER,u),t.vertexAttribPointer(l,3,t.FLOAT,!1,0,0),m=t.getAttribLocation(n,"aVertexTexCoord"),t.enableVertexAttribArray(m),t.bindBuffer(t.ARRAY_BUFFER,c),t.vertexAttribPointer(m,2,t.FLOAT,!1,0,0),g=t.getAttribLocation(n,"aVertexNormal"),t.enableVertexAttribArray(g),t.bindBuffer(t.ARRAY_BUFFER,v),t.vertexAttribPointer(g,3,t.FLOAT,!1,0,0),t.drawArrays(t.TRIANGLES,0,48)),requestAnimationFrame(e)}())}),document.addEventListener("keyup",function(e){switch(e.keyCode){case 80:R=!R;break;case 84:(E=!E)?t.uniform1i(n.uDoTexturing,1):t.uniform1i(n.uDoTexturing,0);break;case 76:L=!L}})}},[[43,0]]]);
//# sourceMappingURL=webgl-triangular-prism-texture.js.map