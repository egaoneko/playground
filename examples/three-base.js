let renderer;
let stats;
let scene;
let camera;
let width;
let height;

init();
animate();

function init() {
  const container = document.getElementById('container');
  width = container.clientWidth;
  height = container.clientHeight;

  // scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xb0b0b0);

  // camera
  camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
  camera.position.set(500, 800, 1300);
  camera.lookAt(0, 0, 0);

  // helper
  const grid = new THREE.GridHelper(2000, 20);
  scene.add(grid);

  const axes = new THREE.AxesHelper(1000);
  axes.position.set(0, 0, 0);
  scene.add(axes);

  // renderer
  renderer = new THREE.WebGLRenderer({antialias: true});
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);
  container.appendChild(renderer.domElement);

  // contorols
  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.screenSpacePanning = true;

  initStats();
  window.addEventListener('resize', onWindowResize, false);
}

function initStats() {
  stats = new Stats();
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.left = '0';
  stats.domElement.style.top = '0';
  container.appendChild(stats.domElement);
}

function onWindowResize() {
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
}

function animate() {
  requestAnimationFrame(animate);
  render();
  stats.update();
}

function render() {
  renderer.render(scene, camera);
}
