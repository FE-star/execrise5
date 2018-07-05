function Base() {
  this._events = {}
}
function merge(target) {
  var arg = Array.prototype.slice.call(arguments, 1);
  arg.forEach(function (item) {
    if (item) { 
      Object.keys(item).forEach(function (key) { 
        if (item.hasOwnProperty(key))
          target[key] = item[key];
      })
    }
  });

}

Base.extend = function (proto, static) {
  var self = this;
  function constructor() { 
    self.call(this);
  };

  constructor.prototype = Object.create(self.prototype)
  // 添加原型方法
  merge(constructor.prototype, proto)
  // 给目标元素添加实例方法 
  // 传入this，可继承extend方法
  merge(constructor, static, this)
  return constructor;
}

Base.prototype = {
  on: function (event, fn) {
    (this._events[event] = this._events[event] || []).push(fn);
  },
  trigger: function (event) {
    var args = [].slice.call(arguments, 1);
    var self = this;
    (this._events[event] || []).forEach(function(fn){
      fn.apply(self, args);
    })
  }
}

module.exports = Base