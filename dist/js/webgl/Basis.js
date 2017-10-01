var Basis = {
  getGLContext: function (canvas) {
    var names = ["webgl", "experimental-webgl"];
    var context = null;
    for (var i = 0; i < names.length; i++) {
      try {
        context = canvas.getContext(names[i]);
      } catch (e) {
      }
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
};

// browserify support
if (typeof module === 'object') {
  module.exports = Basis;
}
