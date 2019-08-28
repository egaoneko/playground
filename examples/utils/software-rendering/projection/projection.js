import Matrix4 from '../math/matrix4';

export default class Projection {
  constructor() {
    this._matrix = Matrix4.create();
  }

  getMatrix() {
    return this._matrix;
  }
}