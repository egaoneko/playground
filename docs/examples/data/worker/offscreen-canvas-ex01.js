let key;

self.addEventListener('message', function (e) {
  const type = e.data.type;

  if (type === 'canvas') {
    const canvas = e.data.canvas;
    new BouncingBalls(canvas, {radius: 2, size: 50});
  } else if (type === 'busy') {

    if (key || !e.data.busy) {
      clearInterval(key);
    }

    if (e.data.busy) {
      key = setInterval(() => {
        sleep(1000);
      }, 3000);
    }
  }

});

function sleep(delay) {
  const start = new Date().getTime();
  console.log('Sleeping!');
  while (new Date().getTime() < start + delay) ;
}

// http://curran.github.io/HTML5Examples/
class BouncingBalls {

  constructor(canvas, option) {
    if (!canvas) {
      return;
    }

    option = Object.assign({
      width: 300,
      height: 300,
      gravity: 0.1,
      radius: 5,
      size: 10,
      dampeningFactor: 0.99,
    }, option);

    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.width = option.width;
    this.height = option.height;
    this.gravity = option.gravity;
    this.radius = option.radius;
    this.size = option.size;
    this.dampeningFactor = option.dampeningFactor;
    this.circles = [];
    this.initializeCircles();

    // Draw the first frame to start animation
    this.executeFrame()
  }

  executeFrame() {
    requestAnimationFrame(this.executeFrame.bind(this));
    this.iterateSimulation();

    this.ctx.fillStyle = 'rgba(255,255,255,0.3)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.drawCircles();
  }

  initializeCircles() {
    for (let i = 0; i < this.size; i++) {
      const circle = {
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        velocity: {x: 0, y: 0},
        color: [Math.random() * 255, Math.random() * 255, Math.random() * 255]
      };
      this.circles.push(circle);
    }
  }

  drawCircles() {
    // Resize to the screen
    if (this.canvas.width !== this.width || this.canvas.width !== this.height) {
      this.canvas.width = this.width;
      this.canvas.height = this.height;
      this.initializeCircles();
      this.iterateSimulation();
    }

    // draw rectangle border
    this.ctx.lineWidth = '3';
    this.ctx.strokeRect(0, 0, this.canvas.width, this.canvas.height);
    // draw circles
    this.circles.forEach(circle => {
      this.ctx.beginPath();
      this.ctx.arc(circle.x, circle.y, this.radius, 0, 2 * Math.PI);
      this.ctx.fillStyle = 'rgb(' + circle.color[0] + ', ' + circle.color[1] + ', ' + circle.color[2] + ')';
      this.ctx.fill();
    });
  }

  iterateSimulation() {
    for (let i = 0; i < this.size; i++) {
      const circle = this.circles[i];

      // Add gravity
      circle.velocity.y += this.gravity;

      // slows things down
      circle.velocity.x *= this.dampeningFactor;
      circle.velocity.y *= this.dampeningFactor;

      // Add velocity to position
      circle.x += circle.velocity.x;
      circle.y += circle.velocity.y;

      // Make them bounce off the floor
      if (circle.y > this.canvas.height - this.radius) {
        circle.y = this.canvas.height - this.radius;
        circle.velocity.y = -Math.abs(circle.velocity.y);
      } // bounce off ceiling
      if (circle.y < this.radius) {
        circle.y = this.radius;
        circle.velocity.y = Math.abs(circle.velocity.y);
      } // bounce off right wall
      if (circle.x > this.canvas.width - this.radius) {
        circle.x = this.canvas.width - this.radius;
        circle.velocity.x = -Math.abs(circle.velocity.x);
      } // bounce off left wall
      if (circle.x < this.radius) {
        circle.x = this.radius;
        circle.velocity.x = Math.abs(circle.velocity.x);
      }

      // REPULSION between circles
      for (let j = i + 1; j < this.size; j++) {
        const circle2 = this.circles[j];
        const dx = circle2.x - circle.x;
        const dy = circle2.y - circle.y;
        let d = Math.sqrt(dx * dx + dy * dy);

        if (d < 2 * this.radius) {
          if (d === 0) {
            d = 0.1;
          }
          const unitX = dx / d;
          const unitY = dy / d;

          const force = -2;

          const forceX = unitX * force;
          const forceY = unitY * force;

          circle.velocity.x += forceX;
          circle.velocity.y += forceY;

          circle2.velocity.x -= forceX;
          circle2.velocity.y -= forceY;
        }
      }
    }
  }
}
