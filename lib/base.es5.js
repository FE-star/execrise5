function Base() {}

function merge(target) {
  var addFns = [].slice.call(arguments, 1);
  addFns.forEach(function (arrValues) {
    for (var key in arrValues) {
      if (arrValues.hasOwnProperty(key)) {
          target[key] = arrValues[key];
      }
    }
  })
}

Base.extend = function (protoFn, staticFn) {
    var Super = this;
    function returnObj() {};
    var MiddleFn = function () {};
    MiddleFn.prototype = this.prototype;
    returnObj.prototype = new MiddleFn();
    merge(returnObj.prototype, protoFn);//给对象的原型链上添加方法
    merge(returnObj, Super, staticFn);//给对象上添加方法
    return returnObj;
}

module.exports = Base;
