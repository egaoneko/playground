let key;

self.importScripts('https://cdnjs.cloudflare.com/ajax/libs/three.js/108/three.min.js');
self.addEventListener('message', function (e) {
  const type = e.data.type;

  if (type === 'canvas') {
    const canvas = e.data.canvas;
    new Particles(canvas);
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

// https://github.com/mrdoob/three.js/blob/master/examples/webgl_buffergeometry_points.html
class Particles {
  constructor(container, option) {
    if (!container) {
      return;
    }

    option = Object.assign({
      width: 300,
      height: 300,
      ratio: 1,
    }, option);

    this.container = container;
    this.width = option.width;
    this.height = option.height;
    this.ratio = option.ratio;

    this.init();
    this.animate();
  }

  init() {
    if (this.container.width !== this.width || this.container.width !== this.height) {
      this.container.width = this.width;
      this.container.height = this.height;
    }

    this.camera = new THREE.PerspectiveCamera(27, this.width / this.height, 5, 3500);
    this.camera.position.z = 2750;
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x050505);
    this.scene.fog = new THREE.Fog(0x050505, 2000, 3500);

    const particles = 500000;
    const geometry = new THREE.BufferGeometry();
    const positions = [];
    const colors = [];
    const color = new THREE.Color();
    const n = 1000, n2 = n / 2; // particles spread in the cube
    for (let i = 0; i < particles; i++) {
      // positions
      const x = Math.random() * n - n2;
      const y = Math.random() * n - n2;
      const z = Math.random() * n - n2;
      positions.push(x, y, z);
      // colors
      const vx = (x / n) + 0.5;
      const vy = (y / n) + 0.5;
      const vz = (z / n) + 0.5;
      color.setRGB(vx, vy, vz);
      colors.push(color.r, color.g, color.b);
    }
    geometry.addAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geometry.addAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    geometry.computeBoundingSphere();

    const material = new THREE.PointsMaterial({size: 15, vertexColors: THREE.VertexColors});
    this.points = new THREE.Points(geometry, material);
    this.scene.add(this.points);

    this.renderer = new THREE.WebGLRenderer({ canvas: this.container });
    this.renderer.setPixelRatio(this.ratio);
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));
    this.render();
  }

  render() {
    const time = Date.now() * 0.001;
    this.points.rotation.x = time * 0.25;
    this.points.rotation.y = time * 0.5;
    this.renderer.render(this.scene, this.camera);
  }
}



