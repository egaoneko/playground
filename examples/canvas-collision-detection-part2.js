import {randomInt, resolveCollision} from '../src/pg/utils/math';

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

canvas.addEventListener('mousemove', (event) => {
  mouse.x = event.x;
  mouse.y = event.y;
});

window.addEventListener('resize', () => {
  resize();
});

class Particle {
  constructor(x, y, dx, dy, radius, color, mass) {
    this.interactiveSize = 80;

    this.x = x;
    this.y = y;
    this.velocity = {
      x: dx,
      y: dy
    };
    this.radius = radius;
    this.color = color;
    this.mass = mass;
    this.opacity = 0;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.globalAlpha = this.opacity;
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.strokeStyle = this.color;
    ctx.stroke();
  }

  update(particles) {
    this.draw();

    // check collided
    particles.forEach(particle => {
      if (this === particle) {
        return;
      }

      if (!this.isCollided(particle)) {
        return;
      }

      resolveCollision(this, particle);
    });

    if (this.x + this.radius >= window.innerWidth || this.x - this.radius <= 0) {
      this.velocity.x *= -1;
    }

    if (this.y + this.radius >= window.innerHeight || this.y - this.radius <= 0) {
      this.velocity.y *= -1;
    }

    if (this.x - this.radius < 0) {
      this.x = this.radius
    }

    if (this.y - this.radius < 0) {
      this.y = this.radius
    }

    if (this.x + this.radius > window.innerWidth) {
      this.x = window.innerWidth - this.radius;
    }

    if (this.y + this.radius > window.innerHeight) {
      this.y = window.innerHeight - this.radius;
    }

    this.x += this.velocity.x;
    this.y += this.velocity.y;

    // mouse collide
    if (
      mouse.x - this.x < this.interactiveSize &&
      mouse.x - this.x > -this.interactiveSize &&
      mouse.y - this.y < this.interactiveSize &&
      mouse.y - this.y > -this.interactiveSize &&
      this.opacity < 0.5
    ) {
      this.opacity += 0.02
    } else if (this.opacity > 0) {
      this.opacity -= 0.02;
      this.opacity = Math.max(0, this.opacity);
    }
  }

  isCollided(particle) {
    const x = this.x - particle.x;
    const y = this.y - particle.y;
    return (Math.pow(x, 2) + Math.pow(y, 2)) <= Math.pow((this.radius + particle.radius), 2);
  }
}

let particles = [];
let cnt = 0;

function init() {

  particles = [];

  for (let i = 0; i < 100; i++) {
    const radius = randomInt(8, 50);
    const x = randomInt(radius, canvas.width - radius);
    const dx = randomInt(-0.5, 0.5) * 5;
    const y = randomInt(radius, canvas.height - radius);
    const dy = randomInt(-0.5, 0.5) * 5;
    const color = colorSet[randomInt(0, colorSet.length)];
    const mass = 1;
    const particle = new Particle(x, y, dx, dy, radius, color, mass);

    if (particles.some(p => particle.isCollided(p))) {
      cnt += 1;

      if (cnt > 100) {
        continue;
      }

      i -= 1;
    } else {
      cnt = 0;
      particles.push(particle);
    }
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
  particles.forEach(particle => particle.update(particles));
  requestAnimationFrame(animate);
}

resize();
init();
animate();
