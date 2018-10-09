import {randomInt} from '../src/pg/utils/math';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const mouse = {
  x: 10,
  y: 10
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
let bomb = 0;
let bombDistance = 0;

canvas.addEventListener('mousemove', (event) => {
  mouse.x = event.x;
  mouse.y = event.y;
});

canvas.addEventListener('click', () => {
  bomb = randomInt(100, 500);
});

window.addEventListener('resize', () => {
  resize();
});

class Particle {
  constructor(x, y, velocity, radius, color) {
    this.x = x;
    this.y = y;
    this.velocity = velocity;
    this.radius = radius;
    this.color = color;
    this.radians = Math.random() * Math.PI * 2;
    this.opacity = 0;
    const distance = randomInt(50, 120);
    this.distance = {
      x: distance,
      y: distance
    };
    this.lastMouse = {
      x,
      y,
    }
  }

  draw(lastPoint) {
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.radius;
    ctx.moveTo(lastPoint.x, lastPoint.y);
    ctx.lineTo(this.x, this.y);
    ctx.stroke();
    ctx.closePath();
  }

  update() {
    const lastPoint = {
      x: this.x,
      y: this.y
    };

    this.radians += this.velocity;

    // Drag effect
    this.lastMouse.x += (mouse.x - this.lastMouse.x) * 0.05;
    this.lastMouse.y += (mouse.y - this.lastMouse.y) * 0.05;

    // Circular motion
    this.x = this.lastMouse.x + Math.cos(this.radians) * (this.distance.x + bombDistance);
    this.y = this.lastMouse.y + Math.sin(this.radians) * (this.distance.y + bombDistance);

    this.draw(lastPoint);
  }
}

let particles = [];

function init() {
  mouse.x = canvas.width * 0.5;
  mouse.y = canvas.height * 0.5;

  particles = [];

  for (let i = 0; i < 100; i++) {
    const radius = randomInt(1, 2);
    const x = canvas.width * 0.5;
    const y = canvas.height * 0.5;
    const velocity = randomInt(3, 8) * 0.01;
    const color = colorSet[randomInt(0, colorSet.length)];

    particles.push(new Particle(x, y, velocity, radius, color));
  }
}

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function animate() {
  ctx.fillStyle = 'rgba(40, 42, 54, 0.1)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  particles.forEach(particle => particle.update());

  if (bomb !== 0 && bombDistance > bomb) {
    bomb = 0;
  } else if (bomb > 0) {
    bombDistance += 2;
  } else if (bombDistance > bomb) {
    bombDistance -= 1;
  } else if (bombDistance < 0) {
    bombDistance = 0;
  }

  requestAnimationFrame(animate);
}

resize();
init();
animate();
