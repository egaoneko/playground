window.addEventListener('load', function(){
  var loader = new Utils.ImageLoader();
  var image = loader.load('../../../textures/iu01.jpg', run);
  var grayscaleFlag = 'GRAYSCALE_AVERAGE';
  var thresholdFlag = 'THRESHOLD_BINARY';

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

  var thresholdRadios= document.querySelectorAll('input[type=radio][name="threshold"]');
  function thresholdChangeHandler(event) {
    thresholdFlag = this.value;
    run();
  }
  Array.prototype.forEach.call(thresholdRadios, function(radio) {
    radio.addEventListener('change', thresholdChangeHandler);
  });

  function run() {
    var width = 300;
    var height = image.height * (width / image.width);

    // var width = image.width;
    // var height = image.height;

    var originalCanvas = document.querySelector('#original');
    var originalCtx = originalCanvas.getContext('2d');
    originalCanvas.width = width;
    originalCanvas.height = height;

    // function pick(event) {
    //   var x = event.layerX;
    //   var y = event.layerY;
    //   originalCtx.drawImage(CanvasTools.adaptiveThresholdingTest(originalCanvas, 255, 11, 2, x, y), 0, 0, width, height);
    // }
    // originalCanvas.addEventListener('mousemove', pick);

    var binaryCanvas = document.querySelector('#binary');
    var binaryCtx = binaryCanvas.getContext('2d');
    binaryCanvas.width = width;
    binaryCanvas.height = height;

    var meanCanvas = document.querySelector('#mean');
    var meanCtx = meanCanvas.getContext('2d');
    meanCanvas.width = width;
    meanCanvas.height = height;

    var gaussianCanvas = document.querySelector('#gaussian');
    var gaussianCtx = gaussianCanvas.getContext('2d');
    gaussianCanvas.width = width;
    gaussianCanvas.height = height;

    var radiusElement = document.querySelector('#radius');
    radiusElement.addEventListener('input', function(e) {
      var value = parseInt(e.target.value, 10) ;
      gaussianCtx.drawImage(CanvasTools.adaptiveThresholding(grayScaleImage, 255, CanvasTools.constant.ADAPTIVE_THRESH_GAUSSIAN_C, CanvasTools.constant[thresholdFlag], 11, 2, value), 0, 0, width, height);
    });

    var grayScaleImage = CanvasTools.grayscale(image, CanvasTools.constant[grayscaleFlag]);
    originalCtx.drawImage(grayScaleImage, 0, 0, width, height);
    binaryCtx.drawImage(CanvasTools.threshold(grayScaleImage, 127, 255, CanvasTools.constant[thresholdFlag]), 0, 0, width, height);
    meanCtx.drawImage(CanvasTools.adaptiveThresholding(grayScaleImage, 255, CanvasTools.constant.ADAPTIVE_THRESH_MEAN_C, CanvasTools.constant[thresholdFlag], 11, 2), 0, 0, width, height);
    gaussianCtx.drawImage(CanvasTools.adaptiveThresholding(grayScaleImage, 255, CanvasTools.constant.ADAPTIVE_THRESH_GAUSSIAN_C, CanvasTools.constant[thresholdFlag], 11, 2, 1), 0, 0, width, height);
  }
});