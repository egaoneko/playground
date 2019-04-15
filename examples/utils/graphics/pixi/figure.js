import {randomInt} from "../../../../src/pg/utils/math";

export function generatePoints(size, extent) {
  const points = [];
  for (let i = 0; i < size; i++) {
    points.push({
      x: randomInt(extent[0], extent[2]),
      y: randomInt(extent[1], extent[3]),
    });
  }
  return points;
}

