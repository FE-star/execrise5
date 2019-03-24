function Base() {
  this.listener = {}
}
Base.extend = function (props, methods) {
  function Child() {
    Base.call(this)
  }
  Child.prototype = new this;

  for (let i in props) {
      Child.prototype[i] = props[i];
  }

  for (let i in methods) {
      Child[i] = methods[i];
  }

  Child.extend = this.extend;
  return Child;
}

Base.prototype.trigger = function (event, msg) {
  this.listener[event](msg)
}


Base.prototype.on = function (event, func) {
  this.listener[event] = func.bind(this)
}

module.exports = Base