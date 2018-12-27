// three
const VIEW_ANGLE = 45;
const NEAR = 0.1;
const FAR = 2000;

let renderer;
let scene;
let camera;
let width;
let height;
let container;
let globe;

init();
animate();

function init() {
  container = document.getElementById('container');
  width = container.clientWidth;
  height = container.clientHeight;

  // initEvent(container);

  // scene
  scene = new THREE.Scene({antialias: true});
  scene.background = new THREE.Color(0x000);
  scene.fog = new THREE.FogExp2(0x000000, 0.0003);

  // camera
  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, width / height, NEAR, FAR);
  camera.position.set(0, 0, 1000);
  // camera.lookAt(0, 0, 0);

  // light
  const pointLight = new THREE.PointLight(0xFFFFFF);
  pointLight.position.set(10, 50, 400);
  scene.add(pointLight);

  // globe
  const radius = 200;
  const segments = 50;
  const rings = 50;

  globe = new THREE.Group();
  scene.add(globe);

  const loader = new THREE.TextureLoader();
  loader.load(
    'data/img/land_ocean_ice_cloud_2048.jpg',
    (texture) => {
      // Create the sphere
      const sphere = new THREE.SphereGeometry(radius, segments, rings);

      // Map the texture to the material.
      const material = new THREE.MeshBasicMaterial({map: texture, overdraw: 0.5});

      // Create a new mesh with sphere geometry.
      const mesh = new THREE.Mesh(sphere, material);

      // Add mesh to globe
      globe.add(mesh);
    }
  );
  globe.position.set(0, 0, 0);

  // stars
  const starSize = 45000;
  const geometry = new THREE.SphereGeometry(1000, 100, 50);

  const materialOptions = {
    size: 1.0, //I know this is the default, it's for you.  Play with it if you want.
    transparency: true,
    opacity: 0.7
  };

  const material = new THREE.PointsMaterial(materialOptions);

  // The wizard gaze became stern, his jaw set, he creates the cosmos with a wave of his arms

  for (let i = 0; i < starSize; i++) {
    const vector = new THREE.Vector3();
    vector.x = Math.random() * 2000 - 1000;
    vector.y = Math.random() * 2000 - 1000;
    vector.z = Math.random() * 2000 - 1000;

    geometry.vertices.push(vector);
  }

  const stars = new THREE.Points(geometry, material);
  scene.add(stars);

  // renderer
  renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true
  });
  renderer.setClearColor(0xFFFFFFF, 0);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);

  container.appendChild(renderer.domElement);

  // controls
  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.screenSpacePanning = true;
  controls.minDistance = 500;
  controls.maxDistance = FAR;

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
