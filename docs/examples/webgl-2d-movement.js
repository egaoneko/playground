(window.webpackJsonp=window.webpackJsonp||[]).push([[39],{39:function(e,r){var t=null,n=null,a=null,o=null,i=null,l=null,A=null,c=null,u=null,R=0;function d(e,r){var n=t.createShader(r);return t.shaderSource(n,e),t.compileShader(n),t.getShaderParameter(n,t.COMPILE_STATUS)||alert("Error compiling shader: "+t.getShaderInfoLog(n)),n}window.addEventListener("load",function(){n=document.querySelector("#canvas");try{t=n.getContext("webgl")||n.getContext("experimental-webgl")}catch(e){}t&&(!function(){var e="\n    attribute vec3 aVertexPosition;\n    attribute vec3 aVertexColor;\n    \n    varying highp vec4 vColor;\n    \n    void main(void) {\n      gl_Position = vec4(aVertexPosition, 1.0);\n      vColor = vec4(aVertexColor, 1.0);\n    }\n  ",r="\n    varying highp vec4 vColor;\n    \n    void main(void) {\n      gl_FragColor = vColor;\n    }\n  ";i=d(e,t.VERTEX_SHADER),o=d(r,t.FRAGMENT_SHADER),a=t.createProgram(),t.attachShader(a,i),t.attachShader(a,o),t.linkProgram(a),t.getProgramParameter(a,t.LINK_STATUS)||alert("Unable to initialize the shader program.");t.useProgram(a)}(),u=t.createBuffer(),t.bindBuffer(t.ARRAY_BUFFER,u),t.bufferData(t.ARRAY_BUFFER,new Float32Array([1,0,0,1,1,1,1,0,0,0,0,1,1,1,1,0,0,1]),t.STATIC_DRAW),function e(){t.clearColor(.1,.5,.1,1),t.clear(t.COLOR_BUFFER_BIT),t.viewport(0,0,n.width,n.height),function(){var e=Math.sin(R)/2,r=[-.5+e,.5,0,0+e,0,0,-.5+e,-.5,0,.5+e,.5,0,0+e,0,0,.5+e,-.5,0];R+=.01,A=t.createBuffer(),t.bindBuffer(t.ARRAY_BUFFER,A),t.bufferData(t.ARRAY_BUFFER,new Float32Array(r),t.DYNAMIC_DRAW)}(),l=t.getAttribLocation(a,"aVertexPosition"),t.enableVertexAttribArray(l),t.bindBuffer(t.ARRAY_BUFFER,A),t.vertexAttribPointer(l,3,t.FLOAT,!1,0,0),c=t.getAttribLocation(a,"aVertexColor"),t.enableVertexAttribArray(c),t.bindBuffer(t.ARRAY_BUFFER,u),t.vertexAttribPointer(c,3,t.FLOAT,!1,0,0),t.drawArrays(t.TRIANGLES,0,6),requestAnimationFrame(e)}())})}},[[39,0]]]);
//# sourceMappingURL=webgl-2d-movement.js.map