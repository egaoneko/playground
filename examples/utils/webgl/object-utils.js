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

export class Particle {
  constructor(
    position = [
      ((Math.random() - .5) * .1),
      ((Math.random() - .5) * .1),
      ((Math.random() - .5) * .1),
    ],
    color = [1.0, 0.0, 0.0, 0.5]
  ) {

    this.position = position;
    this.color = color;

    this.velocity = [
      ((Math.random() - .5) * .1),
      ((Math.random() - .5) * .1),
      ((Math.random() - .5) * .1),
    ];
    if (
      (Math.abs(this.velocity[0]) < 0.01) &&
      (Math.abs(this.velocity[1]) < 0.01) &&
      (Math.abs(this.velocity[2]) < 0.01)
    ) {
      //ensure particle is not stagnant
      this.velocity[0] = 0.1;
    }
    this.age = 0;
    this.lifespan = 20;
    this.size = 1.0;
  }

  update() {
    this.position[0] += (0.1 * this.velocity[0]);
    this.position[1] += (0.1 * this.velocity[1]);
    this.position[2] += (0.1 * this.velocity[2]);

    const x = Math.abs(this.position[0]);
    const y = Math.abs(this.position[1]);
    const z = Math.abs(this.position[2]);

    const distance = x * x + y * y + z * z;

    if (distance > 4) {
      this.position = [
        (Math.random() * 2.0) - 1.0,
        (Math.random() * 2.0) - 1.0,
        (Math.random() * 2.0) - 1.0
      ];
      this.velocity = [
        (Math.random() * 2.0) - 1.0,
        (Math.random() * 2.0) - 1.0,
        (Math.random() * 2.0) - 1.0
      ];
      if (this.age < 10) {
        this.color = [1.0, 1.0, 1.0, 0.75];
      } else if (this.age < this.lifespan) {
        this.color = [0.0, 0.0, 1.0, 0.75];
      } else {
        this.color = [1.0, 1.0, 1.0, 0.0];
      }
      this.age++;
    }
  }
}
