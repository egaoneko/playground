export function initApp(id) {
  const container = document.querySelector(id);
  const width = container.clientWidth;
  const height = container.clientHeight;
  const app = new PIXI.Application(width, height, {backgroundColor: 0x282a36, antialias: true});

  container.appendChild(app.view);
  return app;
}

export function generateBasis(app) {
  const {width, height} = app.screen;
  return new PIXI.Matrix(1, 0, 0, -1, width * 0.5, height * 0.5);
}

export function drawGrid(app) {
  const graphics = new PIXI.Graphics();
  const {width, height} = app.screen;

  graphics.lineStyle(1, 0xf8f8f2, 1);
  graphics.moveTo(0, height * 0.5);
  graphics.lineTo(width, height * 0.5);
  graphics.moveTo(width * 0.5, 0);
  graphics.lineTo(width * 0.5, height);

  app.stage.addChild(graphics);
}

export function drawPoints(app, basis, points, style) {
  const graphics = new PIXI.Graphics();

  points.forEach(point => {
    point = getPixiPoint(point, basis);

    graphics.lineStyle(0);
    graphics.beginFill(style.color, 1);
    graphics.drawCircle(point.x, point.y, style.size);
    graphics.endFill();
  });
  app.stage.addChild(graphics);
}

export function drawPolygon(app, basis, points, style) {
  const graphics = new PIXI.Graphics();

  graphics.lineStyle(1, style.color, 1);
  graphics.beginFill(style.color, 0.3);

  points.forEach((point, index) => {
    point = getPixiPoint(point, basis);

    if (index === 0) {
      graphics.moveTo(point.x, point.y);
    } else {
      graphics.lineTo(point.x, point.y);
    }
  });
  graphics.endFill();

  app.stage.addChild(graphics);
}

export function drawLine(app, basis, from, to, style) {
  const graphics = new PIXI.Graphics();
  from = getPixiPoint(from, basis);
  to = getPixiPoint(to, basis);

  graphics.lineStyle(2, style.color, 1);
  graphics.moveTo(from.x, from.y);
  graphics.lineTo(to.x, to.y);
  graphics.lineStyle(0);

  app.stage.addChild(graphics);
}

function getPixiPoint(point, basis) {
  point = new PIXI.Point(point.x, point.y);

  if (basis) {
    point = basis.apply(point);
  }

  return point;
}
