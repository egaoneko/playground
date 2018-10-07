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

window.addEventListener('resize', () => {
  resize();
});

class Circle {
  constructor(x, y, dx, dy, radius, color) {
    this.maxRadius = 60;
    this.minRadius = radius;
    this.interactiveSize = 100;

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
    if (this.x + this.radius >= window.innerWidth || this.x - this.radius <= 0) {
      this.dx *= -1;
    }

    if (this.y + this.radius >= window.innerHeight || this.y - this.radius <= 0) {
      this.dy *= -1;
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

    this.x += this.dx;
    this.y += this.dy;

    // interactivity
    if (
      mouse.x - this.x < this.interactiveSize &&
      mouse.x - this.x > -this.interactiveSize &&
      mouse.y - this.y < this.interactiveSize &&
      mouse.y - this.y > -this.interactiveSize
    ) {
      if (this.radius < this.maxRadius) {
        this.radius += 1;
      }
    } else if (this.radius > this.minRadius) {
      this.radius -= 1;
    }

    this.draw();
  }
}

let balls = [];

function init() {

  balls = [];

  for (let i = 0; i < 800; i++) {
    const radius = Math.random() * 10 + 1;
    const x = Math.random() * (canvas.width - radius * 2) + radius;
    const dx = (Math.random() - 0.5) * 5; // for if random 0
    const y = Math.random() * (canvas.height - radius * 2) + radius;
    const dy = (Math.random() - 0.5) * 5;
    const color = colorSet[Math.floor(Math.random() * (colorSet.length - 1))];

    balls.push(new Circle(x, y, dx, dy, radius, color));
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
  balls.forEach(circle => circle.update());
  requestAnimationFrame(animate);
}

resize();
init();
animate();
