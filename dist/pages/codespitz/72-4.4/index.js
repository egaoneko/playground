const El = class {

  constructor() {
    this._el = document.createElement('div');
  }

  getEl() {
    return this._el;
  }

  set class(v) {
    this._el.className = v;
  }

};

// const el = new El();
// el.class = 'test';
// document.body.appendChild(el.getEl());

const Mesh = class extends El {

  constructor() {
    super();
    this._el.style.cssText =
      `
      position:absolute;
      left:50%;
      top:50%;
      transform-style:preserve-3d
    `;
  }

  addChild(face) {
    if (!(face instanceof Face)) throw 'invalid face';
    this._el.appendChild(face.getEl());
    return face;
  }

};

// const mesh = new Mesh();
// mesh.class = 'test';
// document.body.appendChild(mesh.getEl());

const Face = class extends El {

  constructor(w, h, x, y, z, rx, ry, rz, tx, ty) {
    super();
    this._el.style.cssText =
      `
      position:absolute;
      width:${w}px;
      height:${h}px;
      margin:-${h*.5}px 0 0 -${w*.5}px;
      transform:translate3d(${x}px,${y}px,${z}px)
        rotateX(${rx}rad) rotateY(${ry}rad) rotateZ(${rz}rad);
      background-position:-${tx}px ${ty}px;
    `;
  }

};

// const mesh = new Mesh();

// const face = new Face(100, 100, 10, 10, 0, Math.PI/4, 0, 0, 0, 0);
// face.getEl().style.backgroundColor = 'red';

// const face0 = new Face(50, 50, 100, 10, Math.PI/2, Math.PI/4, 0, 0, 0, 0);
// face0.getEl().style.backgroundColor = 'blue';

// mesh.addChild(face);
// mesh.addChild(face0);
// mesh.getEl().style.transform = 'rotateX(90deg)';

// document.body.appendChild(mesh.getEl());

const mesh = new Mesh();

const r = 100,
  height = 196,
  sides = 20;
const sideAngle = (Math.PI / sides) * 2;
const sideLen = r * Math.tan(Math.PI / sides);

// 몸통
for (let c = 0; c < sides; c++) {
  const x = Math.sin(sideAngle * c) * r / 2;
  const z = Math.cos(sideAngle * c) * r / 2;
  const ry = Math.atan2(x, z);
  // const ry = 0;

  mesh.addChild(
    new Face(sideLen + 1, height, x, 0, z, 0, ry, 0, sideLen * c, 0)
  ).class = 'drum';
}

// 뚜껑
mesh.addChild(new Face(100, 100, 0, -98, 0, Math.PI / 2, 0, 0, 0, 100)).class = 'drum';
mesh.addChild(new Face(100, 100, 0, 98, 0, -Math.PI / 2, 0, 0, 0, 100)).class = 'drum';

mesh.class = 'ani';
document.body.appendChild(mesh.getEl());