var slice = [].slice;
function Base() {
  this.handles = {};
}
function merge(target) {
  var args = slice.call(arguments, 1);
  console.log(args);
  args.forEach(function(src) {
    for(var key in src) {
      target[key] = src[key];
    }
  });
}
Base.extend = function (proto, sta) {
  var Super = this;
  function Child() {
    Super.call(this);
  }
  var Cat = function() {};
  Cat.prototype = Super.prototype;
  Child.prototype = new Cat;
  merge(Child.prototype, proto);
  merge(Child, Base, sta);

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
