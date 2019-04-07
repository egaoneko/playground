const app = initApp('#container');
const basis = generateBasis(app);

drawGrid(app, basis);

function initApp(id) {
  const container = document.querySelector(id);
  const width = container.clientWidth;
  const height = container.clientHeight;
  const app = new PIXI.Application(width, height, {backgroundColor: 0x282a36});

  container.appendChild(app.view);
  return app;
}

function generateBasis(app) {
  const {width, height} = app.screen;
  return new PIXI.Matrix(1, 0, 0, -1, width * 0.5, height * 0.5);
}

function drawGrid(app, basis) {
  const graphics = new PIXI.Graphics();
  const {width, height} = app.screen;

  graphics.lineStyle(1, 0xf8f8f2, 1);
  graphics.moveTo(0, height * 0.5);
  graphics.lineTo(width, height * 0.5);
  graphics.moveTo(width * 0.5, 0);
  graphics.lineTo(width * 0.5, height);

  const point = new PIXI.Point(100, 100);

  let p = basis.apply(point);
  graphics.lineStyle(0); // draw a circle, set the lineStyle to zero so the circle doesn't have an outline
  graphics.beginFill(0xDE3249, 1);
  graphics.drawCircle(p.x, p.y, 50);
  graphics.endFill();

  app.stage.addChild(graphics);
}
