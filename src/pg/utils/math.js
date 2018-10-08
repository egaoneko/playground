/**
 * @module pg/utils/math
 */

/**
 * Gets a random integer
 *
 * @param {number} min minimum number.
 * @param {number} max maximum number.
 * @return {number} The random integer number.
 * @api
 */
export function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * Gets convex 2d numbers
 * @param {number} step step.
 * @return {array} The convex 2d numbers.
 * @api
 */
export function convex2d(step) {
  const convex = [];

  for (let i = 0; i < step; i++) {
    const x = i / step;
    convex.push([x, 1 - i / step]);
  }
  return convex;
}

/**
 * Rotates coordinate system for velocities
 *
 * Takes velocities and alters them as if the coordinate system they're on was rotated
 *
 * {@link https://gist.github.com/christopher4lis/f9ccb589ee8ecf751481f05a8e59b1dc}
 *
 * @param {object} velocity The velocity of an individual particle
 * @param {number} angle The angle of collision between two objects in radians
 * @return {Object} The altered x and y velocities after the coordinate system has been rotated
 */
export function rotate(velocity, angle) {
  return {
    x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
    y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
  };
}

/**
 * Swaps out two colliding particles' x and y velocities after running through
 * an elastic collision reaction equation
 *
 * {@link https://gist.github.com/christopher4lis/f9ccb589ee8ecf751481f05a8e59b1dc}
 *
 * @param {object} particle A particle object with x and y coordinates, plus velocity
 * @param {object} otherParticle A particle object with x and y coordinates, plus velocity
 * @return {undefined} Does not return a value
 */
export function resolveCollision(particle, otherParticle) {
  const xVelocityDiff = particle.velocity.x - otherParticle.velocity.x;
  const yVelocityDiff = particle.velocity.y - otherParticle.velocity.y;

  const xDist = otherParticle.x - particle.x;
  const yDist = otherParticle.y - particle.y;

  // Prevent accidental overlap of particles
  if (xVelocityDiff * xDist + yVelocityDiff * yDist < 0) {
    return;
  }

  // Grab angle between the two colliding particles
  const angle = -Math.atan2(otherParticle.y - particle.y, otherParticle.x - particle.x);

  // Store mass in var for better readability in collision equation
  const m1 = particle.mass;
  const m2 = otherParticle.mass;

  // Velocity before equation
  const u1 = rotate(particle.velocity, angle);
  const u2 = rotate(otherParticle.velocity, angle);

  // Velocity after 1d collision equation
  const v1 = {x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2), y: u1.y};
  const v2 = {x: u2.x * (m1 - m2) / (m1 + m2) + u1.x * 2 * m2 / (m1 + m2), y: u2.y};

  // Final velocity after rotating axis back to original location
  const vFinal1 = rotate(v1, -angle);
  const vFinal2 = rotate(v2, -angle);

  // Swap particle velocities for realistic bounce effect
  particle.velocity.x = vFinal1.x;
  particle.velocity.y = vFinal1.y;

  otherParticle.velocity.x = vFinal2.x;
  otherParticle.velocity.y = vFinal2.y;
}
