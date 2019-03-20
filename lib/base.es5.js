function Base(params) {
  this.event = {};
  for (const key in params) {
    if (params.hasOwnProperty(key)) {
      this[key] = params[key];
    }
  }

  this.on = function (eventName, fn) {
    this.event[eventName] = fn;
  }

  this.trigger = function(eventName, ...params) {
    this.event[eventName].call(this, ...params)
  }
}
Base.extend = function (parent, staticParent) {
  function Sub () {}
  for (const key in staticParent) {
    if (staticParent.hasOwnProperty(key)) {
      Sub[key] = staticParent[key];
    }
  }

  Sub.prototype = new this(parent)
  Sub.extend = Base.extend
  return Sub;
}

module.exports = Base