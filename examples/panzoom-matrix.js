const scene = document.querySelector('#scene');
const content = document.querySelector('#content');
const pz = panzoom(scene, {smoothScroll: false});
const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
const basis = svg.createSVGMatrix();
const sRect = scene.getBoundingClientRect();
const cRect = content.getBoundingClientRect();

function getBasis() {
  const {x, y, scale} = pz.getTransform();
  basis.a = scale;
  basis.b = 0;
  basis.c = 0;
  basis.d = scale;
  basis.e = x;
  basis.f = y;
  return basis;
}

function c2w(x, y) {
  const point = svg.createSVGPoint();
  point.x = x;
  point.y = y;

  const basis = getBasis();
  return point.matrixTransform(basis.inverse());
}

function w2c(x, y) {
  const point = svg.createSVGPoint();
  point.x = x;
  point.y = y;

  const basis = getBasis();
  return point.matrixTransform(basis);
}

document.querySelector('#get-center')
  .addEventListener('click', () => {
    const x = sRect.width * 0.5;
    const y = sRect.height * 0.5;
    console.log(c2w(x, y));
  });

document.querySelector('#move-to-center')
  .addEventListener('click', () => {
    const x = cRect.width * 0.5;
    const y = cRect.height * 0.5;
    const point = w2c(x, y);
    pz.moveBy(sRect.width * 0.5 - point.x, sRect.height * 0.5 - point.y);
  });

window['pz'] = pz;
