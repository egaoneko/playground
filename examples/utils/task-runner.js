import EventEmitter from 'eventemitter3';
import ThreadPool from './thread-pool/thread-pool';
import Queue from './queue';
import { defer } from './common';

export const TASK_PRIORITY = {
  ESSENTIAL: {key: 'ESSENTIAL', priority: 0},
  CRITICAL: {key: 'CRITICAL', priority: 1},
  NORMAL: {key: 'NORMAL', priority: 2},
  IDLE: {key: 'IDLE', priority: 3},
};

export class TaskRunner extends EventEmitter {

  get status() {
    const status = this._taskQueues.map(p => {
      return {
        key: p.k,
        priority: p,
        queue: this._taskQueueMap.get(p.key).size
      }
    });
    status.push({
      key: 'WORKER',
      queue: this._threadMap.size,
    });
    return status;
  }

  constructor() {
    super();
    this._taskQueues = Object.values(TASK_PRIORITY).sort((a, b) => a.priority - b.priority);
    this._taskQueueMap = new Map();
    this._taskQueues.forEach(p => this._taskQueueMap.set(p.key, new Queue()));
    this._threadMap = new Map();
    this._threadPool = new ThreadPool();
    requestAnimationFrame(this.run.bind(this));
  }

  enroll(task, priority) {
    if (!(task instanceof Task)) {
      throw new Error('This task is not instance of Task');
    }

    if (task instanceof WorkerTask) {
      this._threadMap.set(task.uuid, task);
      this._processThreadTask(task);
    } else {
      if (!priority || !this._taskQueueMap.has(priority.key)) {
        throw new Error(`This priority is not exist: ${priority.key}`);
      }

      this._taskQueueMap.get(priority.key).enqueue(task);
    }

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

    this._taskQueues.some(p => {
      task = this._taskQueueMap.get(p.key).dequeue();
      return !!task;
    });

    return task;
  }

  _processTask(task) {
    task.process();
    this.emit('task:process');
  }

  _processThreadTask(task) {
    task.process(this._threadPool);

    const update = () => {
      this._threadMap.delete(task.uuid);
      this.emit('worker-task:process');
    };
    task.once('done', update);
    task.once('error', update);
  }
}

export class Task extends EventEmitter {

  get uuid() {
    return this._uuid;
  }

  constructor(action, ...args) {
    super();
    const deferred = defer();
    this._uuid = this._uuidv4();
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
        this.emit('error', e);
        return;
      }
      deferred.resolve(r);
      this.emit('done', r);
    };
  }

  _uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}

export class WorkerTask extends Task {
  constructor(action, ...args) {
    super(action, ...args);
  }

  process(pool) {
    this.action(pool);
  }

  _initAction(deferred, action, args) {
    this.action = (pool) => {
      pool
        .run(action, args)
        .error((e) => {
          deferred.reject(e);
          this.emit('error', e);
        })
        .done((r) => {
          deferred.resolve(r);
          this.emit('done', r);
        });
    };
  }
}

if (!window.perfomance || !window.perfomance.now) {
  Date.now || (Date.now = function () {
    return new this().getTime();
  });

  window.perfomance || (window.perfomance = {});

  const offset = (window.perfomance.timing ||
    (window.perfomance.timing = {})).navigatorStart ||
    (window.perfomance.timing.navigatorStart = Date.now());

  window.perfomance.now = function () {
    return Date.now() - offset;
  };
}
