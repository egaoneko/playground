window.addEventListener('load', function(){
  var loader = new Utils.ImageLoader();
  var image = loader.load('../../../textures/iu01.jpg', run);
  var logo = loader.load('../../../textures/opencv.png', run);
  var radios = document.querySelectorAll('input[type=radio][name="image"]');
  var grayscaleFlag = 'GRAYSCALE_AVERAGE';

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
    if (!image.complete || !logo.complete) {
      return;
    }

    var width = 300;
    var height = image.height * (width / image.width);

    var logoWidth = 144;
    var logoHeight = 180;

    var originalCanvas = document.querySelector('#original');
    var originalCtx = originalCanvas.getContext('2d');
    originalCanvas.width = width;
    originalCanvas.height = height;

    var maskingCanvas = document.querySelector('#masking');
    var maskingCtx = maskingCanvas.getContext('2d');
    maskingCanvas.width = width;
    maskingCanvas.height = height;

    var logoCanvas = document.querySelector('#logo');
    var logoCtx = logoCanvas.getContext('2d');
    logoCanvas.width = logoWidth;
    logoCanvas.height = logoHeight;

    var logoMaskCanvas = document.querySelector('#logo_mask');
    var logoMaskCtx = logoMaskCanvas.getContext('2d');
    logoMaskCanvas.width = logoWidth;
    logoMaskCanvas.height = logoHeight;

    var logoMaskInvCanvas = document.querySelector('#logo_mask_inv');
    var logoMaskInvCtx = logoMaskInvCanvas.getContext('2d');
    logoMaskInvCanvas.width = logoWidth;
    logoMaskInvCanvas.height = logoHeight;

    var grayScaleLogo = CanvasTools.grayscale(logo, CanvasTools.constant[grayscaleFlag]);
    var logoMask = CanvasTools.threshold(grayScaleLogo, 10, 255, CanvasTools.constant.THRESHOLD_BINARY);
    var logoMaskInv = CanvasTools.threshold(grayScaleLogo, 10, 255, CanvasTools.constant.THRESHOLD_BINARY_INV);
    var mask = CanvasTools.mask(logoMaskInv, [0, 0, 0], [10, 0, 0]);

    originalCtx.drawImage(image, 0, 0, width, height);
    maskingCtx.drawImage(CanvasTools.masking(image, logo, mask), 0, 0, width, height);
    logoCtx.drawImage(logo, 0, 0, logoWidth, logoHeight);
    logoMaskCtx.drawImage(logoMask, 0, 0, logoWidth, logoHeight);
    logoMaskInvCtx.drawImage(logoMaskInv, 0, 0, logoWidth, logoHeight);
  }
});