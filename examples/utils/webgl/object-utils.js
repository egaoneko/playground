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
    this.totalVelocity = 0.0;
  }
}

export class WallObject {
  constructor(properties) {
    properties = Object.assign({}, {
      startX: 0.0,
      startY: 0.0,
      endX: 0.0,
      endY: 0.0,
    }, properties);

    this.slope = 0.0;
    if (
      (properties.endX - properties.startX) > 0.0001 ||
      (properties.endX - properties.startX) < -0.001
    ) {
      this.slope = (properties.endY - properties.startY) / (properties.endX - properties.startX);
    }
    this.startX = properties.startX;
    this.startY = properties.startY;
    this.endX = properties.endX;
    this.endY = properties.endY;

    const a = [properties.startX - properties.endX, properties.startY - properties.endY];
    this.angle = 0.0;
    this.angle = Math.atan2(a[1], a[0]);
  }
}
