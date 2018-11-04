import {
  randomInt,
  resolveCollision
} from '../src/pg/utils/math';

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
  constructor(x, y, dx, dy, radius, color, mass) {
    this.x = x;
    this.y = y;
    this.velocity = {
      x: dx,
      y: dy
    };
    this.radius = radius;
    this.color = color;
    this.mass = mass;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  update(balls) {
    if (
      this.x + this.radius + this.velocity.x >= canvas.width ||
      this.x - this.radius + this.velocity.x < 0
    ) {
      this.velocity.x *= -1 * FRICTION;
    }

    if (this.y + this.radius + this.velocity.y >= canvas.height) {
      this.velocity.y *= -1 * FRICTION;
      this.velocity.x *= FRICTION;
    } else {
      this.velocity.y += GRAVITY;
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

    // check collided
    balls
      .filter(ball => this !== ball)
      .filter(ball => this.isCollided(ball))
      .forEach(ball => {
        resolveCollision(this, ball);
      });

    this.draw();
  }

  isCollided(ball) {
    const x = this.x - ball.x;
    const y = this.y - ball.y;
    return (Math.pow(x, 2) + Math.pow(y, 2)) <= Math.pow((this.radius + ball.radius), 2);
  }
}

let balls = [];
let cnt = 0;

function init() {

  balls = [];

  for (let i = 0; i < 100; i++) {
    const radius = randomInt(8, 20);
    const x = randomInt(radius, window.innerWidth - radius);
    const dx = randomInt(-20, 20);
    const y = randomInt(radius, window.innerHeight - radius);
    const dy = randomInt(-2, 2);
    const color = colorSet[randomInt(0, colorSet.length)];
    const ball = new Ball(x, y, dx, dy, radius, color, 1);

    if (balls.some(b => ball.isCollided(b))) {
      cnt += 1;

      if (cnt > 100) {
        continue;
      }

      i -= 1;
    } else {
      cnt = 0;
      balls.push(ball);
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
  balls.forEach(circle => circle.update(balls));
  requestAnimationFrame(animate);
}

resize();
init();
animate();
