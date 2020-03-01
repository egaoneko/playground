(window.webpackJsonp=window.webpackJsonp||[]).push([[59],{60:function(e,n){var r=null,t=null,i=null,o=null,a=null,l=null,u=null,m=null,c=null,f=null,s=null,g=null,h=null,E=null,d={no_effect:[0,0,0,0,1,0,0,0,0],sharpen1:[0,-1,0,-1,4,-1,0,-1,0],sharpen2:[-1,-1,-1,-1,8,-1,-1,-1,-1],sobel_edges_y:[-1,0,1,-2,0,2,-1,0,1],sobel_edges_x:[-1,-2,-1,0,0,0,1,2,1],sobel_both:[-2,-2,0,-2,0,2,0,2,2],blur:[1,1,1,1,1,1,1,1,1],gaussian_blur:[.045,.122,.045,.122,.332,.122,.045,.122,.045],edge_detect:[0,1,0,1,-4,1,0,1,0],emboss1:[-1,-1,0,-1,0,1,0,1,1],emboss2:[1,1,0,1,0,-1,0,-1,-1],emboss3:[0,-1,-1,1,0,-1,1,1,0],emboss4:[0,1,1,-1,0,1,-1,-1,0]},_="no_effect",p=!1,T=document.querySelectorAll('input[type=radio][name="kernel"]');function x(){_=this.value,p=-1!==this.value.indexOf("emboss")}function v(e,n){var t=r.createShader(n);return r.shaderSource(t,e),r.compileShader(t),r.getShaderParameter(t,r.COMPILE_STATUS)||alert("Error compiling shader: "+r.getShaderInfoLog(t)),t}function S(){r.bindBuffer(r.ARRAY_BUFFER,m),r.vertexAttribPointer(u,3,r.FLOAT,!1,0,0),r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,c),r.drawElements(r.TRIANGLES,c.numItems,r.UNSIGNED_SHORT,0)}function R(e){var n=0;for(var r in e){if(!e.hasOwnProperty(r))return;n+=e[r]}return n}window.addEventListener("load",function(){t=document.querySelector("#canvas"),i=document.querySelector("#container"),t.width=i.clientWidth,t.height=i.clientHeight;try{r=t.getContext("webgl")||t.getContext("experimental-webgl")}catch(e){console.error(e)}r&&(!function(){var e="\n    attribute vec3 aVertexPosition;\n    \n    varying vec2 position;\n    void main(void) {\n      position = vec2(aVertexPosition.xy);\n      gl_Position = vec4(position, 0.0, 1.0);\n    }\n  ",n="\n    varying highp vec2 position;\n    uniform sampler2D uSampler;\n    uniform highp vec2 uTexDimensions;\n    uniform highp float uKernel[9];\n    uniform highp float uKernelWeight;\n    uniform highp int uEmboss;\n    \n    void main(void) {\n      //convert texture coordinates from [-1, 1] to [0, 1]\n      highp vec2 texCoords = position * 0.5 + .5;\n      \n      //find the size of each pixel relative to the [0, 1] range\n      highp vec2 texelSize = vec2(1.0, 1.0) / uTexDimensions;\n      \n      //modified from http://games.greggman.com/game/webgl-image-processing/\n      highp vec4 colorSum =\n        texture2D(uSampler, texCoords + texelSize * vec2(-1, -1)) * uKernel[0] +\n        texture2D(uSampler, texCoords + texelSize * vec2( 0, -1)) * uKernel[1] +\n        texture2D(uSampler, texCoords + texelSize * vec2( 1, -1)) * uKernel[2] +\n        \n        texture2D(uSampler, texCoords + texelSize * vec2(-1,  0)) * uKernel[3] +\n        \n        //central pixel\n        texture2D(uSampler, texCoords) * uKernel[4] +     \n        texture2D(uSampler, texCoords + texelSize * vec2( 1,  0)) * uKernel[5] +\n        \n        texture2D(uSampler, texCoords + texelSize * vec2(-1,  1)) * uKernel[6] +\n        texture2D(uSampler, texCoords + texelSize * vec2( 0,  1)) * uKernel[7] +\n        texture2D(uSampler, texCoords + texelSize * vec2( 1,  1)) * uKernel[8];\n        \n      highp float weight;\n      weight = uKernelWeight;\n      if (0.01 > weight) {\n        weight = 1.0;\n      }\n      \n      highp vec3 color = (colorSum/weight).rgb;\n      \n      if(uEmboss == 1) {\n        //to grayscale\n        highp float gray = dot(color, vec3(.3,.59,.11) )  +.5;\n        highp vec3 finalColor = vec3(gray,gray,gray);\n        gl_FragColor = vec4( finalColor, 1.0 );\n      }else{\n        gl_FragColor = vec4( color, 1.0 );\n      }\n    }\n  ";l=v(e,r.VERTEX_SHADER),a=v(n,r.FRAGMENT_SHADER),o=r.createProgram(),r.attachShader(o,l),r.attachShader(o,a),r.linkProgram(o),r.getProgramParameter(o,r.LINK_STATUS)||alert("Unable to initialize the shader program.");r.useProgram(o)}(),function(e){void 0===e&&(e=2);var n=[0,0,0,.5*-e,.5*-e,0,.5*e,.5*-e,0,.5*e,.5*e,0,.5*-e,.5*e,0],t=[0,1,2,0,2,3,0,3,4,0,4,1];m=r.createBuffer(),r.bindBuffer(r.ARRAY_BUFFER,m),r.bufferData(r.ARRAY_BUFFER,new Float32Array(n),r.STATIC_DRAW),m.itemSize=3,m.numItems=n.length/3,c=r.createBuffer(),r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,c),r.bufferData(r.ELEMENT_ARRAY_BUFFER,new Uint16Array(t),r.STREAM_DRAW),c.itemSize=3,c.numItems=t.length}(),(s=new Image).src="data/img/iu/iu01.jpg",u=r.getAttribLocation(o,"aVertexPosition"),r.enableVertexAttribArray(u),g=r.getUniformLocation(o,"uKernel"),h=r.getUniformLocation(o,"uKernelWeight"),E=r.getUniformLocation(o,"uEmboss"),s.onload=function(){!function(){f=r.createTexture(),r.bindTexture(r.TEXTURE_2D,f),r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,!0),r.texImage2D(r.TEXTURE_2D,0,r.RGBA,r.RGBA,r.UNSIGNED_BYTE,s),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MAG_FILTER,r.NEAREST),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_S,r.CLAMP_TO_EDGE),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_T,r.CLAMP_TO_EDGE),r.uniform1i(o.samplerUniform,0),r.isTexture(f)||console.error("Error: Texture is invalid");r.generateMipmap(r.TEXTURE_2D),o.samplerUniform=r.getUniformLocation(o,"uSampler"),r.uniform1i(o.samplerUniform,0),r.uniform2f(r.getUniformLocation(o,"uTexDimensions"),s.width,s.height)}(),function e(){r.clearColor(.1,.1,.1,.1),r.clear(r.COLOR_BUFFER_BIT|r.DEPTH_BUFFER_BIT),r.enable(r.DEPTH_TEST),r.uniform1fv(g,d.no_effect),r.uniform1i(E,0),r.uniform1f(h,R(d.no_effect)),r.viewport(0,0,t.width/3,t.height),S();var n=d[_].slice(),i=R(n);r.uniform1fv(g,n),r.uniform1f(h,i),r.viewport(t.width/3,0,t.width/3,t.height),S(),"no_effect"!==_&&(n[4]+=1),r.uniform1fv(g,n),p?r.uniform1i(E,1):r.uniform1i(E,0),"no_effect"===_?r.uniform1f(h,i):r.uniform1f(h,i+1),r.viewport(2*t.width/3,0,t.width/3,t.height),S(),requestAnimationFrame(e)}()})}),Array.prototype.forEach.call(T,function(e){e.addEventListener("change",x)})}},[[60,0]]]);
//# sourceMappingURL=webgl-convolution-kernel.js.map