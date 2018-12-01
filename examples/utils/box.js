export default class Box {
  constructor(container, option) {
    if (!container) {
      return;
    }

    option = Object.assign({
      width: 300,
      height: 300,
      ratio: 1,
      images: []
    }, option);

    this.container = container;
    this.width = option.width;
    this.height = option.height;
    this.ratio = option.ratio;
    this.images = option.images;

    this.init();
    this.animate();
  }

  init() {
    // Resize to the screen
    if (this.container.width !== this.width || this.container.width !== this.height) {
      this.container.width = this.width;
      this.container.height = this.height;
    }

    this.camera = new THREE.PerspectiveCamera(45, this.width / this.height, 0.1, 1000);
    this.camera.position.x = 0;
    this.camera.position.y = 12;
    this.camera.position.z = 28;
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));

    this.scene = new THREE.Scene();

    const ambiLight = new THREE.AmbientLight(0x141414);
    this.scene.add(ambiLight);

    const light = new THREE.DirectionalLight();
    light.position.set(0, 30, 20);
    this.scene.add(light);

    this.cube = this.createMesh(new THREE.BoxGeometry(10, 10, 10), this.images);
    this.scene.add(this.cube);
    console.log(this.cube.geometry.faceVertexUvs);

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.container,
      alpha: true,
    });
    this.renderer.setClearColor(0xFFFFFFF, 0.2);
    this.renderer.setPixelRatio(this.ratio);
    this.renderer.shadowMapEnabled = true;
  }

  createMesh(geom, images) {
    let mat;
    if (images.length === 6) {
      mat = new THREE.MeshFaceMaterial(images.map(image => this.createMaterial(image)));
    } else {
      mat = this.createMaterial(images[0]);
    }
    return new THREE.Mesh(geom, mat);
  }

  createMaterial(image) {
    let texture;

    if (typeof image === 'string') {
      texture = new THREE.TextureLoader().load(image);
    } else {
      texture = new THREE.CanvasTexture(image);
    }

    const mat = new THREE.MeshPhongMaterial();
    mat.map = texture;
    return mat;
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));
    this.render();
  }

  render() {
    const time = Date.now() * 0.001;
    this.cube.rotation.x = time * 0.25;
    this.cube.rotation.y = time * 0.5;
    this.renderer.render(this.scene, this.camera);
  }

  resize(width, height) {
    this.width = width;
    this.height = height;

    if (this.container.width !== this.width || this.container.width !== this.height) {
      this.container.width = this.width;
      this.container.height = this.height;
    }

    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.width, this.height);
  }
}


