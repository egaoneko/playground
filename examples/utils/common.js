export function sleep(delay) {
  const start = new Date().getTime();
  while (new Date().getTime() < start + delay);
}

export function defer() {
  const deferred = {};
  deferred.promise = new Promise((resolve, reject) => {
    deferred.resolve = resolve;
    deferred.reject = reject;
  });
  return deferred;
}
