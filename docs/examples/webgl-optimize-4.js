(window.webpackJsonp=window.webpackJsonp||[]).push([[63],{64:function(t,e){var r=null,a=null,i=null,o=null,n=null,u=null,l=null,m=null,f=null,s=[],h=[],E=[],c=0,_=0,x=0,g=null,T=null,v="texture_atlas.jpg",d=[[0,0,.5,.5],[.5,0,.5,.5],[0,.5,.25,.25],[0,.75,.25,.25],[.5,.5,.25,.25],[.5,.75,.25,.25]];v="data/img/"+v;for(var M=mat4.create(),p=mat4.create(),A=mat3.create(),R=2e3,L=!1,S=function(){this.x_offset_orig=10-20*Math.random(),this.y_offset_orig=10-20*Math.random(),this.z_offset_orig=12*Math.random()-25,this.x_offset=this.x_offset_orig,this.y_offset=this.y_offset_orig,this.z_offset=this.z_offset_orig,this.x_angle=360*Math.random(),this.y_angle=360*Math.random(),this.z_angle=360*Math.random(),this.angle=.005,this.radius=.1+.2*Math.random()},y=0;y<R;++y)E.push(new S);function P(t,e){var a=r.createShader(e);return r.shaderSource(a,t),r.compileShader(a),r.getShaderParameter(a,r.COMPILE_STATUS)||alert("Error compiling shader: "+r.getShaderInfoLog(a)),a}function U(t){mat4.identity(p),mat4.identity(A),mat4.translate(p,p,[t.x_offset,t.y_offset,t.z_offset]),mat4.rotate(p,p,t.angle,[t.x_angle,t.y_angle,t.z_angle]);var e=mat3.create();mat3.fromMat4(e,p),mat3.invert(A,e),mat3.transpose(A,A),t.x_offset=_*t.x_offset_orig,t.y_offset=x*t.y_offset_orig,t.z_offset=12*x-25}function b(){r.uniformMatrix4fv(o.mvMatrixUniform,!1,p),r.uniformMatrix3fv(o.normalMatrixUniform,!1,A)}window.addEventListener("load",function(){a=document.querySelector("#canvas"),i=document.querySelector("#container"),a.width=i.clientWidth,a.height=i.clientHeight;try{r=a.getContext("webgl")||a.getContext("experimental-webgl")}catch(t){console.error(t)}r&&(!function(){var t="\n    attribute vec3 aVertexPosition;\n    attribute vec3 aVertexNormal;\n    attribute vec2 aVertexTexCoord;\n    \n    uniform mat3 uNormalMatrix;\n    uniform mat4 uMVMatrix;\n    uniform mat4 uPMatrix;\n    \n    varying highp float vLight;\n    varying highp vec2 vTextureCoord;\n    \n    void main(void) {\n      gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);\n      vTextureCoord = aVertexTexCoord;\n      \n      vec3 pointLightPosition = vec3(1.0,2.0,-1.0);\n      vec3 pointLightDirection = normalize(vec3(pointLightPosition.xyz - aVertexPosition.xyz));\n       \n      vec3 L = vec3(uPMatrix * uMVMatrix * vec4(pointLightDirection, 1.0));\n      vec3 N = uNormalMatrix * aVertexNormal;\n      float lambert = max(dot(normalize(N), normalize(L)), 0.0);\n      vLight = 0.1 + lambert;\n    }\n  ",e="\n    varying highp float vLight;\n    varying highp vec2 vTextureCoord;\n    \n    uniform sampler2D uSampler;\n    \n    void main(void) {\n      highp vec4 textureColor = texture2D(uSampler, vec2(vTextureCoord.st));\n      gl_FragColor = vec4(textureColor.xyz * vLight, textureColor.a);\n    }\n  ";u=P(t,r.VERTEX_SHADER),n=P(e,r.FRAGMENT_SHADER),o=r.createProgram(),r.attachShader(o,u),r.attachShader(o,n),r.linkProgram(o),r.getProgramParameter(o,r.LINK_STATUS)||alert("Unable to initialize the shader program.");r.useProgram(o)}(),function(){for(var t=0;t<R;++t){for(var e=t%6,a=d[e][0],i=d[e][1],o=d[e][2],n=d[e][3],u=E[t].radius,l=[],m=[],f=0;f<=30;f++)for(var c=f*Math.PI/30,_=Math.sin(c),x=Math.cos(c),g=0;g<=30;g++){var T=2*g*Math.PI/30,v=Math.sin(T),M=Math.cos(T),p=M*_,A=x,L=v*_,S=1-g/30,y=f/30,P=31*f+g,U=P+30+1;l.push(u*p),l.push(u*A),l.push(u*L),l.push(p),l.push(A),l.push(L),l.push(S*o+a),l.push(y*n+i),f<30&&g<30&&(m.push(P),m.push(U),m.push(P+1),m.push(U),m.push(U+1),m.push(P+1))}s[t]=r.createBuffer(),r.bindBuffer(r.ARRAY_BUFFER,s[t]),r.bufferData(r.ARRAY_BUFFER,new Float32Array(l),r.STATIC_DRAW),s[t].itemSize=8,s[t].numItems=l.length/8,h[t]=r.createBuffer(),r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,h[t]),r.bufferData(r.ELEMENT_ARRAY_BUFFER,new Uint16Array(m),r.STREAM_DRAW),h[t].itemSize=3,h[t].numItems=m.length}}(),o.pMatrixUniform=r.getUniformLocation(o,"uPMatrix"),o.mvMatrixUniform=r.getUniformLocation(o,"uMVMatrix"),o.normalMatrixUniform=r.getUniformLocation(o,"uNormalMatrix"),o.samplerUniform=r.getUniformLocation(o,"uSampler"),(T=new Image).onload=function(){r.activeTexture(r.TEXTURE0),g=r.createTexture(),r.bindTexture(r.TEXTURE_2D,g),r.texImage2D(r.TEXTURE_2D,0,r.RGBA,r.RGBA,r.UNSIGNED_BYTE,T),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MAG_FILTER,r.NEAREST),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MIN_FILTER,r.NEAREST),r.generateMipmap(r.TEXTURE_2D),r.isTexture(g)||console.error("Error: Texture is invalid")},T.src=v,r.viewport(0,0,a.width,a.height),mat4.perspective(M,45,a.width/a.height,.1,100),r.uniformMatrix4fv(o.pMatrixUniform,!1,M),l=r.getAttribLocation(o,"aVertexPosition"),m=r.getAttribLocation(o,"aVertexNormal"),f=r.getAttribLocation(o,"aVertexTexCoord"),r.enableVertexAttribArray(l),r.enableVertexAttribArray(m),r.enableVertexAttribArray(f),function t(){L||(r.clearColor(.1,.5,.1,1),r.clear(r.COLOR_BUFFER_BIT|r.DEPTH_BUFFER_BIT),r.enable(r.DEPTH_TEST),function(){_=Math.cos(c),x=Math.sin(c),c+=.05;for(var t=0;t<R;++t)U(E[t]),b(),r.bindBuffer(r.ARRAY_BUFFER,s[t]),r.vertexAttribPointer(l,3,r.FLOAT,!1,8*Float32Array.BYTES_PER_ELEMENT,0),r.vertexAttribPointer(m,3,r.FLOAT,!1,8*Float32Array.BYTES_PER_ELEMENT,3*Float32Array.BYTES_PER_ELEMENT),r.vertexAttribPointer(f,2,r.FLOAT,!1,8*Float32Array.BYTES_PER_ELEMENT,6*Float32Array.BYTES_PER_ELEMENT),r.drawElements(r.TRIANGLES,h[t].numItems,r.UNSIGNED_SHORT,0)}()),requestAnimationFrame(t)}())}),document.addEventListener("keyup",function(t){switch(t.keyCode){case 80:L=!L}})}},[[64,0]]]);
//# sourceMappingURL=webgl-optimize-4.js.map