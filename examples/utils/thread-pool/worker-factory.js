// https://github.com/andywer/threadpool-js/blob/master/src/ThreadPool/WorkerFactory.js

import EventEmitter from 'eventemitter3';

import Worker from './worker-wrapper';
import genericWorker from './generic-worker';

const genericWorkerDataUri = genericWorker.dataUri;

export default class WorkerFactory extends EventEmitter {

  runScriptFile(url, parameter, transferBuffers = []) {
    const worker = new Worker(url);
    this.emit('new', worker);

    this.passParamsToWorkerScript(worker, parameter, transferBuffers);
    return worker;
  }

  runCode(fn, parameter, importScripts = [], transferBuffers = []) {
    let worker;

    try {
      worker = new Worker(genericWorkerDataUri);
    } catch (error) {
      throw error;
    }

    this.emit('new', worker);
    this.passParamsToGenericWorker(worker, fn, parameter, importScripts, transferBuffers);

    return worker;
  }

  passParamsToWorkerScript(worker, parameter, transferBuffers) {
    worker.postMessage(parameter, transferBuffers);
  }

  passParamsToGenericWorker(worker, fn, parameter, importScripts, transferBuffers) {
    worker.postMessage({
      'function': fn,
      'importScripts': importScripts,
      'parameter': parameter
    }, transferBuffers);
  }
}
