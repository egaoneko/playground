(window.webpackJsonp=window.webpackJsonp||[]).push([[53],{56:function(t,e){for(var r=null,a=null,n=null,i=null,o=null,u=null,m=null,l=null,f=null,h=[],s=[],g=[],c=[],E=[],_=["sun.png","earth.jpg","mars.jpg","moon.jpg","jupiter.jpg","saturn.jpg"],x=[1,2,4,5],T=0;T<_.length;++T)_[T]="data/img/"+_[T];for(var v=mat4.create(),d=mat4.create(),M=mat3.create(),p=1500,A=!1,R=function(){this.x_offset_orig=10-20*Math.random(),this.y_offset_orig=10-20*Math.random(),this.z_offset_orig=12*Math.random()-25,this.x_offset=this.x_offset_orig,this.y_offset=this.y_offset_orig,this.z_offset=this.z_offset_orig,this.x_angle=360*Math.random(),this.y_angle=360*Math.random(),this.z_angle=360*Math.random(),this.angle=.005,this.radius=.1+.2*Math.random()},L=0;L<p;++L)g.push(new R);function S(t,e){var a=r.createShader(e);return r.shaderSource(a,t),r.compileShader(a),r.getShaderParameter(a,r.COMPILE_STATUS)||alert("Error compiling shader: "+r.getShaderInfoLog(a)),a}function U(t){mat4.identity(d),mat4.identity(M),mat4.translate(d,d,[t.x_offset,t.y_offset,t.z_offset]),mat4.rotate(d,d,t.angle,[t.x_angle,t.y_angle,t.z_angle]);var e=mat3.create();mat3.fromMat4(e,d),mat3.invert(M,e),mat3.transpose(M,M),t.x_angle+=Math.random(),t.y_angle+=Math.random(),t.z_angle+=Math.random(),t.x_offset=Math.cos(t.angle)*t.x_offset_orig,t.y_offset=Math.sin(t.angle)*t.y_offset_orig,t.z_offset=12*Math.sin(t.angle)-25,t.angle+=.005}function P(){r.uniformMatrix4fv(i.mvMatrixUniform,!1,d),r.uniformMatrix3fv(i.normalMatrixUniform,!1,M)}function y(t){E[t]=new Image,E[t].onload=function(){!function(t){r.activeTexture(r.TEXTURE0+t),c[t]=r.createTexture(),r.bindTexture(r.TEXTURE_2D,c[t]),r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,!0),r.texImage2D(r.TEXTURE_2D,0,r.RGBA,r.RGBA,r.UNSIGNED_BYTE,E[t]),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MAG_FILTER,r.NEAREST),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MIN_FILTER,r.NEAREST),r.isTexture(c[t])||console.error("Error: Texture is invalid")}(t)},E[t].src=_[t]}window.addEventListener("load",function(){a=document.querySelector("#canvas"),n=document.querySelector("#container"),a.width=n.clientWidth,a.height=n.clientHeight;try{r=a.getContext("webgl")||a.getContext("experimental-webgl")}catch(t){console.error(t)}r&&(!function(){var t="\n    attribute vec3 aVertexPosition;\n    attribute vec3 aVertexNormal;\n    attribute vec2 aVertexTexCoord;\n    \n    uniform mat3 uNormalMatrix;\n    uniform mat4 uMVMatrix;\n    uniform mat4 uPMatrix;\n    \n    varying highp float vLight;\n    varying highp vec2 vTextureCoord;\n    \n    void main(void) {\n      gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);\n      vTextureCoord = aVertexTexCoord;\n      \n      vec3 pointLightPosition = vec3(1.0,2.0,-1.0);\n      vec3 pointLightDirection = normalize(vec3(pointLightPosition.xyz - aVertexPosition.xyz));\n       \n      vec3 L = vec3(uPMatrix * uMVMatrix * vec4(pointLightDirection, 1.0));\n      vec3 N = uNormalMatrix * aVertexNormal;\n      float lambert = max(dot(normalize(N), normalize(L)), 0.0);\n      vLight = 0.1 + lambert;\n    }\n  ",e="\n    varying highp float vLight;\n    varying highp vec2 vTextureCoord;\n    \n    uniform sampler2D uSampler;\n    \n    void main(void) {\n      highp vec4 textureColor = texture2D(uSampler, vec2(vTextureCoord.st));\n      gl_FragColor = vec4(textureColor.xyz * vLight, textureColor.a);\n    }\n  ";u=S(t,r.VERTEX_SHADER),o=S(e,r.FRAGMENT_SHADER),i=r.createProgram(),r.attachShader(i,u),r.attachShader(i,o),r.linkProgram(i),r.getProgramParameter(i,r.LINK_STATUS)||alert("Unable to initialize the shader program.");r.useProgram(i)}(),function(){for(var t=0;t<p;++t){var e=1,a=0,n=t%_.length;-1!==x.indexOf(n)&&(a=.5,e=.5);for(var i=g[t].radius,o=[],u=[],m=0;m<=30;m++)for(var l=m*Math.PI/30,f=Math.sin(l),c=Math.cos(l),E=0;E<=30;E++){var T=2*E*Math.PI/30,v=Math.sin(T),d=Math.cos(T),M=d*f,A=c,R=v*f,L=1-E/30,S=m/30,U=31*m+E,P=U+30+1;o.push(i*M),o.push(i*A),o.push(i*R),o.push(M),o.push(A),o.push(R),o.push(1*L+0),o.push(S*e+a),m<30&&E<30&&(u.push(U),u.push(P),u.push(U+1),u.push(P),u.push(P+1),u.push(U+1))}h[t]=r.createBuffer(),r.bindBuffer(r.ARRAY_BUFFER,h[t]),r.bufferData(r.ARRAY_BUFFER,new Float32Array(o),r.STATIC_DRAW),h[t].itemSize=8,h[t].numItems=o.length/8,s[t]=r.createBuffer(),r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,s[t]),r.bufferData(r.ELEMENT_ARRAY_BUFFER,new Uint16Array(u),r.STREAM_DRAW),s[t].itemSize=3,s[t].numItems=u.length}}(),i.pMatrixUniform=r.getUniformLocation(i,"uPMatrix"),i.mvMatrixUniform=r.getUniformLocation(i,"uMVMatrix"),i.normalMatrixUniform=r.getUniformLocation(i,"uNormalMatrix"),i.samplerUniform=r.getUniformLocation(i,"uSampler"),function(){for(var t=0;t<_.length;++t)y(t);r.uniform1i(i.samplerUniform,c[0])}(),r.viewport(0,0,a.width,a.height),mat4.perspective(v,45,a.width/a.height,.1,100),r.uniformMatrix4fv(i.pMatrixUniform,!1,v),m=r.getAttribLocation(i,"aVertexPosition"),l=r.getAttribLocation(i,"aVertexNormal"),f=r.getAttribLocation(i,"aVertexTexCoord"),r.enableVertexAttribArray(m),r.enableVertexAttribArray(l),r.enableVertexAttribArray(f),function t(){A||(r.clearColor(.1,.5,.1,1),r.clear(r.COLOR_BUFFER_BIT|r.DEPTH_BUFFER_BIT),r.enable(r.DEPTH_TEST),function(){for(var t=0;t<p;++t){U(g[t]),P();var e=t%c.length;r.activeTexture(r.TEXTURE0+e),r.uniform1i(i.samplerUniform,e),r.bindBuffer(r.ARRAY_BUFFER,h[t]),r.vertexAttribPointer(m,3,r.FLOAT,!1,8*Float32Array.BYTES_PER_ELEMENT,0),r.vertexAttribPointer(l,3,r.FLOAT,!1,8*Float32Array.BYTES_PER_ELEMENT,3*Float32Array.BYTES_PER_ELEMENT),r.vertexAttribPointer(f,2,r.FLOAT,!1,8*Float32Array.BYTES_PER_ELEMENT,6*Float32Array.BYTES_PER_ELEMENT),r.drawElements(r.TRIANGLES,s[t].numItems,r.UNSIGNED_SHORT,0)}}()),requestAnimationFrame(t)}())}),document.addEventListener("keyup",function(t){switch(t.keyCode){case 80:A=!A}})}},[[56,0]]]);
//# sourceMappingURL=webgl-optimize-2.js.map