window.addEventListener('load', function(){
  var loader = new Utils.ImageLoader();
  var image1 = loader.load('../../../textures/iu01.jpg', run);
  var image2 = loader.load('../../../textures/iu02.jpg', run);

  function run() {
    var width = 300;
    var height = image1.height * (width / image1.width);

    var original1Canvas = document.querySelector('#original_iu01');
    var original1Ctx = original1Canvas.getContext('2d');
    original1Canvas.width = width;
    original1Canvas.height = height;

    var original2Canvas = document.querySelector('#original_iu02');
    var original2Ctx = original2Canvas.getContext('2d');
    original2Canvas.width = width;
    original2Canvas.height = height;

    var remainderCanvas = document.querySelector('#merge_remainder');
    var remainderCtx = remainderCanvas.getContext('2d');
    remainderCanvas.width = width;
    remainderCanvas.height = height;

    var minCanvas = document.querySelector('#merge_min');
    var minCtx = minCanvas.getContext('2d');
    minCanvas.width = width;
    minCanvas.height = height;

    var weightCanvas = document.querySelector('#merge_weight');
    var weightCtx = weightCanvas.getContext('2d');
    weightCanvas.width = width;
    weightCanvas.height = height;

    var weightElement = document.querySelector('#weight');
    weightElement.addEventListener('input', function(e) {
      var value = parseInt(e.target.value, 10) ;
      var weight1 = value / 100;
      var weight2 = (100 - value) / 100;
      weightCtx.drawImage(CanvasTools.merge(image1, image2, CanvasTools.constant.MERGE_WEIGHT, weight1, weight2), 0, 0, width, height);
    });

    original1Ctx.drawImage(image1, 0, 0, width, height);
    original2Ctx.drawImage(image2, 0, 0, width, height);
    remainderCtx.drawImage(CanvasTools.merge(image1, image2, CanvasTools.constant.MERGE_REMAINDER), 0, 0, width, height);
    minCtx.drawImage(CanvasTools.merge(image1, image2, CanvasTools.constant.MERGE_MIN), 0, 0, width, height);
    weightCtx.drawImage(CanvasTools.merge(image1, image2, CanvasTools.constant.MERGE_WEIGHT, 0, 1), 0, 0, width, height);
  }
});