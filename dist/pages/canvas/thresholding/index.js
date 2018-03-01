window.addEventListener('load', function(){
  var loader = new Utils.ImageLoader();
  var image = loader.load('../../../textures/iu01.jpg', run);
  var grayscaleFlag;

  var radios = document.querySelectorAll('input[type=radio][name="image"]');
  function changeHandler(event) {
    image = loader.load('../../../textures/' + this.value, run);
  }
  Array.prototype.forEach.call(radios, function(radio) {
    radio.addEventListener('change', changeHandler);
  });

  var grayscaleRadios= document.querySelectorAll('input[type=radio][name="grayscale"]');
  function grayscaleChangeHandler(event) {
    if (!this.value) {
      grayscaleFlag = null;
    } else {
      grayscaleFlag = this.value;
    }
    run();
  }
  Array.prototype.forEach.call(grayscaleRadios, function(radio) {
    radio.addEventListener('change', grayscaleChangeHandler);
  });

  function run() {
    var width = 300;
    var height = image.height * (width / image.width);

    var originalCanvas = document.querySelector('#original');
    var originalCtx = originalCanvas.getContext('2d');
    originalCanvas.width = width;
    originalCanvas.height = height;

    var binaryCanvas = document.querySelector('#binary');
    var binaryCtx = binaryCanvas.getContext('2d');
    binaryCanvas.width = width;
    binaryCanvas.height = height;

    var binaryInvCanvas = document.querySelector('#binary_inv');
    var binaryInvCtx = binaryInvCanvas.getContext('2d');
    binaryInvCanvas.width = width;
    binaryInvCanvas.height = height;

    var truncCanvas = document.querySelector('#trunc');
    var truncCtx = truncCanvas.getContext('2d');
    truncCanvas.width = width;
    truncCanvas.height = height;

    var tozeroCanvas = document.querySelector('#tozero');
    var tozeroCtx = tozeroCanvas.getContext('2d');
    tozeroCanvas.width = width;
    tozeroCanvas.height = height;

    var tozeroInvCanvas = document.querySelector('#tozero_inv');
    var tozeroInvCtx = tozeroInvCanvas.getContext('2d');
    tozeroInvCanvas.width = width;
    tozeroInvCanvas.height = height;

    var grayScaleImage = CanvasTools.grayscale(image, CanvasTools.constant[grayscaleFlag]);
    originalCtx.drawImage(grayScaleImage, 0, 0, width, height);
    binaryCtx.drawImage(CanvasTools.threshold(grayScaleImage, 127, 255, CanvasTools.constant.THRESHOLD_BINARY), 0, 0, width, height);
    binaryInvCtx.drawImage(CanvasTools.threshold(grayScaleImage, 127, 255, CanvasTools.constant.THRESHOLD_BINARY_INV), 0, 0, width, height);
    truncCtx.drawImage(CanvasTools.threshold(grayScaleImage, 127, 255, CanvasTools.constant.THRESHOLD_TRUNC), 0, 0, width, height);
    tozeroCtx.drawImage(CanvasTools.threshold(grayScaleImage, 127, 255, CanvasTools.constant.THRESHOLD_TOZERO), 0, 0, width, height);
    tozeroInvCtx.drawImage(CanvasTools.threshold(grayScaleImage, 127, 255, CanvasTools.constant.THRESHOLD_TOZERO_INV), 0, 0, width, height);
  }
});