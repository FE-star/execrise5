function Base() {
  this.handles = {};
}
Base.extend = function (protoPropos, staticPropos) {
  function Child() {
    Base.call(this);
  }
  Child.prototype = Object.assign(new this, protoPropos);
  Object.assign(Child, Base, staticPropos);
  return Child;
}
Base.prototype.on = function(name, fun) {
  this.handles[name] = fun.bind(this);
}
Base.prototype.trigger = function(name, params) {
  if (!this.handles[name]) return;
  this.handles[name](params);
}
module.exports = Base
