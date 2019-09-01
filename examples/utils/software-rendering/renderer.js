import Vector4 from './math/vector4';
import Vector3 from './math/vector3';
import Matrix4 from './math/matrix4';
import Projection from './projection/projection';

export default class Renderer {

  get width() {
    return this._width;
  }

  get height() {
    return this._height;
  }

  get scale() {
    return this._scale;
  }

  set scale(scale) {
    this._scale = scale;
    this.updateViewMatrix();
  }

  get rotate() {
    return this._rotate;
  }

  set rotate(rotate) {
    this._rotate = rotate;
    this.updateViewMatrix();
  }

  get position() {
    return this._position;
  }

  set position(position) {
    this._position = position;
    this.updateViewMatrix();
  }

  get viewMatrix() {
    return this._viewMatrix;
  }

  set viewMatrix(matrix) {
    this._viewMatrix = matrix;
  }

  get projection() {
    return this._projection;
  }

  set projection(projection) {
    this._projection = projection;
    this.render();
  }

  constructor(container) {
    if (typeof container === 'string') {
      container = document.querySelector(`#${container}`);
    }

    if (!(container instanceof HTMLElement)) {
      throw 'Container must be HTMLElment';
    }

    this._initCanvas(container);
    this.x = 0;
    this.y = 0;
    this.near = 0;
    this.far = 1;
    this.models = [];
    this._scale = Vector3.fromValues(1, 1, 1);
    this._rotate = Vector3.create();
    this._position = Vector3.create();
    this._projection = new Projection();
    this.updateViewMatrix();
  }

  appendChild(model) {
    this.models.push(model);
    this.render();
  }

  clearRenderer() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  render() {
    this.clearRenderer();

    if (!Array.isArray(this.models)) {
      return;
    }

    this.models.forEach(model => this.renderModel(model));
  }

  renderModel(model) {
    if (!model || !model.vertices) {
      return;
    }

    const vMatrix = this.viewMatrix;
    const pMatrix = this.projection.getMatrix();

    const matrix = Matrix4.create();
    Matrix4.multiply(matrix, vMatrix, matrix);
    Matrix4.multiply(matrix, pMatrix, matrix);

    const vertices = model.vertices.map(vertex => {
      const cc = Vector4.transformMat4(Vector4.create(), vertex, model.matrix);
      console.log(cc);
      console.log(matrix)
      Vector4.transformMat4(cc, cc, matrix);
      console.log(cc);

      const ndc = Vector4.perspectiveDivision(Vector3.create(), cc);
      const [ndcX, ndcY, ndcZ] = ndc;
      const x = this.x;
      const y = this.y;
      const w = this.width;
      const h = this.height;
      const n = this.near;
      const f = this.far;

      return Vector3.fromValues(
        w * 0.5 * ndcX + (x + w * 0.5),
        h - (h * 0.5 * ndcY + (y + h * 0.5)),
        (f - n) * 0.5 * ndcZ + (f + n) * 0.5
      );
    });

    console.log(vertices);

    vertices.forEach(vertex => {
      this.ctx.beginPath();
      this.ctx.arc(vertex[0], vertex[1], 5, 0, Math.PI * 2, true);
      this.ctx.stroke();
    });

    if (!model.indexes) {
      return;
    }

    const indexes = model.indexes;
    const length = indexes.length;

    for (let i = 0; i < length; i += 3) {
      const p1 = vertices[indexes[i]];
      const p2 = vertices[indexes[i + 1]];
      const p3 = vertices[indexes[i + 2]];

      this.ctx.beginPath();
      this.ctx.moveTo(p1[0], p1[1]);
      this.ctx.lineTo(p2[0], p2[1]);
      this.ctx.lineTo(p3[0], p3[1]);
      this.ctx.lineTo(p1[0], p1[1]);
      this.ctx.stroke();
    }
  }

  _initCanvas(container) {
    this._width = container.clientWidth;
    this._height = container.clientHeight;
    const canvas = document.createElement('canvas');
    canvas.width = this.width;
    canvas.height = this.height;

    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');

    container.appendChild(canvas);
  }

  updateViewMatrix() {
    const viewMarix = Matrix4.create();

    const scaleMatrix = Matrix4.create();
    scaleMatrix[0] = this.scale[0];
    scaleMatrix[5] = this.scale[1];
    scaleMatrix[10] = this.scale[2];
    this.viewMatrix = Matrix4.multiply(viewMarix, scaleMatrix, viewMarix);

    const positionMatrix = Matrix4.create();
    positionMatrix[3] = this.position[0];
    positionMatrix[7] = this.position[1];
    positionMatrix[11] = this.position[2];
    this.viewMatrix = Matrix4.multiply(viewMarix, positionMatrix, viewMarix);

    this.render();
  }
}
