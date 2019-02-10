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

  constructor(options = {}) {
    super();

    this.processLimitTime = options.processLimitTime ? options.processLimitTime : 3;

    this._taskQueues = Object.values(TASK_PRIORITY).sort((a, b) => a.priority - b.priority);
    this._taskQueueMap = new Map();
    this._taskQueues.forEach(p => this._taskQueueMap.set(p.key, new Queue()));
    this._threadMap = new Map();
    this._threadPool = new ThreadPool();
    requestAnimationFrame(this.run.bind(this));
  }

  terminate(priority) {
    if (!priority || !this._taskQueueMap.has(priority.key)) {
      throw new Error(`This priority is not exist: ${priority.key}`);
    }

    this._taskQueueMap.get(priority.key).clear();
    this.emit('terminate:priority', priority);
  }

  terminateAll() {
    this._taskQueues.forEach(p => this._taskQueueMap.get(p.key).clear());
    this._threadMap.clear();
    this._threadPool.terminateAll();
    this.emit('terminate:all');
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
    } while (taskFinishTime - taskStartTime < this.processLimitTime);

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

export const TASK_STATUS = {
  NORMAL: 0,
  DONE: 1,
  ERROR: 2,
  ABORT: 3,
};

export class Task extends EventEmitter {

  get uuid() {
    return this._uuid;
  }

  constructor(action, ...args) {
    super();
    this._deferred = defer();
    this._uuid = this._uuidv4();
    this._initAction(this._deferred, action, args);
    this.status = TASK_STATUS.NORMAL;
    this.promise = this._deferred.promise;
  }

  process() {
    if (this.status !== TASK_STATUS.NORMAL) {
      if (this.status === TASK_STATUS.ABORT) {
        this._abort();
      }
      return;
    }

    this.action();
  }

  _initAction(deferred, action, args) {
    this.action = () => {
      let r;
      try {
        r = action.apply(null, args);
      } catch (e) {
        this._error(e);
        return;
      }
      this._done(r);
    };
  }

  _uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  _error(e) {
    this._deferred.reject(e);
    this.status = TASK_STATUS.ERROR;
    this.emit('error', e);
  }

  _done(r) {
    this._deferred.resolve(r);
    this.status = TASK_STATUS.DONE;
    this.emit('done', r);
  }

  _abort() {
    this._deferred.resolve();
    this.status = TASK_STATUS.ABORT;
    this.emit('abort');
  }
}

export class WorkerTask extends Task {
  constructor(action, ...args) {
    super(action, ...args);
  }

  process(pool) {
    if (this.status === TASK_STATUS.ABORT) {
      this._abort();
    }

    this.action(pool);
  }

  _initAction(deferred, action, args) {
    this.action = (pool) => {
      pool
        .run(action, args)
        .error((e) => {
          this._error(e);
        })
        .done((r) => {
          this._done(r);
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
