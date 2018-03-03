var CanvasTools = (function() {
  var constant = {};
  var offscreenCanvas = document.createElement('canvas');
  var offscreenCtx = offscreenCanvas.getContext('2d');
  var gaussianCache;

  constant.GRAYSCALE_AVERAGE = 'GRAYSCALE_AVERAGE';
  constant.GRAYSCALE_YUV = 'GRAYSCALE_YUV';
  constant.GRAYSCALE_HSL = 'GRAYSCALE_HSL';
  constant.GRAYSCALE_HSV = 'GRAYSCALE_HSV';
  constant.GRAYSCALE_HSI = 'GRAYSCALE_HSI';

  function grayscale(image, flag) {
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    canvas.width = image.width;
    canvas.height = image.height;
    ctx.drawImage(image, 0, 0);

    var imageData = ctx.getImageData(0, 0, image.width, image.height);

    switch (flag) {
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

  function channel(image, channelFlag, presentFlag) {
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    canvas.width = image.width;
    canvas.height = image.height;
    ctx.drawImage(image, 0, 0);

    var imageData = ctx.getImageData(0, 0, image.width, image.height);

    switch (channelFlag) {
      case constant.CHANNEL_RED:
        splitChannel(imageData, 0, presentFlag);
        break;
      case constant.CHANNEL_GREEN:
        splitChannel(imageData, 1, presentFlag);
        break;
      case constant.CHANNEL_BLUE:
        splitChannel(imageData, 2, presentFlag);
        break;
      default:
        break;
    }
    ctx.putImageData(imageData, 0, 0);
    return canvas;
  }

  function splitChannel(imageData, channel, presentFlag) {
    var data = imageData.data;
    for(var i = 0; i < data.length; i += 4) {
      var brightness = data[i + channel];

      if (constant.CHANNEL_SINGLE === presentFlag) {
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

  function merge(image1, image2, flag, weight1, weight2) {
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

    switch (flag) {
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

  constant.PIXEL_RGB = 'PIXEL_RGB';
  constant.PIXEL_HSL = 'PIXEL_HSL';

  function getPixelColor(canvas, x, y, flag) {
    var ctx = canvas.getContext('2d');
    var pixel = ctx.getImageData(x, y, 1, 1);

    switch (flag) {
      case constant.PIXEL_HSL:
        return convertPixelColorHSL(pixel.data);
      case constant.PIXEL_RGB:
        return convertPixelColorRGB(pixel.data);
      default:
        return convertPixelColorRGB(pixel.data);
    }
  }

  function convertPixelColorRGB(pixelData) {
    return pixelData.slice();
  }

  // http://axonflux.com/handy-rgb-to-hsl-and-rgb-to-hsv-color-model-c
  function convertPixelColorHSL(pixelData) {
    var r = pixelData[0] / 255;
    var g = pixelData[1] / 255;
    var b = pixelData[2] / 255;
    var max = Math.max(r, g, b);
    var min = Math.min(r, g, b);
    var h, s, l = (max + min) * 0.5;

    if(max === min) {
      h = s = 0; // achromatic
    } else {
      var d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch(max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }

    return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
  }

  constant.FILTER_HSL_RED = 'FILTER_HSL_RED';
  constant.FILTER_HSL_GREEN = 'FILTER_HSL_GREEN';
  constant.FILTER_HSL_BLUE = 'FILTER_HSL_BLUE';

  function filterHSL(image, flag) {
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    canvas.width = image.width;
    canvas.height = image.height;
    ctx.drawImage(image, 0, 0);

    var imageData = ctx.getImageData(0, 0, image.width, image.height);
    var hsvData = convertHSL(imageData.data);
    var mask;

    switch (flag) {
      case constant.FILTER_HSL_RED:
        mask = inRagne(hsvData, [-10, 30, 40], [10, 100, 60]);
        break;
      case constant.FILTER_HSL_GREEN:
        mask = inRagne(hsvData, [110, 30, 40], [130, 100, 60]);
        break;
      case constant.FILTER_HSL_BLUE:
        mask = inRagne(hsvData, [230, 30, 40], [250, 100, 60]);
        break;
      default:
        break;
    }
    _masking(imageData.data, mask);
    ctx.putImageData(imageData, 0, 0);
    return canvas;
  }

  function convertHSL(data) {
    var d = [];
    for(var i = 0; i < data.length; i += 4) {
      var hsv = convertPixelColorHSL([data[i], data[i+1], data[i+2]]);
      d.push(hsv[0], hsv[1], hsv[2], data[i+3]);
    }
    return d;
  }

  function inRagne(data, lower, upper) {
    var mask = [];
    var step = Math.min(lower.length, upper.length);
    for(var i = 0; i < data.length; i += 4) {
      for(var j = 0; j < step; j += 1) {
        var m;
        if (j === 0 && (lower[j] < 0 && upper[j] > 0)) {
          m = (data[i+j] >= (lower[j] + 360) || data[i+j] <= upper[j]) ? 1 : 0;
        } else {
          m = (data[i+j] >= lower[j] && data[i+j] <= upper[j]) ? 1 : 0;
        }
        mask.push(m);
      }

      if (step === 3) {
        mask.push(1);
      }
    }
    return mask;
  }

  function _masking(data, mask) {
    for(var i = 0; i < data.length; i += 4) {
      var m = Math.min(mask[i], mask[i+1], mask[i+2], mask[i+3]);
      data[i] *= m;
      data[i+1] *= m;
      data[i+2] *= m;
      // data[i+3] *= m;
    }
  }

  function filterHSLTest(canvas, flag, x, y) {
    var ctx = canvas.getContext('2d');
    var imageData = ctx.getImageData(x, y, 1, 1);
    var hsvData = convertHSL(imageData.data);
    var mask;

    switch (flag) {
      case constant.FILTER_HSL_RED:
        mask = inRagne(hsvData, [-30, 30, 20], [30, 100, 80]);
        break;
      case constant.FILTER_HSL_GREEN:
        mask = inRagne(hsvData, [90, 30, 20], [150, 100, 80]);
        break;
      case constant.FILTER_HSL_BLUE:
        mask = inRagne(hsvData, [210, 30, 20], [270, 100, 80]);
        break;
      default:
        break;
    }
    console.log(hsvData, mask, imageData.data);
    _masking(imageData.data, mask);
    console.log(imageData.data);
  }

  constant.THRESHOLD_BINARY = 'THRESHOLD_BINARY';
  constant.THRESHOLD_BINARY_INV = 'THRESHOLD_BINARY_INV';
  constant.THRESHOLD_TRUNC = 'THRESHOLD_TRUNC';
  constant.THRESHOLD_TOZERO = 'THRESHOLD_TOZERO';
  constant.THRESHOLD_TOZERO_INV = 'THRESHOLD_TOZERO_INV';

  function threshold(image, thresholdValue, value, flag) {
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    canvas.width = image.width;
    canvas.height = image.height;
    ctx.drawImage(image, 0, 0);

    var imageData = ctx.getImageData(0, 0, image.width, image.height);

    switch (flag) {
      case constant.THRESHOLD_BINARY:
        binaryThreshold(imageData, thresholdValue, value);
        break;
      case constant.THRESHOLD_BINARY_INV:
        binaryInvThreshold(imageData, thresholdValue, value);
        break;
      case constant.THRESHOLD_TRUNC:
        truncThreshold(imageData, thresholdValue);
        break;
      case constant.THRESHOLD_TOZERO:
        tozeroThreshold(imageData, thresholdValue);
        break;
      case constant.THRESHOLD_TOZERO_INV:
        tozeroInvThreshold(imageData, thresholdValue);
        break;
      default:
        break;
    }
    ctx.putImageData(imageData, 0, 0);
    return canvas;
  }

  function binaryThreshold(imageData, thresholdValue, value) {
    var data = imageData.data;
    for(var i = 0; i < data.length; i += 4) {
      for(var j = 0; j < 3; j += 1) {
        data[i+j] = data[i+j] >= thresholdValue ? value : 0;
      }
    }
  }

  function binaryInvThreshold(imageData, thresholdValue, value) {
    var data = imageData.data;
    for(var i = 0; i < data.length; i += 4) {
      for(var j = 0; j < 3; j += 1) {
        data[i+j] = data[i+j] >= thresholdValue ? 0 : value;
      }
    }
  }

  function truncThreshold(imageData, thresholdValue) {
    var data = imageData.data;
    for(var i = 0; i < data.length; i += 4) {
      for(var j = 0; j < 3; j += 1) {
        data[i+j] = data[i+j] >= thresholdValue ? thresholdValue : data[i+j];
      }
    }
  }

  function tozeroThreshold(imageData, thresholdValue) {
    var data = imageData.data;
    for(var i = 0; i < data.length; i += 4) {
      for(var j = 0; j < 3; j += 1) {
        data[i+j] = data[i+j] >= thresholdValue ? data[i+j] : 0;
      }
    }
  }

  function tozeroInvThreshold(imageData, thresholdValue) {
    var data = imageData.data;
    for(var i = 0; i < data.length; i += 4) {
      for(var j = 0; j < 3; j += 1) {
        data[i+j] = data[i+j] >= thresholdValue ? 0 : data[i+j];
      }
    }
  }

  function mask(image, lower, upper) {
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    canvas.width = image.width;
    canvas.height = image.height;
    ctx.drawImage(image, 0, 0);

    var imageData = ctx.getImageData(0, 0, image.width, image.height);
    return inRagne(imageData.data, lower, upper);;
  }

  function masking(image, maskImage, mask) {
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    canvas.width = image.width;
    canvas.height = image.height;
    ctx.drawImage(image, 0, 0);

    var maskCanvas = document.createElement('canvas');
    var maskCtx = maskCanvas.getContext('2d');
    maskCanvas.width = image.width;
    maskCanvas.height = image.height;
    maskCtx.drawImage(maskImage, 0, 0);

    var imageData = ctx.getImageData(0, 0, maskImage.width, maskImage.height);
    var maskImageData = maskCtx.getImageData(0, 0, maskImage.width, maskImage.height);

    _maskingFromData(imageData.data, maskImageData.data, mask);
    ctx.putImageData(imageData, 0, 0);
    return canvas;
  }

  function _maskingFromData(data, maskData, mask) {
    for(var i = 0; i < data.length; i += 4) {
      var m = Math.min(mask[i], mask[i+1], mask[i+2], mask[i+3]);
      data[i] = m === 1 ? maskData[i] : data[i];
      data[i+1] = m === 1 ? maskData[i+1] : data[i+2];
      data[i+2] = m === 1 ? maskData[i+2] : data[i+2];
      // data[i+3] = maskData[i+3] * m : data[i+3];
    }
  }

  constant.ADAPTIVE_THRESH_MEAN_C = 'ADAPTIVE_THRESH_MEAN_C';
  constant.ADAPTIVE_THRESH_GAUSSIAN_C = 'ADAPTIVE_THRESH_GAUSSIAN_C';

  function adaptiveThresholding(image, value, adaptiveMethodFlag, flag, blocksize, C, radius) {
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    canvas.width = image.width;
    canvas.height = image.height;
    ctx.drawImage(image, 0, 0);

    var imageData = ctx.getImageData(0, 0, image.width, image.height);

    if (adaptiveMethodFlag === constant.ADAPTIVE_THRESH_GAUSSIAN_C) {
      if (!window.StackBlur) {
        return canvas;
      }

      var cloneImageData = copyImageData(imageData);
      gaussianCache = window.StackBlur.imageDataRGB(cloneImageData, 0, 0, cloneImageData.width, cloneImageData.height, radius);
    }

    if (blocksize % 2 === 0) {
      blocksize++;
    }

    switch (flag) {
      case constant.THRESHOLD_BINARY:
        imageData = binaryAdaptiveThreshold(imageData, adaptiveMethodFlag, blocksize, C, value);
        break;
      case constant.THRESHOLD_BINARY_INV:
        imageData = binaryInvAdaptiveThreshold(imageData, adaptiveMethodFlag, blocksize, C, value);
        break;
      case constant.THRESHOLD_TRUNC:
        imageData = truncAdaptiveThreshold(imageData, adaptiveMethodFlag, blocksize, C);
        break;
      case constant.THRESHOLD_TOZERO:
        imageData = tozeroAdaptiveThreshold(imageData, adaptiveMethodFlag, blocksize, C);
        break;
      case constant.THRESHOLD_TOZERO_INV:
        imageData = tozeroInvAdaptiveThreshold(imageData, adaptiveMethodFlag, blocksize, C);
        break;
      default:
        break;
    }
    ctx.putImageData(imageData, 0, 0);
    gaussianCache = null;
    return canvas;
  }

  function binaryAdaptiveThreshold(imageData, adaptiveMethodFlag, blocksize, C, value) {
    var clone = copyImageData(imageData);
    var data = clone.data;
    var w = imageData.width;
    var h = imageData.height;

    for (var x = 0; x < w; x++) {
      for (var y = 0; y < h; y ++) {
        // for(var channel = 0; channel < 3; channel += 1) {
        //   var threshold = adaptiveThreshold(imageData, adaptiveMethodFlag, blocksize, C, x, y, channel);
        //   var index = getPixelIndex(w, x, y, channel);
        //   data[index] = data[index] >= threshold ? value : 0;
        // }
        var threshold = adaptiveThreshold(imageData, adaptiveMethodFlag, blocksize, C, x, y, 0);
        var index = getPixelIndex(w, x, y, 0);
        var d = data[index] >= threshold ? value : 0;
        data[index] = d;
        data[index+1] = d;
        data[index+2] = d;
      }
    }
    return clone;
  }

  function copyImageData(src) {
      var dst = offscreenCtx.createImageData(src.width, src.height);
      dst.data.set(src.data);
      return dst;
  }

  function adaptiveThreshold(imageData, adaptiveMethodFlag, blocksize, C, x, y, channel) {
    if (adaptiveMethodFlag === constant.ADAPTIVE_THRESH_MEAN_C) {
      return getMeanThreshold(imageData, adaptiveMethodFlag, blocksize, C, x, y, channel);
    } else if (adaptiveMethodFlag === constant.ADAPTIVE_THRESH_GAUSSIAN_C) {
      return getGaussianThreshold(imageData, adaptiveMethodFlag, blocksize, C, x, y, channel);
    }
  }

  function getMeanThreshold(imageData, adaptiveMethodFlag, blocksize, C, x, y, channel) {
    var data = imageData.data;
    var w = imageData.width;
    var h = imageData.height;
    var sum = 0;
    var cnt = 0;

    var offset = Math.floor(blocksize * 0.5);
    var start = -offset;
    var end = blocksize - offset;

    for (var i = start; i < end; i++) {
      for (var j = start; j < end; j++) {
        if (x + i < 0 ||
            y + j < 0 ||
            x + i > w ||
            y + j > h) {
          continue;
        }
        var index = getPixelIndex(w, x + i, y + j, channel);
        cnt++;
        sum += data[index];
      }
    }
    
    return sum / cnt - C;
  }

  function getPixelIndex(width, x, y, channel) {
    return (y * width + x) * 4 + channel;
  }

  function getGaussianThreshold(imageData, adaptiveMethodFlag, blocksize, C, x, y, channel) {
    var index = getPixelIndex(imageData.width, x, y, channel);
    return gaussianCache.data[index];
  }

  function binaryInvAdaptiveThreshold(imageData, adaptiveMethodFlag, blocksize, C, value) {
    var clone = copyImageData(imageData);
    var data = clone.data;
    var w = imageData.width;
    var h = imageData.height;

    for (var x = 0; x < w; x++) {
      for (var y = 0; y < h; y ++) {
        // for(var channel = 0; channel < 3; channel += 1) {
        //   var threshold = adaptiveThreshold(imageData, adaptiveMethodFlag, blocksize, C, x, y, channel);
        //   var index = getPixelIndex(w, x, y, channel);
        //   data[index] = data[index] >= threshold ? 0 : value;
        // }
        var threshold = adaptiveThreshold(imageData, adaptiveMethodFlag, blocksize, C, x, y, 0);
        var index = getPixelIndex(w, x, y, 0);
        var d = data[index] >= threshold ? 0 : value;
        data[index] = d;
        data[index+1] = d;
        data[index+2] = d;
      }
    }
    return clone;
  }

  function truncAdaptiveThreshold(imageData, adaptiveMethodFlag, blocksize, C) {
    var clone = copyImageData(imageData);
    var data = clone.data;
    var w = imageData.width;
    var h = imageData.height;

    for (var x = 0; x < w; x++) {
      for (var y = 0; y < h; y ++) {
        // for(var channel = 0; channel < 3; channel += 1) {
        //   var threshold = adaptiveThreshold(imageData, adaptiveMethodFlag, blocksize, C, x, y, channel);
        //   var index = getPixelIndex(w, x, y, channel);
        //   data[index] = data[index] >= threshold ? threshold : data[index];
        // }
        var threshold = adaptiveThreshold(imageData, adaptiveMethodFlag, blocksize, C, x, y, 0);
        var index = getPixelIndex(w, x, y, 0);
        var d = data[index] >= threshold ? threshold : data[index];
        data[index] = d;
        data[index+1] = d;
        data[index+2] = d;
      }
    }
    return clone;
  }

  function tozeroAdaptiveThreshold(imageData, adaptiveMethodFlag, blocksize, C) {
    var clone = copyImageData(imageData);
    var data = clone.data;
    var w = imageData.width;
    var h = imageData.height;

    for (var x = 0; x < w; x++) {
      for (var y = 0; y < h; y ++) {
        // for(var channel = 0; channel < 3; channel += 1) {
        //   var threshold = adaptiveThreshold(imageData, adaptiveMethodFlag, blocksize, C, x, y, channel);
        //   var index = getPixelIndex(w, x, y, channel);
        //   data[index] = data[index] >= threshold ? data[index] : 0;
        // }
        var threshold = adaptiveThreshold(imageData, adaptiveMethodFlag, blocksize, C, x, y, 0);
        var index = getPixelIndex(w, x, y, 0);
        var d = data[index] >= threshold ? data[index] : 0;
        data[index] = d;
        data[index+1] = d;
        data[index+2] = d;
      }
    }
    return clone;
  }

  function tozeroInvAdaptiveThreshold(imageData, adaptiveMethodFlag, blocksize, C) {
    var clone = copyImageData(imageData);
    var data = clone.data;
    var w = imageData.width;
    var h = imageData.height;

    for (var x = 0; x < w; x++) {
      for (var y = 0; y < h; y ++) {
        // for(var channel = 0; channel < 3; channel += 1) {
        //   var threshold = adaptiveThreshold(imageData, adaptiveMethodFlag, blocksize, C, x, y, channel);
        //   var index = getPixelIndex(w, x, y, channel);
        //   data[index] = data[index] >= threshold ? 0 : data[index];
        // }
        var threshold = adaptiveThreshold(imageData, adaptiveMethodFlag, blocksize, C, x, y, 0);
        var index = getPixelIndex(w, x, y, 0);
        var d = data[index] >= threshold ? 0 : data[index];
        data[index] = d;
        data[index+1] = d;
        data[index+2] = d;
      }
    }
    return clone;
  }

  function adaptiveThresholdingTest(image, value, blocksize, C, x, y) {
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    canvas.width = image.width;
    canvas.height = image.height;
    ctx.drawImage(image, 0, 0);

    var imageData = ctx.getImageData(0, 0, image.width, image.height);
    binaryAdaptiveThresholdTest(imageData, value, blocksize, C, x, y);
    ctx.putImageData(imageData, 0, 0);
    return canvas;
  }

  function binaryAdaptiveThresholdTest(imageData, value, blocksize, C, x, y) {
    // var clone = copyImageData(imageData);
    // var data = clone.data;
    var data = imageData.data;
    var w = imageData.width;
    var h = imageData.height;

    for(var j = 0; j < 3; j += 1) {
      var threshold = adaptiveThresholdTest(imageData, value, blocksize, C, x, y, j);
      var index = getPixelIndex(w, x, y, j); 
      data[index] = data[index] >= threshold ? value : 0;      
    }
    // return clone;
  }

  function adaptiveThresholdTest(imageData, blocksize, C, x, y, channel) {
    var threshold;
    var data = imageData.data;
    var w = imageData.width;
    var h = imageData.height;
    var sum = 0;
    var cnt = 0;

    var offset = Math.floor(blocksize * 0.5);
    var start = -offset;
    var end = blocksize - offset;

    for (var i = start; i < end; i++) {
      for (var j = start; j < end; j++) {
        if (x + i < 0 ||
            y + j < 0 ||
            x + i > w ||
            y + j > h) {
          continue;
        }
        var index = getPixelIndex(w, x + i, y + j, channel);          
        cnt ++
        sum += data[index];
        // data[index] = 0;
      }
    }
    threshold = sum / cnt - C;
    return threshold;
  }

  return {
    'constant': constant,
    'grayscale': grayscale,
    'channel': channel,
    'merge': merge,
    'getPixelColor': getPixelColor,
    'filterHSL': filterHSL,
    'filterHSLTest': filterHSLTest,
    'threshold': threshold,
    'mask': mask,
    'masking': masking,
    'adaptiveThresholding': adaptiveThresholding,
    'adaptiveThresholdingTest': adaptiveThresholdingTest,
  };
})();