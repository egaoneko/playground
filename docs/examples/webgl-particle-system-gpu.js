(window.webpackJsonp=window.webpackJsonp||[]).push([[68],{69:function(e,t){var r=null,a=null,i=null,n=null,o=null,m=null,c=null,l=null,u=[],h=7,f=null,s=mat4.create(),d=mat4.create(),p=mat3.create(),E=!1,T=1e4,x=10,g=240,v=-10,A=0,P=new Date;function M(e,t){var a=r.createShader(t);return r.shaderSource(a,e),r.compileShader(a),r.getShaderParameter(a,r.COMPILE_STATUS)||alert("Error compiling shader: "+r.getShaderInfoLog(a)),a}function S(){var e=u.slice();u=[];for(var t=0;t<e.length;t+=h)if(e[t+3]<g&&e[t+1]>v-.001){var r=e.slice(t,t+h);r[3]+=1,u=u.concat(r)}if((A=u.length/h)+x<T)for(var a=0;a<x;++a)u.push(.5*Math.random()-.25),u.push(v),u.push(Math.random()-.5),u.push(0),u.push(5*Math.random()-10),u.push(14+12*Math.random()),u.push(.5+4*Math.random()),++A}window.addEventListener("load",function(){a=document.querySelector("#canvas"),i=document.querySelector("#container"),a.width=i.clientWidth,a.height=i.clientHeight;try{r=a.getContext("webgl")||a.getContext("experimental-webgl")}catch(e){console.error(e)}r&&(!function(){var e="\n    attribute vec4 aVertexPosition;\n    attribute vec4 aVertexVelocity;\n    \n    uniform mat4 uPMatrix;\n    uniform mat4 uMVMatrix;\n    \n    varying highp float parametricTime;\n    \n    void main(void) {\n      parametricTime = (aVertexPosition.w/100.0);\n      \n      vec3 currentPosition = vec3(\n        aVertexPosition.x + (aVertexVelocity.x * parametricTime),\n        aVertexPosition.y + (aVertexVelocity.y * parametricTime),\n        aVertexPosition.z + (aVertexVelocity.x * parametricTime)\n      );\n      \n      currentPosition.y -= 4.9*parametricTime*parametricTime;\n      \n      gl_Position = uPMatrix * uMVMatrix * vec4(currentPosition.xyz, 1.0);\n      gl_PointSize = aVertexVelocity.z;\n    }\n  ",t="\n    varying highp float parametricTime;\n    \n    void main(void) {   \n      gl_FragColor = vec4(parametricTime*.8, parametricTime*.8, 1.0, 0.9-(parametricTime*.4));\n    }\n  ";m=M(e,r.VERTEX_SHADER),o=M(t,r.FRAGMENT_SHADER),n=r.createProgram(),r.attachShader(n,m),r.attachShader(n,o),r.linkProgram(n),r.getProgramParameter(n,r.LINK_STATUS)||alert("Unable to initialize the shader program.");r.useProgram(n)}(),n.pMatrixUniform=r.getUniformLocation(n,"uPMatrix"),n.mvMatrixUniform=r.getUniformLocation(n,"uMVMatrix"),n.timeUniform=r.getUniformLocation(n,"uTime"),c=r.getAttribLocation(n,"aVertexPosition"),l=r.getAttribLocation(n,"aVertexVelocity"),r.enableVertexAttribArray(c),r.enableVertexAttribArray(l),S(),f=r.createBuffer(),function e(){E||(!function(){r.clearColor(.1,.1,.1,1),r.clear(r.COLOR_BUFFER_BIT),r.enable(r.DEPTH_TEST),r.enable(r.BLEND),r.blendFunc(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA),r.viewport(0,0,a.width,a.height),mat4.perspective(s,45,a.width/a.height,.1,100),mat4.identity(d),mat4.translate(d,d,[0,-5,-30]);var e=mat3.create();mat3.fromMat4(e,d),mat3.invert(p,e),mat3.transpose(p,p)}(),r.uniformMatrix4fv(n.pMatrixUniform,!1,s),r.uniformMatrix4fv(n.mvMatrixUniform,!1,d),r.uniform1f(n.timeUniform,P.getTime()),f.itemSize=h,f.numItems=A,r.bindBuffer(r.ARRAY_BUFFER,f),r.bufferData(r.ARRAY_BUFFER,new Float32Array(u),r.STATIC_DRAW),r.vertexAttribPointer(c,4,r.FLOAT,!1,h*Float32Array.BYTES_PER_ELEMENT,0*Float32Array.BYTES_PER_ELEMENT),r.vertexAttribPointer(l,3,r.FLOAT,!1,h*Float32Array.BYTES_PER_ELEMENT,4*Float32Array.BYTES_PER_ELEMENT),r.drawArrays(r.POINTS,0,A),S()),requestAnimationFrame(e)}())}),document.addEventListener("keyup",function(e){switch(e.keyCode){case 80:E=!E}})}},[[69,0]]]);
//# sourceMappingURL=webgl-particle-system-gpu.js.map