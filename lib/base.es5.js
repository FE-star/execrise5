function Base() {
  this.events = {}
}

Base.extend = function (prototype, staticProperties) {
  var Parent = this
  var Child = function() { Parent.apply(this, arguments) }
  Child.prototype = Object.assign(new Parent, prototype, { constructor: Child })
  return Object.assign(Child, Parent, staticProperties)
}

Base.prototype.on = function(types, fn) {
  if (typeof types === "object") {
    for (var type in types) {
      this.on(type, types[type])
    }
  } else if (typeof types === "string") {
    this.events[types] = fn.bind(this)
  }
}

Base.prototype.trigger = function(types, value) {
  if (typeof types === "object") {
    for (var type in types) {
      this.trigger(type, types[type])
    }
  } else if (typeof types === "string") {
    this.events[types](value)
  }
}

// 浅拷贝 assign 的 Polyfill
// 参考 https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
// slice 方法可以用来将一个类数组（Array-like）对象/集合转换成一个数组。你只需将该方法绑定到这个对象上。
// 参考 https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/slice
if (typeof Object.assign != 'function') {
  Object.defineProperty(Object, "assign", {
    value: function assign(target, varArgs) { // .length of function is 2
      'use strict';
      if (target == null) { // TypeError if undefined or null
        throw new TypeError('Cannot convert undefined or null to object');
      }

      var to = Object(target);

      for (var index = 1; index < arguments.length; index++) {
        var nextSource = arguments[index];

        if (nextSource != null) { // Skip over if undefined or null
          for (var nextKey in nextSource) {
            // Avoid bugs when hasOwnProperty is shadowed
            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
              to[nextKey] = nextSource[nextKey];
            }
          }
        }
      }
      return to;
    },
    writable: true,
    configurable: true
  });
}

module.exports = Base