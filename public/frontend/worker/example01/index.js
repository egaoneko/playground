window.addEventListener('load', function(){
  var logAreaElement = document.querySelector('#log_area');

  var timeBoxElement = document.querySelector('#time_box');

  requestAnimationFrame(updateTimeBox);
  function updateTimeBox() {
    timeBoxElement.innerText = new Date();
    requestAnimationFrame(updateTimeBox);
  }

  var sleep1BtnElement = document.querySelector('#sleep1_btn');

  sleep1BtnElement.addEventListener('click', function(){
    logAreaElement.innerHTML += 'Sleep without worker!\n';    
    sleep(3000);
  });

  function sleep(delay, message) {
    var start = new Date().getTime();
    while (new Date().getTime() < start + delay) {
      console.log('Sleeping without worker!');
    }
  }

  var sleep2BtnElement = document.querySelector('#sleep2_btn');

  sleep2BtnElement.addEventListener('click', function(){
    logAreaElement.innerHTML += 'Sleep with worker!\n';    
    var worker = new Worker('./worker.js');
    worker.addEventListener('message', function(e) {
      console.log(e.data);
      worker.terminate();
    });
    worker.postMessage('Main to Worker message.');
  });
});