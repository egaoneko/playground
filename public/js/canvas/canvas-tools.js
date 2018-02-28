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
  
  constant.CHANNEL_SINGLE = 'CHANNEL_SINGLE';
  constant.CHANNEL_GRAYSCALE = 'CHANNEL_GRAYSCALE';

  function channel(image, channelType, presentType) {
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    canvas.width = image.width;
    canvas.height = image.height;
    ctx.drawImage(image, 0, 0);

    var imageData = ctx.getImageData(0, 0, image.width, image.height);

    switch (channelType) {
      case constant.CHANNEL_RED:
        splitChannel(imageData, 0, presentType);
        break;
      case constant.CHANNEL_GREEN:
        splitChannel(imageData, 1, presentType);
        break;
      case constant.CHANNEL_BLUE:
        splitChannel(imageData, 2, presentType);
        break;
      default:
        break;
    }
    ctx.putImageData(imageData, 0, 0);
    return canvas;
  }

  function splitChannel(imageData, channel, presentType) {
    var data = imageData.data;
    for(var i = 0; i < data.length; i += 4) {
      var brightness = data[i + channel];

      if (constant.CHANNEL_SINGLE === presentType) {
        // red
        data[i] = channel === 0? brightness : 0;
        // green
        data[i+1] = channel === 1? brightness : 0;
        // blue
        data[i+2] = channel === 2? brightness : 0;
      } else {
        // red
        data[i] = brightness;
        // green
        data[i+1] = brightness;
        // blue
        data[i+2] = brightness;
      }
    }
  }

  constant.MERGE_REMAINDER = 'MERGE_REMAINDER';
  constant.MERGE_MIN = 'MERGE_MIN';
  constant.MERGE_WEIGHT = 'MERGE_WEIGHT';

  function merge(image1, image2, type, weight1, weight2) {
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    var width = Math.max(image1.width, image2.width);
    var height = Math.max(image1.height, image2.height);
    var imageData;

    canvas.width = width;
    canvas.height = height;

    ctx.drawImage(image1, 0, 0);
    var image1Data = ctx.getImageData(0, 0, width, height);

    ctx.drawImage(image2, 0, 0);
    var image2Data = ctx.getImageData(0, 0, width, height);

    switch (type) {
      case constant.MERGE_REMAINDER:
        remainderMerge(image1Data, image2Data);
        break;
      case constant.MERGE_MIN:
        minMerge(image1Data, image2Data);
        break;
      case constant.MERGE_WEIGHT:
        weightMerge(image1Data, image2Data, weight1, weight2);
        break;
      default:
        break;
    }
    ctx.putImageData(image1Data, 0, 0);
    return canvas;
  }

  function remainderMerge(image1Data, image2Data) {
    var data1 = image1Data.data;
    var data2 = image2Data.data;

    for(var i = 0; i < data1.length; i += 4) {
      // red
      data1[i] = (data1[i] + data2[i]) % 256;
      // green
      data1[i+1] = (data1[i+1] + data2[i+1]) % 256;
      // blue
      data1[i+2] = (data1[i+2] + data2[i+2]) % 256;
    }
  }

  function minMerge(image1Data, image2Data) {
    var data1 = image1Data.data;
    var data2 = image2Data.data;

    for(var i = 0; i < data1.length; i += 4) {
      // red
      data1[i] = Math.min(data1[i] + data2[i], 255);
      // green
      data1[i+1] = Math.min(data1[i+1] + data2[i+1], 255);
      // blue
      data1[i+2] = Math.min(data1[i+2] + data2[i+2], 255);
    }
  }

  function weightMerge(image1Data, image2Data, weight1, weight2) {
    var data1 = image1Data.data;
    var data2 = image2Data.data;

    for(var i = 0; i < data1.length; i += 4) {
      // red
      data1[i] = Math.min(weight1 * data1[i] + weight2 * data2[i], 255);
      // green
      data1[i+1] = Math.min(weight1 * data1[i+1] + weight2 * data2[i+1], 255);
      // blue
      data1[i+2] = Math.min(weight1 * data1[i+2] + weight2 * data2[i+2], 255);
    }
  }

  return {
    'constant': constant,
    'grayscale': grayscale,
    'channel': channel,
    'merge': merge
  }
})();