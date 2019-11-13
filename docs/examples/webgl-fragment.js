(window.webpackJsonp=window.webpackJsonp||[]).push([[54],{55:function(n,i){var e=null,o=null,t=null,r=null,a=null,c=null,v=null,l=null,h=null,g={circle:{vertexShader:"\n    attribute vec3 aVertexPosition;\n    varying vec2 position;\n    \n    void main(void) {\n      position = vec2(aVertexPosition.xy);\n      gl_Position = vec4(position, 0.0, 1.0);\n    }\n  ",fragmentShader:"\n    varying highp vec2 position;\n    \n    void main(void) {   \n      highp float d = length(position);\n      gl_FragColor = vec4(max(0.0, 1.0 - d), 0.0, 0.0, 1.0);\n    }\n  "},circle_floor:{vertexShader:"\n    attribute vec3 aVertexPosition;\n    varying vec2 position;\n    \n    void main(void) {\n      position = vec2(aVertexPosition.xy);\n      gl_Position = vec4(position, 0.0, 1.0);\n    }\n  ",fragmentShader:"\n    varying highp vec2 position;\n    \n    void main(void) {   \n      highp float d = length(position);\n      highp float c = floor(d*10.0) * 0.1;\n      gl_FragColor = vec4(max(0.0, 1.0 - c), 0.0, 0.0, 1.0);\n    }\n  "},circle_uniform_1:{vertexShader:"\n    attribute vec3 aVertexPosition;\n    varying vec2 position;\n    \n    void main(void) {\n      position = vec2(aVertexPosition.xy);\n      gl_Position = vec4(position, 0.0, 1.0);\n    }\n  ",fragmentShader:"\n    uniform sampler2D sColors;\n    varying highp vec2 position;\n    \n    void main(void) {   \n      highp float t = length(position);\n      gl_FragColor = vec4(texture2D(sColors, vec2(0.0, t)).rgb, 1.0);\n    }\n  "},circle_uniform_2:{vertexShader:"\n    attribute vec3 aVertexPosition;\n    varying vec2 position;\n    \n    void main(void) {\n      position = vec2(aVertexPosition.xy);\n      gl_Position = vec4(position, 0.0, 1.0);\n    }\n  ",fragmentShader:"\n    uniform sampler2D sColors;\n    varying highp vec2 position;\n    \n    void main(void) {   \n      highp float t = length(position);\n      highp float x = sin(-position.y) * tan(length(position.xx));\n      t = t + x;\n      gl_FragColor = mix( vec4(0.0, 0.0, 0.0, 1.0), vec4(texture2D(sColors, vec2(0.0, t)).rgb, 1.0), t);\n    }\n  "},mandelbrot:{vertexShader:"\n    attribute vec3 aVertexPosition;\n    varying vec2 position;\n    \n    void main(void) {\n      position = vec2(aVertexPosition.xy);\n      gl_Position = vec4(position, 0.0, 1.0);\n    }\n  ",fragmentShader:"\n    varying highp vec2 position;\n    const int MAX_ITERATIONS = 250;\n    const highp float LIGHTNESS_FACTOR = 10.0;\n    \n    void main(void) {   \n      highp vec2 c = vec2(position.x - 0.5, position.y); \n      highp vec2 z = c;\n      \n      highp vec4 color = vec4(0.0, 0.0, 0.0, 1.0);\n      \n      for (int i = 0; i < MAX_ITERATIONS; i++) {\n        z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;\n        \n        if (dot(z, z) > 4.0) {\n          highp float f = LIGHTNESS_FACTOR * float(i) / float(MAX_ITERATIONS);\n          color = vec4(vec3(0.1, 0.1, 1.0) * f , 1.0);\n          break;\n        }\n      }\n      gl_FragColor = color;\n    }\n  "},julia_1:{vertexShader:"\n    attribute vec3 aVertexPosition;\n    varying vec2 position;\n    \n    void main(void) {\n      position = vec2(aVertexPosition.xy);\n      gl_Position = vec4(position, 0.0, 1.0);\n    }\n  ",fragmentShader:"\n    varying highp vec2 position;\n    const int MAX_ITERATIONS = 250;\n    const highp float LIGHTNESS_FACTOR = 10.0;\n    \n    void main(void) {   \n      highp vec2 z = vec2(position.x, position.y);\n      highp vec2 c = vec2(-.8,-.2);\n      \n      highp vec4 color = vec4(0.0, 0.0, 0.0, 1.0);\n      \n      for (int i = 0; i < MAX_ITERATIONS; i++) {\n        z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;\n        \n        if (dot(z, z) > 4.0) {\n          highp float f = LIGHTNESS_FACTOR * float(i) / float(MAX_ITERATIONS);\n          color = vec4(vec3(0.1, 0.1, 1.0) * f , 1.0);\n          break;\n        }\n      }\n      gl_FragColor = color;\n    }\n  "},julia_2:{vertexShader:"\n    attribute vec3 aVertexPosition;\n    varying vec2 position;\n    \n    void main(void) {\n      position = vec2(aVertexPosition.xy);\n      gl_Position = vec4(position, 0.0, 1.0);\n    }\n  ",fragmentShader:"\n    varying highp vec2 position;\n    const int MAX_ITERATIONS = 250;\n    const highp float LIGHTNESS_FACTOR = 10.0;\n    \n    void main(void) {   \n      highp vec2 z = vec2(position.x, position.y);\n      highp vec2 c = vec2(-.5,-.62);\n      \n      highp vec4 color = vec4(0.0, 0.0, 0.0, 1.0);\n      \n      for (int i = 0; i < MAX_ITERATIONS; i++) {\n        z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;\n        \n        if (dot(z, z) > 4.0) {\n          highp float f = LIGHTNESS_FACTOR * float(i) / float(MAX_ITERATIONS);\n          color = vec4(vec3(0.1, 0.1, 1.0) * f , 1.0);\n          break;\n        }\n      }\n      gl_FragColor = color;\n    }\n  "}},s=document.querySelectorAll('input[type=radio][name="fragment"]');function d(){e.deleteProgram(r),p(this.value)}function p(n){(function(n,i){var o=g[i].vertexShader,t=g[i].fragmentShader;c=f(o,e.VERTEX_SHADER),a=f(t,e.FRAGMENT_SHADER),e.attachShader(n,c),e.attachShader(n,a),e.linkProgram(n),e.getProgramParameter(n,e.LINK_STATUS)||alert("Unable to initialize the shader program.")})(r=e.createProgram(),n),e.useProgram(r)}function f(n,i){var o=e.createShader(i);return e.shaderSource(o,n),e.compileShader(o),e.getShaderParameter(o,e.COMPILE_STATUS)||alert("Error compiling shader: "+e.getShaderInfoLog(o)),o}window.addEventListener("load",function(){o=document.querySelector("#canvas"),t=document.querySelector("#container"),o.width=t.clientWidth,o.height=t.clientHeight;try{e=o.getContext("webgl")||o.getContext("experimental-webgl")}catch(n){console.error(n)}e&&(p("circle"),function(n){void 0===n&&(n=2);var i=[0,0,0,-n/2,-n/2,0,n/2,-n/2,0,n/2,n/2,0,-n/2,n/2,0],o=[0,1,2,0,2,3,0,3,4,0,4,1];l=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,l),e.bufferData(e.ARRAY_BUFFER,new Float32Array(i),e.STATIC_DRAW),l.itemSize=3,l.numItems=i.length/3,h=e.createBuffer(),e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,h),e.bufferData(e.ELEMENT_ARRAY_BUFFER,new Uint16Array(o),e.STREAM_DRAW),h.itemSize=3,h.numItems=o.length}(),function(){var n=new Uint8Array([255,0,0,255,255,0,0,255,255,0,0,255,255,0,0,255,255,255,0,255,255,255,0,255,255,255,0,255,255,255,0,255,0,255,0,255,0,255,0,255,0,255,0,255,0,255,0,255,0,0,255,255,0,0,255,255,0,0,255,255,0,0,255,255]),i=e.createTexture();e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,i),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,4,4,0,e.RGBA,e.UNSIGNED_BYTE,n),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.uniform1i(e.getUniformLocation(r,"sColors"),i)}(),v=e.getAttribLocation(r,"aVertexPosition"),e.enableVertexAttribArray(v),function n(){e.clearColor(.7,.7,.7,1),e.clear(e.COLOR_BUFFER_BIT|e.DEPTH_BUFFER_BIT),e.enable(e.DEPTH_TEST),e.viewport(0,0,o.width,o.height),e.bindBuffer(e.ARRAY_BUFFER,l),e.vertexAttribPointer(v,3,e.FLOAT,!1,0,0),e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,h),e.drawElements(e.TRIANGLES,h.numItems,e.UNSIGNED_SHORT,0),requestAnimationFrame(n)}())}),Array.prototype.forEach.call(s,function(n){n.addEventListener("change",d)})}},[[55,0]]]);
//# sourceMappingURL=webgl-fragment.js.map