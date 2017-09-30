/**
 * @description check data type
 * @param {String} type string
 * @param {Object} value object
 * @return {Boolean} is correct type
 * @method typeCheck
 */
function typeCheck(type, value) {
  if (typeof(type) == 'object' && type.length) {
    let typeList = type;

    for (let i = 0; i < typeList.length; i++) {
      if (_check(typeList[i], value)) return true;
    }
    return false;
  } else {
    return _check(type, value);
  }
}

/**
 * @description check data type
 * @param {String} type string
 * @param {Object} value object
 * @returns {Boolean} is correct type
 * @method _check
 */
function _check(type, value) {
  if (typeof(type) != 'string') return false;

  if (type == 'string') {
    return (typeof(value) == 'string');
  }
  else if (type == 'integer') {
    return (typeof(value) == 'number' && value % 1 == 0);
  }
  else if (type == 'float') {
    return (typeof(value) == 'number' && value % 1 != 0);
  }
  else if (type == 'number') {
    return (typeof(value) == 'number');
  }
  else if (type == 'boolean') {
    return (typeof(value) == 'boolean');
  }
  else if (type == 'undefined') {
    return (typeof(value) == 'undefined');
  }
  else if (type == 'null') {
    return (value === null);
  }
  else if (type == 'array') {
    return (value instanceof Array);
  }
  else if (type == 'date') {
    return (value instanceof Date);
  }
  else if (type == 'function') {
    return (typeof(value) == 'function');
  }
  else if (type == 'object') {
    // return false when the type is defined in typeCheck (date, array, null)
    return (
      typeof(value) == 'object' &&
      value !== null && !(value instanceof Array) && !(value instanceof Date) && !(value instanceof RegExp)
    );
  }
  return false;
}

/**
 * @description defer
 * @returns {Object} deferred
 * @method defer
 */
function defer() {
  let deferred = {};
  deferred.promise = new Promise((resolve, reject) => {
    deferred.resolve = resolve;
    deferred.reject = reject;
  });
  return deferred;
}
export {typeCheck, defer};
