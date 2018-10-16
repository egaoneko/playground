// three
import {randomInt} from "../src/pg/utils/math";

let renderer;
let scene;
let camera;
let width;
let height;
let container;

const boxSize = 100;
const boundary = boxSize * 0.5;
const colorSet = [
  0x8be9fd,
  0x50fa7b,
  0xffb86c,
  0xff79c6,
  0xbd93f9,
  0xff5555,
  0xf1fa8c,
];
let cube;
const particles = [];

class Particle {
  constructor(x, y, z, dx, dy, dz, radius, color, mass) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.velocity = {
      x: dx,
      y: dy,
      z: dz,
    };
    this.radius = radius;
    this.color = color;
    this.mass = mass;
    this.opacity = 0;

    const geometry = new THREE.SphereGeometry(radius);
    const material = new THREE.MeshBasicMaterial({color: color});
    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.position.set(this.x, this.y, this.z);
  }

  update(particles) {
    // check collided
    particles.forEach(particle => {
      if (this === particle) {
        return;
      }

      if (!this.isCollided(particle)) {
        return;
      }

      const temp = this.velocity;
      this.velocity = particle.velocity;
      particle.velocity = temp;
    });

    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.z += this.velocity.z;

    if (
      this.x + this.radius >= boundary ||
      this.x - this.radius <= -boundary
    ) {
      this.velocity.x *= -1;
    }

    if (
      this.y + this.radius >= boundary ||
      this.y - this.radius <= -boundary
    ) {
      this.velocity.y *= -1;
    }

    if (
      this.z + this.radius >= boundary ||
      this.z - this.radius <= -boundary
    ) {
      this.velocity.z *= -1;
    }

    if (this.x - this.radius < -boundary) {
      this.x = this.radius
    }

    if (this.y - this.radius < -boundary) {
      this.y = this.radius
    }

    if (this.z - this.radius < -boundary) {
      this.z = this.radius
    }

    if (this.x + this.radius > boundary) {
      this.x = boundary - this.radius;
    }

    if (this.y + this.radius > boundary) {
      this.y = boundary - this.radius;
    }

    if (this.z + this.radius > boundary) {
      this.z = boundary - this.radius;
    }

    this.mesh.position.set(this.x, this.y, this.z);
  }

  isCollided(particle) {
    const x = this.x - particle.x;
    const y = this.y - particle.y;
    const z = this.z - particle.z;
    return (Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2)) <= Math.pow((this.radius + particle.radius), 2);
  }
}

init();
animate();

function init() {
  container = document.getElementById('container');
  width = container.clientWidth;
  height = container.clientHeight;

  // scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x282a36);

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
  particles.forEach(particle => particle.update(particles));
}

function draw() {
  const geometry = new THREE.BoxGeometry(boxSize, boxSize, boxSize);
  const material = new THREE.MeshBasicMaterial({color: 0xfffffff, opacity: 0.2, transparent: true});
  const wireframe = new THREE.MeshBasicMaterial({color: 0xffffff, wireframe: true});
  cube = THREE.SceneUtils.createMultiMaterialObject(geometry, [material, wireframe]);
  scene.add(cube);

  let cnt = 0;
  for (let i = 0; i < 100; i++) {
    const radius = randomInt(1, 5);
    const x = randomInt(-boundary + radius, boundary - radius);
    const dx = randomInt(-0.5, 0.5);
    const y = randomInt(-boundary + radius, boundary - radius);
    const dy = randomInt(-0.5, 0.5);
    const z = randomInt(-boundary + radius, boundary - radius);
    const dz = randomInt(-0.5, 0.5);
    const color = colorSet[randomInt(0, colorSet.length)];

    const particle = new Particle(x, y, z, dx, dy, dz, radius, color, 1);

    if (particles.some(p => p.isCollided(particle))) {
      cnt += 1;

      if (cnt > 100) {
        continue;
      }

      i -= 1;
    } else {
      cnt = 0;
      particles.push(particle);
      scene.add(particle.mesh);
    }
  }
}
