// three
const VIEW_ANGLE = 45;
const NEAR = 0.1;
const FAR = 2000;

// Earth
const RADIUS = 200;

let renderer;
let scene;
let camera;
let width;
let height;
let container;
let globe;
let capitals = [];

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// Proj4
proj4.defs([
  [
    'Globe',
    '+proj=longlat +a=6367470 +b=6367470 +ellps=sphere +datum=WGS84 +units=degrees'
  ]
]);
// console.log(proj4('Globe', 'EPSG:4326', [126.982512, 37.564174]));
// console.log(proj4('EPSG:4326', 'EPSG:3857', [126.982512, 37.564174]));

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
  const radius = RADIUS;
  const segments = 50;
  const rings = 50;

  globe = new THREE.Group();
  scene.add(globe);

  const loader = new THREE.TextureLoader();
  loader.load(
    'http://i.imgur.com/puZgGjm.jpg',
    (texture) => {
      // Create the sphere
      const sphere = new THREE.SphereGeometry(radius, segments, rings);

      // Map the texture to the material.
      const material = new THREE.MeshBasicMaterial({
        map: texture,
        overdraw: 0.5,
        transparent: true,
        opacity: 0.5
      });

      // Create a new mesh with sphere geometry.
      const mesh = new THREE.Mesh(sphere, material);

      // Add mesh to globe
      globe.add(mesh);
    }
  );

  // stars
  const starSize = 45000;
  const geometry = new THREE.SphereGeometry(1000, 100, 50);

  const materialOptions = {
    size: 1.0, //I know this is the default, it's for you.  Play with it if you want.
    opacity: 0.7
  };

  const material = new THREE.PointsMaterial(materialOptions);

  // The wizard gaze became stern, his jaw set, he creates the cosmos with a wave of his arms

  for (let i = 0; i < starSize; i++) {
    const vector = new THREE.Vector3();
    vector.x = (Math.random() * 1000 + 1000) * (Math.round(Math.random()) ? 1 : -1);
    vector.y = (Math.random() * 1000 + 1000) * (Math.round(Math.random()) ? 1 : -1);
    vector.z = (Math.random() * 1000 + 1000) * (Math.round(Math.random()) ? 1 : -1);

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
  controls.minDistance = 300;
  controls.maxDistance = FAR;

  window.addEventListener('resize', onWindowResize, false);
  window.addEventListener('click', onClick);
  window.addEventListener('dblclick', onDBClick);

  loadGeojson();
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
  capitals.forEach(capital => {
    if (
      globe.position.distanceTo(camera.position) < capital.position.distanceTo(camera.position)
    ) {
      capital.sphere.visible = false;
      capital.text.visible = false;
    } else {
      capital.sphere.visible = true;
      capital.text.visible = true;
    }
  });
}

function loadGeojson() {
  fetch('data/geojson/capitals.geojson')
    .then(response => response.json())
    .then(geojson => {
      capitals = geojson.features
        .map(feature => {
          return Object.assign(
            {},
            feature.properties,
            {
              coordinates: turf.getCoord(feature)
            }
          );
        })
        .filter(capital => capital.city);

      capitals.forEach(capital => {
        const [lng, lat] = capital.coordinates;
        // const [lng, lat] = [126.982512, 37.564174]; // Seoul
        // const [lng, lat] = [126.529541, 33.364209]; // Jeju
        // const [lng, lat] = [-73.959961, 40.725275]; // New York
        // const [lng, lat] = [-74.132116, 20.215811];
        // const [lng, lat] = proj4('Globe', 'EPSG:4326', [-74.132116, 20.215811]);

        const geometry = new THREE.SphereGeometry(1);
        const material = new THREE.MeshBasicMaterial({color: '#ff0000'});
        const sphere = new THREE.Mesh(geometry, material);
        const position = convertLngLatToVector3(lng, lat, RADIUS);

        sphere.position.copy(position);
        scene.add(sphere);
        capital.position = position;
        capital.sphere = sphere;

        const text = makeTextSprite(capital.city, {fontsize: 50});

        text.position.copy(convertLngLatToVector3(lng, lat, RADIUS + 10));
        scene.add(text);
        capital.text = text;
      });
    });

  fetch('data/geojson/countries.geojson')
    .then(response => response.json())
    .then(geojson => {
      const countries = geojson.features;
      countries.forEach(country => {
        const type = country.geometry.type;
        if (type === 'Polygon') {
          scene.add(getLineMesh(country.geometry.coordinates[0]));
        } else if (type === 'MultiPolygon') {
          country.geometry.coordinates.forEach(coordinates => scene.add(getLineMesh(coordinates[0])));
        }
      });

    });
}

function getLineMesh(coordinates) {
  const material = new THREE.LineBasicMaterial({color: 0xffffff});
  const geometry = new THREE.Geometry();

  coordinates.forEach(coordinate => {
    const [lng, lat] = coordinate;
    const position = convertLngLatToVector3(lng, lat, RADIUS);
    geometry.vertices.push(position);
  });
  return new THREE.Line(geometry, material);
}

function makeTextSprite(message, parameters) {
  if (parameters === undefined) parameters = {};

  const fontface = parameters.hasOwnProperty('fontface') ? parameters['fontface'] : 'Arial';
  const fontsize = parameters.hasOwnProperty('fontsize') ? parameters['fontsize'] : 18;
  const borderThickness = parameters.hasOwnProperty('borderThickness') ? parameters['borderThickness'] : 4;
  const borderColor = parameters.hasOwnProperty('borderColor') ? parameters['borderColor'] : {r: 0, g: 0, b: 0, a: 1.0};
  const backgroundColor = parameters.hasOwnProperty('backgroundColor') ? parameters['backgroundColor'] : {
    r: 255,
    g: 255,
    b: 255,
    a: 1.0
  };
  const textColor = parameters.hasOwnProperty('textColor') ? parameters['textColor'] : {r: 0, g: 0, b: 0, a: 1.0};

  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  context.font = 'Bold ' + fontsize + 'px ' + fontface;
  const metrics = context.measureText(message);
  const textWidth = metrics.width;

  context.fillStyle = 'rgba(' + backgroundColor.r + ',' + backgroundColor.g + ',' + backgroundColor.b + ',' + backgroundColor.a + ')';
  context.strokeStyle = 'rgba(' + borderColor.r + ',' + borderColor.g + ',' + borderColor.b + ',' + borderColor.a + ')';

  context.lineWidth = borderThickness;
  roundRect(context, borderThickness / 2, borderThickness / 2, (textWidth + borderThickness) * 1.1, fontsize * 1.4 + borderThickness, 8);

  context.fillStyle = 'rgba(' + textColor.r + ', ' + textColor.g + ', ' + textColor.b + ', 1.0)';
  context.fillText(message, borderThickness, fontsize + borderThickness);

  const texture = new THREE.Texture(canvas);
  texture.needsUpdate = true;

  const spriteMaterial = new THREE.SpriteMaterial({map: texture});
  const sprite = new THREE.Sprite(spriteMaterial);
  sprite.scale.set(0.5 * fontsize, 0.25 * fontsize, 0.75 * fontsize);
  return sprite;
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
}

function onClick(event) {
  // mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
  // mouse.y = -(event.clientY / renderer.domElement.clientHeight) * 2 + 1;
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObject(globe, true);

  for (let i = 0; i < intersects.length; i++) {
    console.log(convertVector3ToLngLat(intersects[i].point));
  }
}

function onDBClick(event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObject(globe, true);

  for (let i = 0; i < intersects.length; i++) {
    const geometry = new THREE.SphereGeometry(0.5);
    const material = new THREE.MeshBasicMaterial({color: '#ff0000'});
    const sphere = new THREE.Mesh(geometry, material);
    sphere.position.copy(intersects[i].point);
    scene.add(sphere);
  }
}

function convertLngLatToVector3(lng, lat, radius) {
  const phi = deg2rad(90 - lat);
  const theta = deg2rad(lng + 180);

  const x = -((radius) * Math.sin(phi) * Math.cos(theta));
  const z = ((radius) * Math.sin(phi) * Math.sin(theta));
  const y = ((radius) * Math.cos(phi));

  return new THREE.Vector3(x, y, z);
}

function convertVector3ToLngLat(vector) {
  vector.normalize();
  let lng = (270 + rad2deg(Math.atan2(vector.x, vector.z))) % 360;

  let p = new THREE.Vector3(vector.x, 0, vector.z);
  p.normalize();

  let lat = rad2deg(Math.acos(p.dot(vector)));

  if (vector.y < 0) {
    lat *= -1;
  }

  return [lng, lat];
}

function deg2rad(degree) {
  return degree * (Math.PI / 180);
}

function rad2deg(radians) {
  return radians * (180 / Math.PI);
}
