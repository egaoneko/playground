/*global WebGLTools, WebGLDebugUtils, mat4, dat*/
(function() {
  var gl;
  var canvas;
  var shaderProgram;
  var basisVertexBuffer;
  var cubeVertexPositionBuffer;
  var cubeVertexIndexBuffer;

  var modelViewMatrix;
  var projectionMatrix;
  var modelViewMatrixStack;

  var gui = new dat.GUI();
  var lookAtSize = 20;
  var eyeProps = {
    x: 8,
    y: 5,
    z: -10
  };
  var centerProps = {
    x: 0,
    y: 0,
    z: 0
  };
  var upProps = {
    x: 0,
    y: 1,
    z: 0
  };
  var projOption = ['perspective', 'orthogonal'];
  var projProps ={
    method: projOption[0]
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

  function setupBasisBuffers() {
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

  function setupCubeBuffers() {
    cubeVertexPositionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexPositionBuffer);

    var cubeVertexPosition = [
      // Front face
      0.5, 0.5, 0.5, //v0
      -0.5, 0.5, 0.5, //v1
      -0.5, -0.5, 0.5, //v2
      0.5, -0.5, 0.5, //v3

      // Back face
      0.5, 0.5, -0.5, //v4
      -0.5, 0.5, -0.5, //v5
      -0.5, -0.5, -0.5, //v6
      0.5, -0.5, -0.5, //v7

      // Left face
      -0.5, 0.5, 0.5, //v8
      -0.5, 0.5, -0.5, //v9
      -0.5, -0.5, -0.5, //v10
      -0.5, -0.5, 0.5, //v11

      // Right face
      0.5, 0.5, 0.5, //12
      0.5, -0.5, 0.5, //13
      0.5, -0.5, -0.5, //14
      0.5, 0.5, -0.5, //15

      // Top face
      0.5, 0.5, 0.5, //v16
      0.5, 0.5, -0.5, //v17
      -0.5, 0.5, -0.5, //v18
      -0.5, 0.5, 0.5, //v19

      // Bottom face
      0.5, -0.5, 0.5, //v20
      0.5, -0.5, -0.5, //v21
      -0.5, -0.5, -0.5, //v22
      -0.5, -0.5, 0.5 //v23
    ];

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cubeVertexPosition),
      gl.STATIC_DRAW);
    cubeVertexPositionBuffer.itemSize = 3;
    cubeVertexPositionBuffer.numberOfItems = 24;

    cubeVertexIndexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cubeVertexIndexBuffer);
    var cubeVertexIndices = [
      0, 1, 2, 0, 2, 3,    // Front face
      4, 6, 5, 4, 7, 6,    // Back face
      8, 9, 10, 8, 10, 11,  // Left face
      12, 13, 14, 12, 14, 15, // Right face
      16, 17, 18, 16, 18, 19, // Top face
      20, 22, 21, 20, 23, 22  // Bottom face
    ];
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(cubeVertexIndices),
      gl.STATIC_DRAW);
    cubeVertexIndexBuffer.itemSize = 1;
    cubeVertexIndexBuffer.numberOfItems = 36;
  }

  function setupBuffers() {
    setupBasisBuffers();
    setupCubeBuffers();
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

  function drawCube(r, g, b, a) {
    // Disable vertex attrib array and use constant color for the cube.
    gl.disableVertexAttribArray(shaderProgram.vertexColorAttribute);
    // Set color
    gl.vertexAttrib4f(shaderProgram.vertexColorAttribute, r, g, b, a);

    gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexPositionBuffer);
    gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute,
      cubeVertexPositionBuffer.itemSize,
      gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cubeVertexIndexBuffer);
    gl.drawElements(gl.TRIANGLES, cubeVertexIndexBuffer.numberOfItems,
      gl.UNSIGNED_SHORT, 0);
  }

  function drawCubeWire(r, g, b, a) {
    // Disable vertex attrib array and use constant color for the cube.
    gl.disableVertexAttribArray(shaderProgram.vertexColorAttribute);
    // Set color
    gl.vertexAttrib4f(shaderProgram.vertexColorAttribute, r, g, b, a);

    gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexPositionBuffer);
    gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute,
      cubeVertexPositionBuffer.itemSize,
      gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cubeVertexIndexBuffer);
    gl.drawElements(gl.LINE_LOOP, cubeVertexIndexBuffer.numberOfItems,
      gl.UNSIGNED_SHORT, 0);
  }
  
  function draw() {
    gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    
    if(projProps.method === projOption[0]) {
      mat4.perspective(60, gl.viewportWidth / gl.viewportHeight, 0.1, 100.0, projectionMatrix);      
    } else {
      mat4.ortho(-1.0, 1.0, -1.0, 1.0, 0.1, 100, projectionMatrix);      
    }
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
    drawCube(0.0, 0.0, 0.0, 0.2);
    drawCubeWire(1.0, 1.0, 0.0, 1.0);
    // popModelViewMatrix();
  }
  
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function setupGUI() {
    var eyeFolder = gui.addFolder('lookAt - eye');
    setEvent(eyeFolder.add(eyeProps, 'x', -lookAtSize, lookAtSize));
    setEvent(eyeFolder.add(eyeProps, 'y', -lookAtSize, lookAtSize));
    setEvent(eyeFolder.add(eyeProps, 'z', -lookAtSize, lookAtSize));
    eyeFolder.open();

    var centerFolder = gui.addFolder('lookAt - center');
    setEvent(centerFolder.add(centerProps, 'x', -lookAtSize, lookAtSize));
    setEvent(centerFolder.add(centerProps, 'y', -lookAtSize, lookAtSize));
    setEvent(centerFolder.add(centerProps, 'z', -lookAtSize, lookAtSize));
    centerFolder.open();

    var upFolder = gui.addFolder('lookAt - up');
    setEvent(upFolder.add(upProps, 'x', -lookAtSize, lookAtSize));
    setEvent(upFolder.add(upProps, 'y', -lookAtSize, lookAtSize));
    setEvent(upFolder.add(upProps, 'z', -lookAtSize, lookAtSize));
    upFolder.open();

    var projFolder = gui.addFolder('projection method');
    setEvent(projFolder.add(projProps, 'method', projOption));
    projFolder.open();
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
    gl.enable(gl.DEPTH_TEST);
    
    gl.frontFace(gl.CCW);
    gl.enable(gl.CULL_FACE);
    gl.cullFace(gl.BACK);
  
    draw();
  }

  window.addEventListener('load', function(){
    startup();
  });
})();