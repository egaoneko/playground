import MTV from '../2d/mtv';

export default class SAT {
  static getMTV(shape1, shape2) { // Minimum Translation Vector
    let overlap = Number.POSITIVE_INFINITY;
    let smallest = null;
    const axes1 = shape1.getAxes();
    const axes2 = shape2.getAxes();

    // loop over the axes1
    for (let i = 0; i < axes1.length; i++) {
      const axis = axes1[i];
      // project both shapes onto the axis
      const p1 = shape1.project(axis);
      const p2 = shape2.project(axis);

      // do the projections overlap?
      if (!p1.overlap(p2)) {
        // then we can guarantee that the shapes do not overlap
        return null;
      } else {
        // get the overlap
        const o = p1.getOverlap(p2);
        // check for minimum
        if (o < overlap) {
          // then set this one as the smallest
          overlap = o;
          smallest = axis;
        }
      }
    }

    // loop over the axes2
    for (let i = 0; i < axes2.length; i++) {
      const axis = axes2[i];
      // project both shapes onto the axis
      const p1 = shape1.project(axis);
      const p2 = shape2.project(axis);

      // do the projections overlap?
      if (!p1.overlap(p2)) {
        // then we can guarantee that the shapes do not overlap
        return null;
      } else {
        // get the overlap
        const o = p1.getOverlap(p2);
        // check for minimum
        if (o < overlap) {
          // then set this one as the smallest
          overlap = o;
          smallest = axis;
        }
      }
    }

    // if we get here then we know that every axis had overlap on it
    // so we can guarantee an intersection
    return new MTV(smallest, overlap);
  }
}

