import Queue from "./queue";
import {defer} from "./common";

const EventEmitter = EventEmitter3;

export const TASK_PRIORITY = {
  ESSENTIAL: {key: 'ESSENTIAL', priority: 0},
  CRITICAL: {key: 'CRITICAL', priority: 1},
  NORMAL: {key: 'NORMAL', priority: 2},
  IDLE: {key: 'IDLE', priority: 3},
};

export class TaskRunner extends EventEmitter {

  get status() {
    return this._taskPriorities.map(p => {
      return {
        priority: p,
        queue: this._taskQueueMap.get(p.key).size
      }
    });
  }

  constructor() {
    super();
    this._taskPriorities = Object.values(TASK_PRIORITY).sort((a, b) => a.priority - b.priority);
    this._taskQueueMap = new Map();
    this._taskPriorities.forEach(p => this._taskQueueMap.set(p.key, new Queue()));
    this._running = false;
    requestAnimationFrame(this.run.bind(this));
  }

  enroll(priority, task) {
    if (!this._taskQueueMap.has(priority.key)) {
      throw new Error(`This priority is not exist: ${priority.key}`);
    }

    this._taskQueueMap.get(priority.key).enqueue(task);
    this.emit('task:enroll', task);

    return task.promise;
  }

  run(taskStartTime) {
    let taskFinishTime;

    do {
      const nextTask = this._getTask();

      if (!nextTask) {
        break;
      }

      this._processTask(nextTask);

      taskFinishTime = window.performance.now();
    } while (taskFinishTime - taskStartTime < 2);

    requestAnimationFrame(this.run.bind(this));
  }

  _getTask() {
    let task = null;

    this._taskPriorities.some(p => {
      task = this._taskQueueMap.get(p.key).dequeue();
      return !!task;
    });

    return task;
  }

  _processTask(task) {
    task.process();
    this.emit('task:process');
  }
}

export class Task {
  constructor(action, ...args) {
    const deferred = defer();
    this._initAction(deferred, action, args);
    this.promise = deferred.promise;
  }

  process() {
    this.action();
  }

  _initAction(deferred, action, args) {
    this.action = () => {
      let r;
      try {
        r = action.apply(null, args);
      } catch (e) {
        deferred.reject(e);
      }
      deferred.resolve(r);
    };
  }
}

export class WorkerTask extends Task {
  constructor(action, ...args) {
    super(action, ...args);
  }

  process() {
    this.action();
  }

  _initAction(deferred, action, args) {
    this.action = () => {
      let r;
      try {
        r = action.apply(null, args);
      } catch (e) {
        deferred.reject(e);
      }
      deferred.resolve(r);
    };
  }
}
