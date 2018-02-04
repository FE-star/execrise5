function Base() {
  this._events = {}
}
function merge(target) {
  [].slice.call(arguments, 1).forEach(function(arg){
     for(var key in arg) {
       if (arg.hasOwnProperty(key)) {
         target[key] = arg[key];
       }
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