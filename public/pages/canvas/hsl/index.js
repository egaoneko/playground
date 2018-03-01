window.addEventListener('load', function(){
  var loader = new Utils.ImageLoader();
  var image = loader.load('../../../textures/iu01.jpg', run);
  var radios = document.querySelectorAll('input[type=radio][name="image"]');

  function changeHandler(event) {
    image = loader.load('../../../textures/' + this.value, run);
  }

  Array.prototype.forEach.call(radios, function(radio) {
    radio.addEventListener('change', changeHandler);
  });

  function run() {
    var width = 300;
    var height = image.height * (width / image.width);

    var originalCanvas = document.querySelector('#original');
    var originalCtx = originalCanvas.getContext('2d');
    originalCanvas.width = width;
    originalCanvas.height = height;

    var rgbColorElement = document.querySelector('#color_rgb');
    var hslColorElement = document.querySelector('#color_hsl');
    function pick(event) {
      var x = event.layerX;
      var y = event.layerY;

      var rgba = CanvasTools.getPixelColor(originalCanvas, x, y, CanvasTools.constant.PIXEL_RGB);
      var rgbaFormat = 'rgba(' + rgba[0] + ', ' + rgba[1] + ', ' + rgba[2] + ', ' + (rgba[3] / 255) + ')';
      rgbColorElement.style.background = rgbaFormat;
      rgbColorElement.children[0].style.color = rgbaFormat;
      rgbColorElement.children[0].textContent = rgbaFormat;

      var hsl = CanvasTools.getPixelColor(originalCanvas, x, y, CanvasTools.constant.PIXEL_HSL);
      var hslFormat = 'hsl(' + hsl[0] + ', ' + hsl[1] + '%, ' + hsl[2] + '%)';
      hslColorElement.style.background = hslFormat;
      hslColorElement.children[0].style.color = hslFormat;
      hslColorElement.children[0].textContent = hslFormat;
      // CanvasTools.filterHSLTest(originalCanvas, CanvasTools.constant.FILTER_HSL_RED, x, y);
    }
    originalCanvas.addEventListener('mousemove', pick);

    var redCanvas = document.querySelector('#red');
    var redCtx = redCanvas.getContext('2d');
    redCanvas.width = width;
    redCanvas.height = height;

    var greenCanvas = document.querySelector('#green');
    var greenCtx = greenCanvas.getContext('2d');
    greenCanvas.width = width;
    greenCanvas.height = height;

    var blueCanvas = document.querySelector('#blue');
    var blueCtx = blueCanvas.getContext('2d');
    blueCanvas.width = width;
    blueCanvas.height = height;

    originalCtx.drawImage(image, 0, 0, width, height);
    redCtx.drawImage(CanvasTools.filterHSL(image, CanvasTools.constant.FILTER_HSL_RED), 0, 0, width, height);
    greenCtx.drawImage(CanvasTools.filterHSL(image, CanvasTools.constant.FILTER_HSL_GREEN), 0, 0, width, height);
    blueCtx.drawImage(CanvasTools.filterHSL(image, CanvasTools.constant.FILTER_HSL_BLUE), 0, 0, width, height);
  }
});