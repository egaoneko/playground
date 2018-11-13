import Vector3 from "../../../src/pg/math/vector3";

export class SphereObject {
  constructor(properties) {
    properties = Object.assign({}, {
      radius: 1.0,
      position: new Vector3(0.0, 0.0, 0.0),
      velocity: new Vector3(0.0, 0.0, 0.0),
      acceleration: new Vector3(0.0, 0.0, 0.0),
    }, properties);

    this.radius = properties.radius;
    this.position = properties.position;
    this.velocity = properties.velocity;
    this.acceleration = properties.acceleration;
    this.vboIndex = properties.vboIndex;
  }
}
