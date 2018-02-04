function Base() {
  this._events = {}
}
Base.extend = function () {
  var self = this;
  var constructor = function () {
    self.call(this)
  }
  constructor.prototype = Object.create(this.prototype);

  [].slice.call(arguments).forEach(function (arg) {
   for(var key in arg) {
    constructor[key] = arg[key];
    constructor.prototype[key] = arg[key];
   }
  })
  for(var staticProp in this) {
    constructor[staticProp] = self[staticProp];
  }
  return constructor;
}

Base.prototype = {
  on: function (type, handle) {
    this._events[type] = handle
  },
  trigger: function (type, data) {
    this._events[type].call(this, data)
  }
}

module.exports = Base