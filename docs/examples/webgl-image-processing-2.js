(window.webpackJsonp=window.webpackJsonp||[]).push([[52],{56:function(e,r){var t=null,n=null,o=null,i=null,a=null,l=null,E=null,u=null,c=null,T=null,R=null,h=0,f=1,g=null;function m(e,r){var n=t.createShader(r);return t.shaderSource(n,e),t.compileShader(n),t.getShaderParameter(n,t.COMPILE_STATUS)||alert("Error compiling shader: "+t.getShaderInfoLog(n)),n}function _(){t.bindBuffer(t.ARRAY_BUFFER,u),t.vertexAttribPointer(E,3,t.FLOAT,!1,0,0),t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,c),t.drawElements(t.TRIANGLES,c.numItems,t.UNSIGNED_SHORT,0)}window.addEventListener("load",function(){n=document.querySelector("#canvas"),o=document.querySelector("#container"),n.width=o.clientWidth,n.height=o.clientHeight;try{t=n.getContext("webgl")||n.getContext("experimental-webgl")}catch(e){console.error(e)}t&&(!function(){var e="\n    attribute vec3 aVertexPosition;\n    \n    varying vec2 position;\n    void main(void) {\n      position = vec2(aVertexPosition.xy);\n      gl_Position = vec4(position, 0.0, 1.0);\n    }\n  ",r="\n    varying highp vec2 position;\n    uniform sampler2D uSampler;\n    uniform int uEffect;\n    \n    void main(void) {\n      //convert texture coordinates from [-1, 1] to [0, 1]\n      highp vec2 texCoords = position * 0.5 + .5;\n      \n      highp vec4 texColor = texture2D( uSampler, vec2(texCoords.s, texCoords.t) );\n      highp vec4 finalColor;\n      \n      if(uEffect == 0){\n        finalColor = texColor.gbra;\n      }else if(uEffect == 1){\n        highp vec3 sepia = vec3( \n          min((texColor.r * .393) + (texColor.g *.769) + (texColor.b * .189), 1.0),\n          min((texColor.r * .349) + (texColor.g *.686) + (texColor.b * .168), 1.0),\n          min((texColor.r * .272) + (texColor.g *.534) + (texColor.b * .131), 1.0)\n        );\n        finalColor = vec4(sepia, 1.0);\n      }\n      \n      gl_FragColor = finalColor;  \n    }\n  ";l=m(e,t.VERTEX_SHADER),a=m(r,t.FRAGMENT_SHADER),i=t.createProgram(),t.attachShader(i,l),t.attachShader(i,a),t.linkProgram(i),t.getProgramParameter(i,t.LINK_STATUS)||alert("Unable to initialize the shader program.");t.useProgram(i)}(),function(e){void 0===e&&(e=2);var r=[0,0,0,.5*-e,.5*-e,0,.5*e,.5*-e,0,.5*e,.5*e,0,.5*-e,.5*e,0],n=[0,1,2,0,2,3,0,3,4,0,4,1];u=t.createBuffer(),t.bindBuffer(t.ARRAY_BUFFER,u),t.bufferData(t.ARRAY_BUFFER,new Float32Array(r),t.STATIC_DRAW),u.itemSize=3,u.numItems=r.length/3,c=t.createBuffer(),t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,c),t.bufferData(t.ELEMENT_ARRAY_BUFFER,new Uint16Array(n),t.STREAM_DRAW),c.itemSize=3,c.numItems=n.length}(),(R=new Image).src="data/img/iu/iu01.jpg",E=t.getAttribLocation(i,"aVertexPosition"),t.enableVertexAttribArray(E),g=t.getUniformLocation(i,"uEffect"),R.onload=function(){T=t.createTexture(),t.bindTexture(t.TEXTURE_2D,T),t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,!0),t.texImage2D(t.TEXTURE_2D,0,t.RGBA,t.RGBA,t.UNSIGNED_BYTE,R),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.NEAREST),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE),t.uniform1i(i.samplerUniform,0),t.isTexture(T)||console.error("Error: Texture is invalid"),t.clearColor(.1,.1,.1,.1),t.clear(t.COLOR_BUFFER_BIT|t.DEPTH_BUFFER_BIT),t.enable(t.DEPTH_TEST),t.uniform1i(g,h),t.viewport(.5*n.width-.5*n.height,.5*n.height*.5,.5*n.height,.5*n.height),_(),t.uniform1i(g,f),t.viewport(.5*n.width,.5*n.height*.5,.5*n.height,.5*n.height),_()})})}},[[56,0]]]);
//# sourceMappingURL=webgl-image-processing-2.js.map