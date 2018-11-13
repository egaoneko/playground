(window.webpackJsonp=window.webpackJsonp||[]).push([[48],{49:function(e,r){var t=null,n=null,a=null,i=null,o=null,l=null,u=null,c=null,A=null,f=null,m=null,R=mat4.create(),d=mat4.create(),E=0;function g(e,r){var n=t.createShader(r);return t.shaderSource(n,e),t.compileShader(n),t.getShaderParameter(n,t.COMPILE_STATUS)||alert("Error compiling shader: "+t.getShaderInfoLog(n)),n}window.addEventListener("load",function(){n=document.querySelector("#canvas"),a=document.querySelector("#container"),n.width=a.clientWidth,n.height=a.clientHeight;try{t=n.getContext("webgl")||n.getContext("experimental-webgl")}catch(e){console.error(e)}t&&(!function(){var e="\n    attribute vec3 aVertexPosition;\n    attribute vec3 aVertexColor;\n\n    uniform mat4 uPMatrix;    \n    uniform mat4 uMVMatrix;\n    \n    varying highp vec4 vColor;\n    \n    void main(void) {\n      gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);\n      vColor = vec4(aVertexColor, 1.0);\n    }\n  ",r="\n    varying highp vec4 vColor;\n    \n    void main(void) {\n      gl_FragColor = vColor;\n    }\n  ";l=g(e,t.VERTEX_SHADER),o=g(r,t.FRAGMENT_SHADER),i=t.createProgram(),t.attachShader(i,l),t.attachShader(i,o),t.linkProgram(i),t.getProgramParameter(i,t.LINK_STATUS)||alert("Unable to initialize the shader program.");t.useProgram(i)}(),function(){f=t.createBuffer(),t.bindBuffer(t.ARRAY_BUFFER,f),t.bufferData(t.ARRAY_BUFFER,new Float32Array([0,0,1,1,1,1,0,0,1,0,0,1,0,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,1,1]),t.STATIC_DRAW);c=t.createBuffer(),t.bindBuffer(t.ARRAY_BUFFER,c),t.bufferData(t.ARRAY_BUFFER,new Float32Array([0,0,0,1,0,0,2,0,0,.5,1,0,1.5,1,0,1,2,0,0,0,-2,1,0,-2,2,0,-2,.5,1,-2,1.5,1,-2,1,2,-2]),t.STATIC_DRAW);var e=[0,1,3,1,3,4,1,2,4,3,4,5,6,7,9,7,9,10,7,8,10,9,10,11,0,3,6,3,6,9,3,5,9,5,9,11,2,4,8,4,8,10,4,5,10,5,10,11,0,6,8,8,2,0];(m=t.createBuffer()).numberVertexPoints=e.length,t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,m),t.bufferData(t.ELEMENT_ARRAY_BUFFER,new Uint16Array(e),t.STATIC_DRAW)}(),i.pMatrixUniform=t.getUniformLocation(i,"uPMatrix"),i.mvMatrixUniform=t.getUniformLocation(i,"uMVMatrix"),function e(){t.clearColor(.1,.5,.1,1),t.clear(t.COLOR_BUFFER_BIT),t.enable(t.DEPTH_TEST),t.viewport(0,0,n.width,n.height),mat4.perspective(R,45,n.width/n.height,.1,100),mat4.identity(d),mat4.translate(d,d,[-1,-1,-7]),mat4.rotate(d,d,E,[0,1,0]),E+=.01,t.uniformMatrix4fv(i.pMatrixUniform,!1,R),t.uniformMatrix4fv(i.mvMatrixUniform,!1,d),u=t.getAttribLocation(i,"aVertexPosition"),t.enableVertexAttribArray(u),t.bindBuffer(t.ARRAY_BUFFER,c),t.vertexAttribPointer(u,3,t.FLOAT,!1,0,0),A=t.getAttribLocation(i,"aVertexColor"),t.enableVertexAttribArray(A),t.bindBuffer(t.ARRAY_BUFFER,f),t.vertexAttribPointer(A,3,t.FLOAT,!1,0,0),t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,m),t.drawElements(t.TRIANGLES,m.numberVertexPoints,t.UNSIGNED_SHORT,0),requestAnimationFrame(e)}())})}},[[49,0]]]);
//# sourceMappingURL=webgl-triangular-prism.js.map