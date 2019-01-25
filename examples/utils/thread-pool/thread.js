// https://github.com/andywer/threadpool-js/blob/master/src/ThreadPool/Thread.js

import EventEmitter from 'eventemitter3';
import WorkerFactory from './worker-factory';

export default class Thread extends EventEmitter {

  constructor(threadPool) {
    super();

    this.threadPool = threadPool;
    this.factory = new WorkerFactory();

    this.worker = null;
    this.currentJob = null;
    this.lastJob = null;
  }

  terminate() {
    if (this.worker) {
      this.worker.terminate();
      this.worker = null;
    }
  }

  run(job) {
    let needToInitWorker = true;
    const transferBuffers = job.getBuffersToTransfer() || [];

    this.currentJob = job;
    this.factory.once('new', worker => {
      this.wireEventListeners(worker, job);
    });

    if (this.worker) {
      if (this.lastJob && this.lastJob.functionallyEquals(job)) {
        needToInitWorker = false;
      } else {
        this.worker.terminate();
        this.worker = null;
      }
    }

    job.emit('start');

    try {
      if (needToInitWorker) {
        if (job.getScriptFile()) {
          this.worker = this.factory.runScriptFile(job.getScriptFile(), job.getParameter(), transferBuffers);
        } else {
          this.worker = this.factory.runCode(job.getFunction(), job.getParameter(), job.getImportScripts(), transferBuffers);
        }
      } else {
        this.wireEventListeners(this.worker, job, true);

        if (job.getScriptFile()) {
          this.factory.passParamsToWorkerScript(this.worker, job.getParameter(), transferBuffers);
        } else {
          this.factory.passParamsToGenericWorker(this.worker, job.getFunction(), job.getParameter(), job.getImportScripts(), transferBuffers);
        }
      }
    } finally {
      // always remove all listeners (for this job), so they cannot be triggered when this function is later
      // called with a different job
      this.factory.removeAllListeners('new');
    }
  }

  wireEventListeners(worker, job, removeExisting = false) {
    if (removeExisting) {
      worker.removeAllListeners('message');
      worker.removeAllListeners('error');
    }

    worker.on('message', this.handleSuccess.bind(this, job));
    worker.on('error', this.handleError.bind(this, job));
  }

  handleCompletion(job) {
    this.currentJob = null;
    this.lastJob = job;

    this.emit('done', job);
  }

  handleSuccess(job, event) {
    this.currentJob.emit('done', event.data);
    this.threadPool.emit('done', event.data);
    this.handleCompletion(job);
  }

  handleError(job, errorEvent) {
    this.currentJob.emit('error', errorEvent);
    this.threadPool.emit('error', errorEvent);
    this.handleCompletion(job);
  }
}
