export default class ObjectPool {

  /**
   * Create a new object pool of a certain class
   */
  constructor() {
    this.metrics = {};
    this._objpool = [];

    this._clearMetrics();
  }

  /**
   * Allocate a new object from the pool
   *
   * @param Cls the class
   * @param args the arguments
   * @return the object
   */
  alloc(Cls, ...args) {
    let obj;

    if (this._objpool.length === 0) {
      // nothing in the free list, so allocate a new object
      obj = Cls.apply(null, args);
      this.metrics.totalalloc++;
    } else {
      // grab one from the top of the objpool
      obj = this._objpool.pop();
      this.metrics.totalfree--;
    }

    return obj;
  }

  /**
   * Return an object to the object pool
   */
  free(obj) {
    // fix up the free list pointers
    this._objpool.push(obj);
    this.metrics.totalfree++;
  }

  /**
   * Allow collection of all objects in the pool
   */
  collect() {
    // just forget the list and let the garbage collector reap them
    this._objpool = []; // fresh and new

    // but we might have allocated objects that are in use/not in
    // the pool--track them in the metrics:
    const inUse = this.metrics.totalalloc - this.metrics.totalfree;
    this._clearMetrics(inUse);
  }

  /**
   * [private] Clear internal metrics
   */
  _clearMetrics(allocated) {
    this.metrics.totalalloc = allocated || 0;
    this.metrics.totalfree = 0;
  }
};
