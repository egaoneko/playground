import {randomInt} from '../src/pg/utils/math';

const GRAVITY = 1;
const FRICTION = 0.79;

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const mouse = {
  x: undefined,
  y: undefined
};
const colorSet = [
  '#8be9fd',
  '#50fa7b',
  '#ffb86c',
  '#ff79c6',
  '#bd93f9',
  '#ff5555',
  '#f1fa8c',
];

canvas.addEventListener('mousemove', (event) => {
  mouse.x = event.x;
  mouse.y = event.y;
});

canvas.addEventListener('click', () => {
  init();
});

window.addEventListener('resize', () => {
  resize();
});

class Ball {
  constructor(x, y, dx, dy, radius, color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  update() {
    if (this.x + this.radius + this.dx >= canvas.width || this.x - this.radius + this.dx < 0) {
      this.dx *= -1 * FRICTION;
    }

    if (this.y + this.radius + this.dy >= canvas.height) {
      this.dy *= -1 * FRICTION;
      this.dx *= FRICTION;
    } else {
      this.dy += GRAVITY;
    }

    this.x += this.dx;
    this.y += this.dy;
    this.draw();
  }
}

let circles = [];

function init() {

  circles = [];

  for (let i = 0; i < 500; i++) {
    const radius = randomInt(8, 20);
    const x = randomInt(radius, window.innerWidth - radius);
    const dx = randomInt(-20, 20);
    const y = randomInt(radius, window.innerHeight - radius);
    const dy = randomInt(-2, 2);
    const color = colorSet[randomInt(0, colorSet.length)];

    circles.push(new Ball(x, y, dx, dy, radius, color));
  }
}

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#282a36';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  circles.forEach(circle => circle.update());
  requestAnimationFrame(animate);
}

resize();
init();
animate();
