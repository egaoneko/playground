(window.webpackJsonp=window.webpackJsonp||[]).push([[44],{48:function(r,e){var t=null,a=null,n=null,i=null,o=null,l=null,u=null,c=null,A=null,f=null,m=mat4.create(),d=mat4.create(),h=0;function v(r,e){var a=t.createShader(e);return t.shaderSource(a,r),t.compileShader(a),t.getShaderParameter(a,t.COMPILE_STATUS)||alert("Error compiling shader: "+t.getShaderInfoLog(a)),a}window.addEventListener("load",function(){a=document.querySelector("#canvas"),n=document.querySelector("#container"),a.width=n.clientWidth,a.height=n.clientHeight;try{t=a.getContext("webgl")||a.getContext("experimental-webgl")}catch(r){console.error(r)}t&&(!function(){var r="\n    attribute vec3 aVertexPosition;\n    attribute vec3 aVertexColor;\n\n    uniform mat4 uPMatrix;    \n    uniform mat4 uMVMatrix;\n    \n    varying highp vec4 vColor;\n    \n    void main(void) {\n      gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);\n      vColor = vec4(aVertexColor, 1.0);\n    }\n  ",e="\n    varying highp vec4 vColor;\n    \n    void main(void) {\n      gl_FragColor = vColor;\n    }\n  ";l=v(r,t.VERTEX_SHADER),o=v(e,t.FRAGMENT_SHADER),i=t.createProgram(),t.attachShader(i,l),t.attachShader(i,o),t.linkProgram(i),t.getProgramParameter(i,t.LINK_STATUS)||alert("Unable to initialize the shader program.");t.useProgram(i)}(),f=t.createBuffer(),t.bindBuffer(t.ARRAY_BUFFER,f),t.bufferData(t.ARRAY_BUFFER,new Float32Array([1,0,0,1,1,1,1,0,0,0,0,1,1,1,1,0,0,1]),t.STATIC_DRAW),i.pMatrixUniform=t.getUniformLocation(i,"uPMatrix"),i.mvMatrixUniform=t.getUniformLocation(i,"uMVMatrix"),function r(){t.clearColor(.1,.5,.1,1),t.clear(t.COLOR_BUFFER_BIT),t.viewport(0,0,a.width,a.height),mat4.perspective(m,45,a.width/a.height,.1,100),mat4.identity(d),mat4.translate(d,d,[0,0,-2]),function(){var r=Math.sin(h),e=[-1,.5,0+r,-.5,0,0+r,-1,-.5,0+r,1,.5,0-r,.5,0,0-r,1,-.5,0-r];h+=.01,c=t.createBuffer(),t.bindBuffer(t.ARRAY_BUFFER,c),t.bufferData(t.ARRAY_BUFFER,new Float32Array(e),t.DYNAMIC_DRAW)}(),t.uniformMatrix4fv(i.pMatrixUniform,!1,m),t.uniformMatrix4fv(i.mvMatrixUniform,!1,d),u=t.getAttribLocation(i,"aVertexPosition"),t.enableVertexAttribArray(u),t.bindBuffer(t.ARRAY_BUFFER,c),t.vertexAttribPointer(u,3,t.FLOAT,!1,0,0),A=t.getAttribLocation(i,"aVertexColor"),t.enableVertexAttribArray(A),t.bindBuffer(t.ARRAY_BUFFER,f),t.vertexAttribPointer(A,3,t.FLOAT,!1,0,0),t.drawArrays(t.TRIANGLES,0,6),requestAnimationFrame(r)}())})}},[[48,0]]]);
//# sourceMappingURL=webgl-3d-movement.js.map