export default class Queue {
  get size() {
    return this.end - this.front;
  }

  constructor() {
    this.store = {};
    this.front = 0;
    this.end = 0;
  }

  enqueue(data) {
    this.store[this.end] = data;
    this.end++;
  }

  dequeue() {
    if (this.front === this.end) {
      return null;
    }

    const data = this.store[this.front];
    delete this.store[this.front];
    this.front++;
    return data;
  }

  peek() {
    if (this.size() === 0) {
      return null;
    }

    return this.store[this.front];
  }
}
