import Vector4 from './math/vector4';
import Matrix4 from './math/matrix4';

export default class Model {
  constructor(vertices, indexes) {
    const vectors = [];
    const length = vertices.length;

    for (let i = 0; i < length; i += 3) {
      const x = vertices[i];
      const y = vertices[i + 1];
      const z = vertices[i + 2];
      vectors.push(Vector4.fromValues(x, y, z, 1));
    }

    this.vertices = vectors;
    this.indexes = indexes;
    this.matrix = Matrix4.create();
  }
}