(window.webpackJsonp=window.webpackJsonp||[]).push([[50],{54:function(t,e){for(var r=null,a=null,n=null,i=null,o=null,f=null,u=null,m=null,l=null,h=[],s=[],g=[],c=[],_=[],x=[],v=[],d=["sun.png","earth.jpg","mars.jpg","moon.jpg","jupiter.jpg","saturn.jpg"],A=[1,2,4,5],E=0;E<d.length;++E)d[E]="data/img/"+d[E];for(var R=mat4.create(),T=mat4.create(),p=mat3.create(),M=1e3,U=!1,F=function(){this.x_offset_orig=10-20*Math.random(),this.y_offset_orig=10-20*Math.random(),this.z_offset_orig=12*Math.random()-25,this.x_offset=this.x_offset_orig,this.y_offset=this.y_offset_orig,this.z_offset=this.z_offset_orig,this.x_angle=360*Math.random(),this.y_angle=360*Math.random(),this.z_angle=360*Math.random(),this.angle=.005,this.radius=.1+.2*Math.random()},b=0;b<M;++b)_.push(new F);function S(t,e){var a=r.createShader(e);return r.shaderSource(a,t),r.compileShader(a),r.getShaderParameter(a,r.COMPILE_STATUS)||alert("Error compiling shader: "+r.getShaderInfoLog(a)),a}function L(t){mat4.identity(T),mat4.identity(p),mat4.translate(T,T,[t.x_offset,t.y_offset,t.z_offset]),mat4.rotate(T,T,t.angle,[t.x_angle,t.y_angle,t.z_angle]);var e=mat3.create();mat3.fromMat4(e,T),mat3.invert(p,e),mat3.transpose(p,p),t.x_angle+=Math.random(),t.y_angle+=Math.random(),t.z_angle+=Math.random(),t.x_offset=Math.cos(t.angle)*t.x_offset_orig,t.y_offset=Math.sin(t.angle)*t.y_offset_orig,t.z_offset=12*Math.sin(t.angle)-25,t.angle+=.005}function y(){r.uniformMatrix4fv(i.pMatrixUniform,!1,R),r.uniformMatrix4fv(i.mvMatrixUniform,!1,T),r.uniformMatrix3fv(i.normalMatrixUniform,!1,p)}function B(t){v[t]=new Image,v[t].onload=function(){!function(t){r.activeTexture(r.TEXTURE0+t),x[t]=r.createTexture(),r.bindTexture(r.TEXTURE_2D,x[t]),r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,!0),r.texImage2D(r.TEXTURE_2D,0,r.RGBA,r.RGBA,r.UNSIGNED_BYTE,v[t]),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MAG_FILTER,r.NEAREST),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MIN_FILTER,r.NEAREST),r.isTexture(x[t])||console.error("Error: Texture is invalid")}(t)},v[t].src=d[t]}window.addEventListener("load",function(){a=document.querySelector("#canvas"),n=document.querySelector("#container"),a.width=n.clientWidth,a.height=n.clientHeight;try{r=a.getContext("webgl")||a.getContext("experimental-webgl")}catch(t){console.error(t)}r&&(!function(){var t="\n    attribute vec3 aVertexPosition;\n    attribute vec3 aVertexNormal;\n    attribute vec2 aVertexTexCoord;\n    \n    uniform mat3 uNormalMatrix;\n    uniform mat4 uMVMatrix;\n    uniform mat4 uPMatrix;\n    \n    varying highp float vLight;\n    varying highp vec2 vTextureCoord;\n    \n    void main(void) {\n      gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);\n      vTextureCoord = aVertexTexCoord;\n      \n      vec3 pointLightPosition = vec3(1.0,2.0,-1.0);\n      vec3 pointLightDirection = normalize(vec3(pointLightPosition.xyz - aVertexPosition.xyz));\n       \n      vec3 L = vec3(uPMatrix * uMVMatrix * vec4(pointLightDirection, 1.0));\n      vec3 N = uNormalMatrix * aVertexNormal;\n      float lambert = max(dot(normalize(N), normalize(L)), 0.0);\n      vLight = 0.1 + lambert;\n    }\n  ",e="\n    varying highp float vLight;\n    varying highp vec2 vTextureCoord;\n    \n    uniform sampler2D uSampler;\n    \n    void main(void) {\n      highp vec4 textureColor = texture2D(uSampler, vec2(vTextureCoord.st));\n      gl_FragColor = vec4(textureColor.xyz * vLight, textureColor.a);\n    }\n  ";f=S(t,r.VERTEX_SHADER),o=S(e,r.FRAGMENT_SHADER),i=r.createProgram(),r.attachShader(i,f),r.attachShader(i,o),r.linkProgram(i),r.getProgramParameter(i,r.LINK_STATUS)||alert("Unable to initialize the shader program.");r.useProgram(i)}(),function(){for(var t=0;t<M;++t){var e=1,a=0,n=t%d.length;-1!==A.indexOf(n)&&(a=.5,e=.5);for(var i=_[t].radius,o=[],f=[],u=[],m=[],l=0;l<=30;l++)for(var x=l*Math.PI/30,v=Math.sin(x),E=Math.cos(x),R=0;R<=30;R++){var T=2*R*Math.PI/30,p=Math.sin(T),U=Math.cos(T),F=U*v,b=E,S=p*v,L=1-R/30,y=l/30;f.push(F),f.push(b),f.push(S),u.push(1*L+0),u.push(y*e+a),o.push(i*F),o.push(i*b),o.push(i*S)}for(var B=0;B<30;B++)for(var P=0;P<30;P++){var I=31*B+P,D=I+30+1;m.push(I),m.push(D),m.push(I+1),m.push(D),m.push(D+1),m.push(I+1)}s[t]=r.createBuffer(),r.bindBuffer(r.ARRAY_BUFFER,s[t]),r.bufferData(r.ARRAY_BUFFER,new Float32Array(f),r.STATIC_DRAW),s[t].itemSize=3,s[t].numItems=f.length/3,g[t]=r.createBuffer(),r.bindBuffer(r.ARRAY_BUFFER,g[t]),r.bufferData(r.ARRAY_BUFFER,new Float32Array(u),r.STATIC_DRAW),g[t].itemSize=2,g[t].numItems=u.length/2,h[t]=r.createBuffer(),r.bindBuffer(r.ARRAY_BUFFER,h[t]),r.bufferData(r.ARRAY_BUFFER,new Float32Array(o),r.STATIC_DRAW),h[t].itemSize=3,h[t].numItems=o.length/3,c[t]=r.createBuffer(),r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,c[t]),r.bufferData(r.ELEMENT_ARRAY_BUFFER,new Uint16Array(m),r.STREAM_DRAW),c[t].itemSize=3,c[t].numItems=m.length}}(),i.pMatrixUniform=r.getUniformLocation(i,"uPMatrix"),i.mvMatrixUniform=r.getUniformLocation(i,"uMVMatrix"),i.normalMatrixUniform=r.getUniformLocation(i,"uNormalMatrix"),i.samplerUniform=r.getUniformLocation(i,"uSampler"),function(){for(var t=0;t<d.length;++t)B(t);r.uniform1i(i.samplerUniform,x[0])}(),function t(){U||(r.clearColor(.1,.5,.1,1),r.clear(r.COLOR_BUFFER_BIT|r.DEPTH_BUFFER_BIT),r.enable(r.DEPTH_TEST),r.viewport(0,0,a.width,a.height),mat4.perspective(R,45,a.width/a.height,.1,100),function(){for(var t=0;t<M;++t){L(_[t]),y();var e=t%x.length;u=r.getAttribLocation(i,"aVertexPosition"),r.enableVertexAttribArray(u),r.bindBuffer(r.ARRAY_BUFFER,h[t]),r.vertexAttribPointer(u,3,r.FLOAT,!1,0,0),m=r.getAttribLocation(i,"aVertexNormal"),r.enableVertexAttribArray(m),r.bindBuffer(r.ARRAY_BUFFER,s[t]),r.vertexAttribPointer(m,3,r.FLOAT,!1,0,0),l=r.getAttribLocation(i,"aVertexTexCoord"),r.activeTexture(r.TEXTURE0+e),r.uniform1i(i.samplerUniform,e),r.enableVertexAttribArray(l),r.bindBuffer(r.ARRAY_BUFFER,g[t]),r.vertexAttribPointer(l,2,r.FLOAT,!1,0,0),r.drawElements(r.TRIANGLES,c[t].numItems,r.UNSIGNED_SHORT,0)}}()),requestAnimationFrame(t)}())}),document.addEventListener("keyup",function(t){switch(t.keyCode){case 80:U=!U}})}},[[54,0]]]);
//# sourceMappingURL=webgl-optimize-0.js.map