function Base() {
  this.funcs = {};
}
Base.prototype.on = function(event, func) {
  this.funcs[event] = func;
}
Base.prototype.trigger = function(event, args) {
  this.funcs[event].call(this, args);
}
Base.extend = function () {
  let _this = this;
  function NewBase() {
    _this.call(this);
  }
  let proto = new _this();
  Object.assign.apply(Object, [proto].concat([].slice.call(arguments)));
  NewBase.prototype = proto;
  Object.assign.apply(Object, [NewBase, _this].concat([].slice.call(arguments)));
  return NewBase;
}

module.exports = Base