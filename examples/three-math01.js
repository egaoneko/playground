// three
let renderer;
let scene;
let camera;
let width;
let height;
let container;

// math
const props = {
  segments: 100,
  xMin: -25,
  xMax: 25,
  yMin: -25,
  yMax: 25
};

init();
animate();

function init() {
  container = document.getElementById('container');
  width = container.clientWidth;
  height = container.clientHeight;

  // scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);

  // camera
  camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
  camera.position.set(50, 80, 130);
  camera.lookAt(0, 0, 0);

  // helper
  const grid = new THREE.GridHelper(200, 20);
  scene.add(grid);

  const axes = new THREE.AxesHelper(100);
  axes.position.set(0, 0, 0);
  scene.add(axes);

  // renderer
  renderer = new THREE.WebGLRenderer({antialias: true});
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);
  container.appendChild(renderer.domElement);

  // controls
  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.screenSpacePanning = true;

  draw();

  window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
  width = container.clientWidth;
  height = container.clientHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
}

function animate() {
  requestAnimationFrame(animate);
  render();
}

function render() {
  renderer.render(scene, camera);
}

function draw() {
  createGraph([
    [1, 0, 1.65],
    [0, 1, 1]
  ]);
}

function createGraph(A) {
  let X = generateX(props.xMin, props.xMax, props.yMin, props.yMax, props.segments);

  A = math.transpose(A);
  X = math.transpose(X);

  const B = math.transpose(math.multiply(A, X));
  const geom = new THREE.Geometry();
  const material = new THREE.PointsMaterial({color: 0xffff77, size: 2, sizeAttenuation: false});

  B.forEach(b => {
    geom.vertices.push(new THREE.Vector3(b[0], b[1], b[2]));
  });

  const cloud = new THREE.Points(geom, material);
  scene.add(cloud)
}

function generateX(xMin, xMax, yMin, yMax, segments) {
  const X = [];
  const xSegments = (xMax - xMin) / segments;
  const ySegments = (yMax - yMin) / segments;

  for (let x = xMin; x <= xMax; x += xSegments) {
    for (let y = yMin; y <= yMax; y += ySegments) {
      X.push([x, y]);
    }
  }

  return X;
}
