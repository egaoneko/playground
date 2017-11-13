/*global WebGLTools, WebGLDebugUtils, mat4, dat*/
(function() {
  var gl;
  var canvas;
  var shaderProgram;
  var basisVertexBuffer;
  
  var modelViewMatrix;
  var projectionMatrix;
  var modelViewMatrixStack;

  var gui = new dat.GUI();  
  var eyeProps = {
    x: 0,
    y: 0,
    z: -1
  };
  var centerProps = {
    x: 0,
    y: 0,
    z: 0
  };
  var upProps = {
    x: 1,
    y: 0,
    z: 0
  };
  
  function setupShaders() {
    var vertexShader = WebGLTools.loadShaderFromDOM(gl, "shader-vs");
    var fragmentShader = WebGLTools.loadShaderFromDOM(gl, "shader-fs");
    
    shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);
  
    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
      alert("Failed to setup shaders");
    }
  
    gl.useProgram(shaderProgram);
    
    shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition"); 
    shaderProgram.vertexColorAttribute = gl.getAttribLocation(shaderProgram, "aVertexColor");
    shaderProgram.uniformMVMatrix = gl.getUniformLocation(shaderProgram, "uMVMatrix");
    shaderProgram.uniformProjMatrix = gl.getUniformLocation(shaderProgram, "uPMatrix");
    
    gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);
  
    modelViewMatrix = mat4.create();
    projectionMatrix = mat4.create();
    modelViewMatrixStack = [];
  }
  
  function pushModelViewMatrix() {
    var copyToPush = mat4.create(modelViewMatrix);
    modelViewMatrixStack.push(copyToPush);
  }
  
  function popModelViewMatrix() {
    if (modelViewMatrixStack.length == 0) {
      throw "Error popModelViewMatrix() - Stack was empty ";
    }
    modelViewMatrix = modelViewMatrixStack.pop();
  }
  
  function setupBuffers() {
    basisVertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, basisVertexBuffer);
    var basisVertices = [
      0.0,  0.0,  0.0, // vO
      1.0,  0.0,  0.0, // vX
      0.0,  0.0,  0.0, // vO
      0.0,  1.0,  0.0, // vY
      0.0,  0.0,  0.0, // vO
      0.0,  0.0,  1.0 // vZ
    ];
    
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(basisVertices), gl.STATIC_DRAW);
    basisVertexBuffer.itemSize = 3;
    basisVertexBuffer.numberOfItems = 6;
  }
  
  function uploadModelViewMatrixToShader() {
    gl.uniformMatrix4fv(shaderProgram.uniformMVMatrix, false, modelViewMatrix);
  }
  
  function uploadProjectionMatrixToShader() {
    gl.uniformMatrix4fv(shaderProgram.uniformProjMatrix,
      false, projectionMatrix);
  }
  
  function drawBasis() { 
    gl.disableVertexAttribArray(shaderProgram.vertexColorAttribute);          
    gl.bindBuffer(gl.ARRAY_BUFFER, basisVertexBuffer);
    gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, 
    basisVertexBuffer.itemSize, gl.FLOAT, false, 0, 0);
  
    gl.vertexAttrib4f(shaderProgram.vertexColorAttribute, 1.0, 0.0, 0.0, 1.0);
    gl.drawArrays(gl.LINES, 0, 2);
  
    gl.vertexAttrib4f(shaderProgram.vertexColorAttribute, 0.0, 1.0, 0.0, 1.0);
    gl.drawArrays(gl.LINES, 2, 2);
  
    gl.vertexAttrib4f(shaderProgram.vertexColorAttribute, 0.0, 0.0, 1.0, 1.0);
    gl.drawArrays(gl.LINES, 4, 2);
  }
  
  function draw() {
    gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    mat4.perspective(60, gl.viewportWidth / gl.viewportHeight, 0.1, 100.0, projectionMatrix);
    mat4.identity(modelViewMatrix);
    mat4.lookAt([eyeProps.x, eyeProps.y, eyeProps.z], 
                [centerProps.x, centerProps.y, centerProps.z], 
                [upProps.x, upProps.y, upProps.z], 
                modelViewMatrix);
  
    uploadModelViewMatrixToShader();
    uploadProjectionMatrixToShader();
  
    // pushModelViewMatrix();
    // mat4.translate(modelViewMatrix, [0.0, 0.0, 0.0], modelViewMatrix);
    // mat4.scale(modelViewMatrix, [1.0, 1.0, 1.0], modelViewMatrix);
    // uploadModelViewMatrixToShader();
    drawBasis();
    // popModelViewMatrix();
  }
  
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function setupGUI() {
    var eyeFolder = gui.addFolder('lookAt - eye');
    setEvent(eyeFolder.add(eyeProps, 'x', -20, 20));
    setEvent(eyeFolder.add(eyeProps, 'y', -20, 20));
    setEvent(eyeFolder.add(eyeProps, 'z', -20, 20));
    eyeFolder.open();

    var centerFolder = gui.addFolder('lookAt - center');
    setEvent(centerFolder.add(centerProps, 'x', -20, 20));
    setEvent(centerFolder.add(centerProps, 'y', -20, 20));
    setEvent(centerFolder.add(centerProps, 'z', -20, 20));
    centerFolder.open();

    var upFolder = gui.addFolder('lookAt - up');
    setEvent(upFolder.add(upProps, 'x', -20, 20));
    setEvent(upFolder.add(upProps, 'y', -20, 20));
    setEvent(upFolder.add(upProps, 'z', -20, 20));
    upFolder.open();
  }

  function setEvent(controller) {
    controller.onChange(function () {
      draw();
    });
  }
  
  function startup() {
    canvas = document.getElementById("myGLCanvas");
    resizeCanvas();
    setupGUI();
  
    gl = WebGLDebugUtils.makeDebugContext(WebGLTools.getGLContext(canvas));
    setupShaders();
    setupBuffers();
    gl.clearColor(1.0, 1.0, 1.0, 1.0);
    
    gl.frontFace(gl.CCW);
    gl.enable(gl.CULL_FACE);
    gl.cullFace(gl.BACK);
  
    draw();
  }

  window.addEventListener('load', function(){
    startup();
  });
})();