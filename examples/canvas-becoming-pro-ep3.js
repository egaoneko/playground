const canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext('2d');

class Circle {
  constructor(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.strokeStyle = 'blue';
    ctx.stroke();
  }

  update() {
    if (this.x + this.radius > window.innerWidth || this.x - this.radius < 0) {
      this.dx *= -1;
    }

    if (this.y + this.radius > window.innerHeight || this.y - this.radius < 0) {
      this.dy *= -1;
    }

    this.x += this.dx;
    this.y += this.dy;
    this.draw();
  }
}

const circles = [];
for (let i = 0; i < 100; i++) {
  let radius = 30;
  let x = Math.random() * (window.innerWidth - radius * 2) + radius;
  let dx = (Math.random() - 0.5) * 10; // for if random 0
  let y = Math.random() * (window.innerHeight - radius * 2) + radius;
  let dy = (Math.random() - 0.5) * 10;

  circles.push(new Circle(x, y, dx, dy, radius));
}

function animate() {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  circles.forEach(circle => circle.update());
  requestAnimationFrame(animate);
}

animate();
