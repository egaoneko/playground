function sleep(delay) {
  var start = new Date().getTime();
  while (new Date().getTime() < start + delay) {
    console.log('Sleeping with worker!');
  }
}
self.addEventListener('message', function(e) {
  console.log(e.data);
  sleep(3000);
  self.postMessage('Worker to Main message.');
});