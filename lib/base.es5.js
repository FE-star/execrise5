function Base() {
  this._events = {}
}
function merge(target) {
  var args = Array.prototype.slice.call(arguments, 1);
  args.forEach(function(item){
    if (item) { 
      Object.keys(item).forEach(function (key) { 
        if (item.hasOwnProperty(key)) {
          target[key] = item[key];
        }
      })
    }
  });
}

Base.extend = function (proto, static) {
  var Super = this;
  var constructor = function () {
    Super.call(this)
  }
  constructor.prototype = Object.create(Super.prototype);
  merge(constructor.prototype, proto)
  merge(constructor, static, Super)
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