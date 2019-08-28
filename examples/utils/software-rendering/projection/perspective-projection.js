import Projection from './projection';
import Matrix4 from '../math/matrix4';

export default class PerspectiveProjection extends Projection {
  constructor(fovy, aspect, near, far) {
    super();
    this.setMatrix(fovy, aspect, near, far);
  }

  setMatrix(fovy, aspect, near, far) {
    Matrix4.perspective(this._matrix, fovy, aspect, near, far);
  }
}
