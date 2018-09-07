// avoid importing anything that results in an instanceof check
// since these extensions are global, instanceof checks fail with modules

(function(global) {

  // throw if anybody appends a div to the body and doesn't remove it
  afterEach(function() {
    const garbage = document.body.getElementsByTagName('div');
    if (garbage.length) {
      throw new Error('Found extra <div> elements in the body');
    }
  });

})(window);
