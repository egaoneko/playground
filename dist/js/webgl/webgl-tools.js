var WebGLTools = (function() {  
  function getGLContext(canvas) {
    var names = ["webgl", "experimental-webgl"];
    var context = null;
    for (var i = 0; i < names.length; i++) {
      try {
        context = canvas.getContext(names[i]);
      } catch (e) {}
      if (context) {
        break;
      }
    }
    if (context) {
      context.viewportWidth = canvas.width;
      context.viewportHeight = canvas.height;
    } else {
      alert("Failed to create WebGL context!");
    }
    return context;
  }

  function loadShaderFromDOM(gl, id) {
    var shaderScript = document.getElementById(id);
    
    // id로 요소를 찾지 못하면 바로 종료한다.
    if(!shaderScript) {
      return null;
    }

    // DOM 엘리먼트의 자식을 순회하며 셰이더 코드를 문자열로 만든다.
    var shaderSource = "";
    var currentChild = shaderScript.firstChild;
    while (currentChild) {
      if(currentChild.nodeType == 3) {
        shaderSource += currentChild.textContent;
      }
      currentChild = currentChild.nextSibling;
    }

    var shader;
    if (shaderScript.type == "x-shader/x-fragment") {
      shader = gl.createShader(gl.FRAGMENT_SHADER);
    } else if(shaderScript.type == "x-shader/x-vertex") {
      shader = gl.createShader(gl.VERTEX_SHADER);
    } else {
      return null;
    }

    gl.shaderSource(shader, shaderSource);
    gl.compileShader(shader);

    if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      alert(gl.getShaderInfoLog(shader));
      return null;
    }
    return shader;
  }

  return {
    'getGLContext' : getGLContext,
    'loadShaderFromDOM' : loadShaderFromDOM
  }
})();