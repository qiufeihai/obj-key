const camelcase = require('camelcase');
const decamelize = require('decamelize');

/**
 * 
 * @param {Object} sourceObj 源对象
 * @param {Object | Function} options 
 * options的值为Object时，{ okey: 'newKey' }
 * options的值为Function时, oldkey => newKey
 */
function objKey(sourceObj, options) {
  if (Object.prototype.toString.call(sourceObj) != '[object Object]') throw new TypeError('sourceObje must be an object');
  let targetObj = Object.assign({}, sourceObj);
  if (!options) return targetObj;
  if (Object.prototype.toString.call(options) == '[object Object]') {
    Object.keys(options).forEach(oldKey => {
      if (oldKey in targetObj) {
        let newKey = options[oldKey];
        targetObj[newKey] = targetObj[oldKey];
        delete targetObj[oldKey];
      }
    })
    return Object.assign(targetObj, targetObj);
  }
  if (Object.prototype.toString.call(options) == '[object Function]') { 
    Object.keys(targetObj).forEach(oldKey => {
      let newKey = options(oldKey) || oldKey;
      if (newKey == oldKey) return;
      targetObj[newKey] = targetObj[oldKey];
      delete targetObj[oldKey];
    })
    return Object.assign(targetObj, targetObj);
  }

  return targetObj;
}

function camelCase(sourceObj) {
  return objKey(sourceObj, camelcase);
}


function _CamelCase(key) {
  return camelcase(key, {pascalCase: true});
}

function CamelCase(sourceObj) {
  return objKey(sourceObj, _CamelCase);
}

function _decamelize(sourceObj, split_str) {
  return objKey(sourceObj, function (key) {
    return decamelize(key, split_str);
  });
}

module.exports = objKey;
module.exports.camelCase = camelCase;
module.exports.CamelCase = CamelCase;
module.exports.decamelize = _decamelize;
