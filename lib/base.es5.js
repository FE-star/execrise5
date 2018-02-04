function Base() {
  this._events = {}
}
Base.extend = function (prototypeMethods, staticMethods) {
  var self = this;
  var constructor = function () {
    self.call(this)
  }
  constructor.prototype = Object.create(this.prototype);
  for (var key in prototypeMethods) {
    constructor.prototype[key] = prototypeMethods[key];
  }
  [staticMethods, self].forEach(function(item){
    for (var key in item) {
      constructor[key] = item[key];
    }
  })
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