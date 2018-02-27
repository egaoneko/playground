var CanvasTools = (function() {
  var constant = {};

  constant.GRAYSCALE_AVERAGE = 'GRAYSCALE_AVERAGE';
  constant.GRAYSCALE_YUV = 'GRAYSCALE_YUV';
  constant.GRAYSCALE_HSL = 'GRAYSCALE_HSL';
  constant.GRAYSCALE_HSV = 'GRAYSCALE_HSV';
  constant.GRAYSCALE_HSI = 'GRAYSCALE_HSI';

  function grayscale(image, type) {
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    canvas.width = image.width;
    canvas.height = image.height;
    ctx.drawImage(image, 0, 0);

    var imageData = ctx.getImageData(0, 0, image.width, image.height);

    switch (type) {
      case constant.GRAYSCALE_AVERAGE:
        convertGrayscaleByAverage(imageData);
        break;
      case constant.GRAYSCALE_YUV:
        convertGrayscaleByYUV(imageData);
        break;
      case constant.GRAYSCALE_HSL:
        convertGrayscaleByHSL(imageData);
        break;
      case constant.GRAYSCALE_HSV:
        convertGrayscaleByHSV(imageData);
        break;
      case constant.GRAYSCALE_HSI:
        convertGrayscaleByHSI(imageData);
        break;
      default:
        break;
    }
    ctx.putImageData(imageData, 0, 0);
    return canvas;
  }

  function convertGrayscaleByAverage(imageData) {
    var data = imageData.data;    
    for(var i = 0; i < data.length; i += 4) {
      var brightness = (data[i] + data[i+1] + data[i+2]) / 3;
      // red
      data[i] = brightness;
      // green
      data[i+1] = brightness;
      // blue
      data[i+2] = brightness;
    }
  }

  function convertGrayscaleByYUV(imageData) {
    var data = imageData.data;    
    for(var i = 0; i < data.length; i += 4) {
      var brightness = data[i]*0.2126 + data[i+1]*0.7152 + data[i+2]*0.0722;
      // red
      data[i] = brightness;
      // green
      data[i+1] = brightness;
      // blue
      data[i+2] = brightness;
    }
  }

  function convertGrayscaleByHSL(imageData) {
    var data = imageData.data;    
    for(var i = 0; i < data.length; i += 4) {
      var red = data[i];
      var green = data[i+1];
      var blue = data[i+2];

      var brightness = (Math.max(red, green, blue) + Math.min(red, green, blue)) * 0.5;
      // red
      data[i] = brightness;
      // green
      data[i+1] = brightness;
      // blue
      data[i+2] = brightness;
    }
  }

  function convertGrayscaleByHSV(imageData) {
    var data = imageData.data;    
    for(var i = 0; i < data.length; i += 4) {
      var brightness = Math.max(data[i], data[i+1], data[i+2]);
      // red
      data[i] = brightness;
      // green
      data[i+1] = brightness;
      // blue
      data[i+2] = brightness;
    }
  }

  function convertGrayscaleByHSI(imageData) {
    var data = imageData.data;    
    for(var i = 0; i < data.length; i += 4) {
      var brightness = (data[i] + data[i+1] + data[i+2]) / 3;
      // red
      data[i] = brightness;
      // green
      data[i+1] = brightness;
      // blue
      data[i+2] = brightness;
    }
  }

  constant.CHANNEL_RED = 'CHANNEL_RED';
  constant.CHANNEL_GREEN = 'CHANNEL_GREEN';
  constant.CHANNEL_BLUE = 'CHANNEL_BLUE';

  function channel(image, type) {
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    canvas.width = image.width;
    canvas.height = image.height;
    ctx.drawImage(image, 0, 0);

    var imageData = ctx.getImageData(0, 0, image.width, image.height);

    switch (type) {
      case constant.CHANNEL_RED:
        splitChannel(imageData, 0);
        break;
      case constant.CHANNEL_GREEN:
        splitChannel(imageData, 1);
        break;
      case constant.CHANNEL_BLUE:
        splitChannel(imageData, 2);
        break;
      default:
        break;
    }
    ctx.putImageData(imageData, 0, 0);
    return canvas;
  }

  function splitChannel(imageData, channel) {
    var data = imageData.data;    
    for(var i = 0; i < data.length; i += 4) {
      var brightness = data[i + channel];
      // red
      data[i] = brightness;
      // green
      data[i+1] = brightness;
      // blue
      data[i+2] = brightness;
    }
  }

  return {
    'constant': constant,
    'grayscale': grayscale,
    'channel': channel
  }
})();