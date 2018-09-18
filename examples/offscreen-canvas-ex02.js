import Particles from "./utils/particles";

const windowCanvas = document.getElementById('canvas-window');
const workerCanvas = document.getElementById('canvas-worker');
const offscreen = workerCanvas.transferControlToOffscreen();

new Particles(windowCanvas, {ratio: window.devicePixelRatio});

const worker = new Worker('data/worker/offscreen-canvas-ex02.js');
worker.postMessage({canvas: offscreen, type: 'canvas'}, [offscreen]);

function sleep(delay) {
  const start = new Date().getTime();
  console.log('Sleeping!');
  while (new Date().getTime() < start + delay) ;
}

let key;

document.getElementById('canvas-window-check').addEventListener('change', (e) => {
  if (key || !e.target.checked) {
    clearInterval(key);
  }

  if (e.target.checked) {
    key = setInterval(() => {
      sleep(1000);
    }, 3000);
  }
});

document.getElementById('canvas-worker-check').addEventListener('change', (e) => {
  worker.postMessage({busy: e.target.checked, type: 'busy'});
});

let count = 0;
let countSpan = document.getElementById('interaction-count');
document.getElementById('interaction-btn').addEventListener('click', () => {
  countSpan.innerHTML = (++count).toString();
});
