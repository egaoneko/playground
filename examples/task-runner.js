import {sleep} from "./utils/common";
import {randomInt} from "../src/pg/utils/math";
import {Task, TASK_PRIORITY, TaskRunner} from "./utils/task-runner";

let chart;
let taskRunner;

function init() {
  const container = document.getElementById('container');
  const width = container.clientWidth;
  const height = container.clientHeight;

  const canvas = document.getElementById('chart');
  const ctx = canvas.getContext('2d');

  canvas.width = width;
  canvas.height = height;

  const chartUpdate = _.throttle(() => {
    chart.data.datasets[0].data = taskRunner.status.map(s => s.queue);
    chart.update();
  }, 100);
  taskRunner = new TaskRunner();
  taskRunner.on('task:enroll', chartUpdate);
  taskRunner.on('task:process', chartUpdate);

  chart = new Chart(ctx, {
    type: 'horizontalBar',
    data: {
      labels: ["ESSENTIAL", "CRITICAL", "NORMAL", "IDLE"],
      datasets: [{
        label: '# of tasks',
        data: taskRunner.status.map(s => s.queue),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(75, 192, 192, 0.2)',
        ],
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(255, 206, 86, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        xAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });

  Object.values(TASK_PRIORITY).forEach(p => {
    const button = document.getElementById(p.key.toLowerCase());

    if (!button) {
      return;
    }

    button.addEventListener('click', () => {
      const promises = [];
      const size = randomInt(100, 1000);
      for (let i = 0; i < size; i++) {
        promises.push(taskRunner.enroll(p, getTask()));
      }
      Promise.all(promises).then(() => console.log(`${p.key} finished`))
    });
  });

  function getTask() {
    return new Task(() => {
      sleep(randomInt(1, 4))
    });
  }
}

init();

window.DEBUG = {
  taskRunner: taskRunner
};
