(window.webpackJsonp=window.webpackJsonp||[]).push([[57],{60:function(t,e){var r=null,a=null,n=null,i=null,o=null,l=null,u=null,m=null,h=null,s=[],f=[],E=[],c=null,_=null,g="texture_atlas.jpg",x=[[0,0,.5,.5],[.5,0,.5,.5],[0,.5,.25,.25],[0,.75,.25,.25],[.5,.5,.25,.25],[.5,.75,.25,.25]];g="data/img/"+g;for(var T=mat4.create(),d=mat4.create(),v=mat3.create(),M=2e3,p=!1,A=function(){this.x_offset_orig=10-20*Math.random(),this.y_offset_orig=10-20*Math.random(),this.z_offset_orig=12*Math.random()-25,this.x_offset=this.x_offset_orig,this.y_offset=this.y_offset_orig,this.z_offset=this.z_offset_orig,this.x_angle=360*Math.random(),this.y_angle=360*Math.random(),this.z_angle=360*Math.random(),this.angle=.005,this.radius=.1+.2*Math.random()},R=0;R<M;++R)E.push(new A);function L(t,e){var a=r.createShader(e);return r.shaderSource(a,t),r.compileShader(a),r.getShaderParameter(a,r.COMPILE_STATUS)||alert("Error compiling shader: "+r.getShaderInfoLog(a)),a}function S(t){mat4.identity(d),mat4.identity(v),mat4.translate(d,d,[t.x_offset,t.y_offset,t.z_offset]),mat4.rotate(d,d,t.angle,[t.x_angle,t.y_angle,t.z_angle]);var e=mat3.create();mat3.fromMat4(e,d),mat3.invert(v,e),mat3.transpose(v,v),t.x_angle+=Math.random(),t.y_angle+=Math.random(),t.z_angle+=Math.random(),t.x_offset=Math.cos(t.angle)*t.x_offset_orig,t.y_offset=Math.sin(t.angle)*t.y_offset_orig,t.z_offset=12*Math.sin(t.angle)-25,t.angle+=.005}function y(){r.uniformMatrix4fv(i.mvMatrixUniform,!1,d),r.uniformMatrix3fv(i.normalMatrixUniform,!1,v)}window.addEventListener("load",function(){a=document.querySelector("#canvas"),n=document.querySelector("#container"),a.width=n.clientWidth,a.height=n.clientHeight;try{r=a.getContext("webgl")||a.getContext("experimental-webgl")}catch(t){console.error(t)}r&&(!function(){var t="\n    attribute vec3 aVertexPosition;\n    attribute vec3 aVertexNormal;\n    attribute vec2 aVertexTexCoord;\n    \n    uniform mat3 uNormalMatrix;\n    uniform mat4 uMVMatrix;\n    uniform mat4 uPMatrix;\n    \n    varying highp float vLight;\n    varying highp vec2 vTextureCoord;\n    \n    void main(void) {\n      gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);\n      vTextureCoord = aVertexTexCoord;\n      \n      vec3 pointLightPosition = vec3(1.0,2.0,-1.0);\n      vec3 pointLightDirection = normalize(vec3(pointLightPosition.xyz - aVertexPosition.xyz));\n       \n      vec3 L = vec3(uPMatrix * uMVMatrix * vec4(pointLightDirection, 1.0));\n      vec3 N = uNormalMatrix * aVertexNormal;\n      float lambert = max(dot(normalize(N), normalize(L)), 0.0);\n      vLight = 0.1 + lambert;\n    }\n  ",e="\n    varying highp float vLight;\n    varying highp vec2 vTextureCoord;\n    \n    uniform sampler2D uSampler;\n    \n    void main(void) {\n      highp vec4 textureColor = texture2D(uSampler, vec2(vTextureCoord.st));\n      gl_FragColor = vec4(textureColor.xyz * vLight, textureColor.a);\n    }\n  ";l=L(t,r.VERTEX_SHADER),o=L(e,r.FRAGMENT_SHADER),i=r.createProgram(),r.attachShader(i,l),r.attachShader(i,o),r.linkProgram(i),r.getProgramParameter(i,r.LINK_STATUS)||alert("Unable to initialize the shader program.");r.useProgram(i)}(),function(){for(var t=0;t<M;++t){for(var e=t%6,a=x[e][0],n=x[e][1],i=x[e][2],o=x[e][3],l=E[t].radius,u=[],m=[],h=0;h<=30;h++)for(var c=h*Math.PI/30,_=Math.sin(c),g=Math.cos(c),T=0;T<=30;T++){var d=2*T*Math.PI/30,v=Math.sin(d),p=Math.cos(d),A=p*_,R=g,L=v*_,S=1-T/30,y=h/30,P=31*h+T,U=P+30+1;u.push(l*A),u.push(l*R),u.push(l*L),u.push(A),u.push(R),u.push(L),u.push(S*i+a),u.push(y*o+n),h<30&&T<30&&(m.push(P),m.push(U),m.push(P+1),m.push(U),m.push(U+1),m.push(P+1))}s[t]=r.createBuffer(),r.bindBuffer(r.ARRAY_BUFFER,s[t]),r.bufferData(r.ARRAY_BUFFER,new Float32Array(u),r.STATIC_DRAW),s[t].itemSize=8,s[t].numItems=u.length/8,f[t]=r.createBuffer(),r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,f[t]),r.bufferData(r.ELEMENT_ARRAY_BUFFER,new Uint16Array(m),r.STREAM_DRAW),f[t].itemSize=3,f[t].numItems=m.length}}(),i.pMatrixUniform=r.getUniformLocation(i,"uPMatrix"),i.mvMatrixUniform=r.getUniformLocation(i,"uMVMatrix"),i.normalMatrixUniform=r.getUniformLocation(i,"uNormalMatrix"),i.samplerUniform=r.getUniformLocation(i,"uSampler"),(_=new Image).onload=function(){r.activeTexture(r.TEXTURE0),c=r.createTexture(),r.bindTexture(r.TEXTURE_2D,c),r.texImage2D(r.TEXTURE_2D,0,r.RGBA,r.RGBA,r.UNSIGNED_BYTE,_),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MAG_FILTER,r.NEAREST),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MIN_FILTER,r.NEAREST),r.generateMipmap(r.TEXTURE_2D),r.isTexture(c)||console.error("Error: Texture is invalid")},_.src=g,r.viewport(0,0,a.width,a.height),mat4.perspective(T,45,a.width/a.height,.1,100),r.uniformMatrix4fv(i.pMatrixUniform,!1,T),u=r.getAttribLocation(i,"aVertexPosition"),m=r.getAttribLocation(i,"aVertexNormal"),h=r.getAttribLocation(i,"aVertexTexCoord"),r.enableVertexAttribArray(u),r.enableVertexAttribArray(m),r.enableVertexAttribArray(h),function t(){p||(r.clearColor(.1,.5,.1,1),r.clear(r.COLOR_BUFFER_BIT|r.DEPTH_BUFFER_BIT),r.enable(r.DEPTH_TEST),function(){for(var t=0;t<M;++t)S(E[t]),y(),r.bindBuffer(r.ARRAY_BUFFER,s[t]),r.vertexAttribPointer(u,3,r.FLOAT,!1,8*Float32Array.BYTES_PER_ELEMENT,0),r.vertexAttribPointer(m,3,r.FLOAT,!1,8*Float32Array.BYTES_PER_ELEMENT,3*Float32Array.BYTES_PER_ELEMENT),r.vertexAttribPointer(h,2,r.FLOAT,!1,8*Float32Array.BYTES_PER_ELEMENT,6*Float32Array.BYTES_PER_ELEMENT),r.drawElements(r.TRIANGLES,f[t].numItems,r.UNSIGNED_SHORT,0)}()),requestAnimationFrame(t)}())}),document.addEventListener("keyup",function(t){switch(t.keyCode){case 80:p=!p}})}},[[60,0]]]);
//# sourceMappingURL=webgl-optimize-3.js.map