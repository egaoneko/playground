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

class Circle {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.originalColor = color;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  update() {
    this.draw();
  }

  isCollided(circle) {
    const x = this.x - circle.x;
    const y = this.y - circle.y;
    return (Math.pow(x, 2) + Math.pow(y, 2)) <= Math.pow((this.radius + circle.radius), 2);
  }
}

let circle1;
let circle2;

function init() {
  circle1 = new Circle(canvas.width * 0.5, canvas.height * 0.5, 100, colorSet[0]);
  circle2 = new Circle(10, 10, 30, colorSet[5]);
}

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#282a36';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  circle1.update();

  circle2.x = mouse.x;
  circle2.y = mouse.y;
  circle2.update();

  if (circle1.isCollided(circle2)) {
    circle1.color = circle2.color;
  } else {
    circle1.color = circle1.originalColor;
  }
  requestAnimationFrame(animate);
}

resize();
init();
animate();
