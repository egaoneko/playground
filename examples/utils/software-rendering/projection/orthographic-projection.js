import Projection from './projection';
import Matrix4 from '../math/matrix4';

export default class OrthographicProjection extends Projection {
  constructor(left, right, bottom, top, near, far) {
    super();
    this.setMatrix(left, right, bottom, top, near, far);
  }

  setMatrix(left, right, bottom, top, near, far) {
    Matrix4.orthographic(this._matrix, left, right, bottom, top, near, far);
  }
}
