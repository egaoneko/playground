const logAreaElement = document.querySelector('#log-area');
const timeBoxElement = document.querySelector('#time-box');

requestAnimationFrame(updateTimeBox);

function updateTimeBox() {
  timeBoxElement.innerText = new Date();
  requestAnimationFrame(updateTimeBox);
}

const sleep1BtnElement = document.querySelector('#sleep1-btn');

sleep1BtnElement.addEventListener('click', function () {
  logAreaElement.innerHTML += 'Sleep without worker!\n';
  sleep(3000);
});

function sleep(delay) {
  const start = new Date().getTime();
  console.log('Sleeping without worker!');
  while (new Date().getTime() < start + delay);
}

const sleep2BtnElement = document.querySelector('#sleep2-btn');

sleep2BtnElement.addEventListener('click', function () {
  logAreaElement.innerHTML += 'Sleep with worker!\n';
  const worker = new Worker('data/worker/basic.js');
  worker.addEventListener('message', function (e) {
    console.log(e.data);
    worker.terminate();
  });
  worker.postMessage('Main to Worker message.');
});
