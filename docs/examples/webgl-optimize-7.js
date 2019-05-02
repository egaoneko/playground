(window.webpackJsonp=window.webpackJsonp||[]).push([[61],{64:function(t,e){var r=null,i=null,o=null,a=null,n=null,m=null,u=null,s=null,f=null,l=[],h=[],c=[],E=0,T=null,v=null,x="texture_atlas.jpg",g=[[0,0,.5,.5],[.5,0,.5,.5],[0,.5,.25,.25],[0,.75,.25,.25],[.5,.5,.25,.25],[.5,.75,.25,.25]];x="data/img/"+x;for(var _=mat4.create(),d=mat4.create(),M=mat3.create(),p=null,A=250,R=2e4/A,L=!1,S=function(){this.x_offset_orig=10-20*Math.random(),this.y_offset_orig=10-20*Math.random(),this.z_offset_orig=12*Math.random()-25,this.x_offset=this.x_offset_orig,this.y_offset=this.y_offset_orig,this.z_offset=this.z_offset_orig,this.x_angle=360*Math.random(),this.y_angle=360*Math.random(),this.z_angle=360*Math.random(),this.angle=.005,this.radius=.1+.2*Math.random()},U=0;U<2e4;++U)c.push(new S);function P(t,e){var i=r.createShader(e);return r.shaderSource(i,t),r.compileShader(i),r.getShaderParameter(i,r.COMPILE_STATUS)||alert("Error compiling shader: "+r.getShaderInfoLog(i)),i}window.addEventListener("load",function(){i=document.querySelector("#canvas"),o=document.querySelector("#container"),i.width=o.clientWidth,i.height=o.clientHeight;try{r=i.getContext("webgl")||i.getContext("experimental-webgl")}catch(t){console.error(t)}if(r){!function(){var t="\n    attribute vec3 aVertexPosition;\n    attribute vec3 aVertexNormal;\n    attribute vec2 aVertexTexCoord;\n    \n    uniform mat3 uNormalMatrix;\n    uniform mat4 uMVMatrix;\n    uniform mat4 uPMatrix;\n    uniform float uCosTime;\n    uniform float uSinTime;\n    \n    varying highp float vLight;\n    varying highp vec2 vTextureCoord;\n    \n    void main(void) {\n      vec3 modifiedPosition = vec3(uCosTime + aVertexPosition.x, uSinTime+aVertexPosition.y, aVertexPosition.z + 4.0*uSinTime );\n      gl_Position = uPMatrix * uMVMatrix * vec4(modifiedPosition, 1.0);\n      vTextureCoord = aVertexTexCoord;\n      \n      vec3 pointLightPosition = vec3(1.0,2.0,-1.0);\n      vec3 pointLightDirection = normalize(vec3(pointLightPosition.xyz - modifiedPosition));\n      \n      vec3 L = vec3(uPMatrix * uMVMatrix * vec4(pointLightDirection, 1.0));\n      vec3 N = uNormalMatrix * aVertexNormal;\n      float lambert = max(dot(normalize(N), normalize(L)), 0.0);\n      vLight = 0.1 + lambert;\n    }\n  ",e="\n    varying highp float vLight;\n    varying highp vec2 vTextureCoord;\n    \n    uniform sampler2D uSampler;\n    \n    void main(void) {\n      highp vec4 textureColor = texture2D(uSampler, vec2(vTextureCoord.st));\n      gl_FragColor = vec4(textureColor.xyz * vLight, textureColor.a);\n    }\n  ";m=P(t,r.VERTEX_SHADER),n=P(e,r.FRAGMENT_SHADER),a=r.createProgram(),r.attachShader(a,m),r.attachShader(a,n),r.linkProgram(a),r.getProgramParameter(a,r.LINK_STATUS)||alert("Unable to initialize the shader program.");r.useProgram(a)}(),function(){!function(){p={vertices:[],uvs:[]};for(var t=0;t<=10;t++)for(var e=t*Math.PI/10,r=Math.sin(e),i=Math.cos(e),o=0;o<=10;o++){var a=2*o*Math.PI/10,n=Math.sin(a),m=Math.cos(a),u=m*r,s=i,f=n*r,l=1-o/10,h=t/10;p.vertices.push({x:u,y:s,z:f}),p.uvs.push({u:l,v:h})}}();for(var t=0;t<R;++t){for(var e=[],i=[],o=0;o<A;++o)for(var a=t*A+o,n=a%6,m=g[n][0],u=g[n][1],s=g[n][2],f=g[n][3],E=c[a].radius,T=0;T<=10;T++)for(var v=0;v<=10;v++){var x=10*o*11+11*T+v,_=x+10+1,d=p.vertices[11*T+v],M=p.uvs[11*T+v];e.push(E*d.x+c[a].x_offset_orig),e.push(E*d.y+c[a].y_offset_orig),e.push(E*d.z+c[a].z_offset_orig),e.push(d.x),e.push(d.y),e.push(d.z),e.push(M.u*s+m),e.push(M.v*f+u),T<10&&v<10&&(i.push(x),i.push(_),i.push(x+1),i.push(_),i.push(_+1),i.push(x+1))}l[t]=r.createBuffer(),r.bindBuffer(r.ARRAY_BUFFER,l[t]),r.bufferData(r.ARRAY_BUFFER,new Float32Array(e),r.STATIC_DRAW),l[t].itemSize=8,l[t].numItems=e.length/8,h[t]=r.createBuffer(),r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,h[t]),r.bufferData(r.ELEMENT_ARRAY_BUFFER,new Uint16Array(i),r.STREAM_DRAW),h[t].itemSize=3,h[t].numItems=i.length}}(),a.pMatrixUniform=r.getUniformLocation(a,"uPMatrix"),a.mvMatrixUniform=r.getUniformLocation(a,"uMVMatrix"),a.normalMatrixUniform=r.getUniformLocation(a,"uNormalMatrix"),a.samplerUniform=r.getUniformLocation(a,"uSampler"),a.cosTimeUniform=r.getUniformLocation(a,"uCosTime"),a.sinTimeUniform=r.getUniformLocation(a,"uSinTime"),(v=new Image).onload=function(){r.activeTexture(r.TEXTURE0),T=r.createTexture(),r.bindTexture(r.TEXTURE_2D,T),r.texImage2D(r.TEXTURE_2D,0,r.RGBA,r.RGBA,r.UNSIGNED_BYTE,v),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MAG_FILTER,r.NEAREST),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MIN_FILTER,r.NEAREST),r.generateMipmap(r.TEXTURE_2D),r.isTexture(T)||console.error("Error: Texture is invalid")},v.src=x,r.viewport(0,0,i.width,i.height),mat4.perspective(_,45,i.width/i.height,.1,100),r.uniformMatrix4fv(a.pMatrixUniform,!1,_),u=r.getAttribLocation(a,"aVertexPosition"),s=r.getAttribLocation(a,"aVertexNormal"),f=r.getAttribLocation(a,"aVertexTexCoord"),r.enableVertexAttribArray(u),r.enableVertexAttribArray(s),r.enableVertexAttribArray(f),mat4.identity(d),mat4.translate(d,d,[0,0,-5]),mat4.identity(M);var t=mat3.create();mat3.fromMat4(t,d),mat3.invert(M,t),mat3.transpose(M,M),r.uniformMatrix4fv(a.mvMatrixUniform,!1,d),r.uniformMatrix3fv(a.normalMatrixUniform,!1,M),function t(){L||(r.clearColor(.1,.5,.1,1),r.clear(r.COLOR_BUFFER_BIT|r.DEPTH_BUFFER_BIT),r.enable(r.DEPTH_TEST),function(){r.uniform1f(a.cosTimeUniform,Math.cos(E)),r.uniform1f(a.sinTimeUniform,Math.sin(E));for(var t=0;t<R;++t)r.bindBuffer(r.ARRAY_BUFFER,l[t]),r.vertexAttribPointer(u,3,r.FLOAT,!1,8*Float32Array.BYTES_PER_ELEMENT,0),r.vertexAttribPointer(s,3,r.FLOAT,!1,8*Float32Array.BYTES_PER_ELEMENT,3*Float32Array.BYTES_PER_ELEMENT),r.vertexAttribPointer(f,2,r.FLOAT,!1,8*Float32Array.BYTES_PER_ELEMENT,6*Float32Array.BYTES_PER_ELEMENT),r.drawElements(r.TRIANGLES,h[t].numItems,r.UNSIGNED_SHORT,0);E+=.01}()),requestAnimationFrame(t)}()}}),document.addEventListener("keyup",function(t){switch(t.keyCode){case 80:L=!L}})}},[[64,0]]]);
//# sourceMappingURL=webgl-optimize-7.js.map