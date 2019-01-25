// https://github.com/andywer/threadpool-js/blob/master/src/genericWorker.js

/*eslint-disable */
const genericWorkerCode =
  'this.onmessage = function (event) {' +
  '  var fnData = event.data.function;' +
  '  var scripts = event.data.importScripts;'+
  '  var fn = Function.apply(null, fnData.args.concat(fnData.body));' +
  '  if (importScripts && scripts.length > 0) {' +
  '    importScripts.apply(null, scripts);' +
  '  }' +
  '  fn(event.data.parameter, function(result) {' +
  '    postMessage(result);' +
  '  });' +
  '}';
/*eslint-enable */

let genericWorkerDataUri = 'data:text/javascript;charset=utf-8,' + encodeURI(genericWorkerCode);
let createBlobURL = window.createBlobURL || window.createObjectURL;

if (!createBlobURL) {
  const URL = window.URL || window.webkitURL;

  if (URL) {
    createBlobURL = URL.createObjectURL;
  } else {
    throw new Error('No Blob creation implementation found.');
  }
}

if (typeof window.BlobBuilder === 'function' && typeof createBlobURL === 'function') {
  const blobBuilder = new window.BlobBuilder();
  blobBuilder.append(genericWorkerCode);
  genericWorkerDataUri = createBlobURL(blobBuilder.getBlob());
} else if (typeof Blob === 'function' && typeof createBlobURL === 'function') {
  const blob = new Blob([ genericWorkerCode ], { type: 'text/javascript' });
  genericWorkerDataUri = createBlobURL(blob);
}

export default {
  dataUri: genericWorkerDataUri,
  genericWorkerCode: genericWorkerCode
};
