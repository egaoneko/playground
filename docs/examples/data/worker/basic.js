function sleep(delay) {
  var start = new Date().getTime();
  console.log('Sleeping with worker!');
  while (new Date().getTime() < start + delay);
}

self.addEventListener('message', function (e) {
  console.log(e.data);
  sleep(3000);
  self.postMessage('Worker to Main message.');
});
