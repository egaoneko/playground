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

    originalCtx.drawImage(image, 0, 0, width, originalCanvas.height);
    redCtx.drawImage(CanvasTools.channel(image, CanvasTools.constant.CHANNEL_RED), 0, 0, width, height);
    greenCtx.drawImage(CanvasTools.channel(image, CanvasTools.constant.CHANNEL_GREEN), 0, 0, width, height);
    blueCtx.drawImage(CanvasTools.channel(image, CanvasTools.constant.CHANNEL_BLUE), 0, 0, width, height);
  }
});