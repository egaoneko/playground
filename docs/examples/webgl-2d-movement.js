(window.webpackJsonp=window.webpackJsonp||[]).push([[47],{51:function(e,r){var t=null,n=null,a=null,o=null,i=null,l=null,c=null,A=null,u=null,d=null,h=0;function R(e,r){var n=t.createShader(r);return t.shaderSource(n,e),t.compileShader(n),t.getShaderParameter(n,t.COMPILE_STATUS)||alert("Error compiling shader: "+t.getShaderInfoLog(n)),n}window.addEventListener("load",function(){n=document.querySelector("#canvas"),a=document.querySelector("#container"),n.width=a.clientWidth,n.height=a.clientHeight;try{t=n.getContext("webgl")||n.getContext("experimental-webgl")}catch(e){console.error(e)}t&&(!function(){var e="\n    attribute vec3 aVertexPosition;\n    attribute vec3 aVertexColor;\n    \n    varying highp vec4 vColor;\n    \n    void main(void) {\n      gl_Position = vec4(aVertexPosition, 1.0);\n      vColor = vec4(aVertexColor, 1.0);\n    }\n  ",r="\n    varying highp vec4 vColor;\n    \n    void main(void) {\n      gl_FragColor = vColor;\n    }\n  ";l=R(e,t.VERTEX_SHADER),i=R(r,t.FRAGMENT_SHADER),o=t.createProgram(),t.attachShader(o,l),t.attachShader(o,i),t.linkProgram(o),t.getProgramParameter(o,t.LINK_STATUS)||alert("Unable to initialize the shader program.");t.useProgram(o)}(),d=t.createBuffer(),t.bindBuffer(t.ARRAY_BUFFER,d),t.bufferData(t.ARRAY_BUFFER,new Float32Array([1,0,0,1,1,1,1,0,0,0,0,1,1,1,1,0,0,1]),t.STATIC_DRAW),function e(){t.clearColor(.1,.5,.1,1),t.clear(t.COLOR_BUFFER_BIT),t.viewport(0,0,n.width,n.height),function(){var e=Math.sin(h)/2,r=[-.5+e,.5,0,0+e,0,0,-.5+e,-.5,0,.5+e,.5,0,0+e,0,0,.5+e,-.5,0];h+=.01,A=t.createBuffer(),t.bindBuffer(t.ARRAY_BUFFER,A),t.bufferData(t.ARRAY_BUFFER,new Float32Array(r),t.DYNAMIC_DRAW)}(),c=t.getAttribLocation(o,"aVertexPosition"),t.enableVertexAttribArray(c),t.bindBuffer(t.ARRAY_BUFFER,A),t.vertexAttribPointer(c,3,t.FLOAT,!1,0,0),u=t.getAttribLocation(o,"aVertexColor"),t.enableVertexAttribArray(u),t.bindBuffer(t.ARRAY_BUFFER,d),t.vertexAttribPointer(u,3,t.FLOAT,!1,0,0),t.drawArrays(t.TRIANGLES,0,6),requestAnimationFrame(e)}())})}},[[51,0]]]);
//# sourceMappingURL=webgl-2d-movement.js.map