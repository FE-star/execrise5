function Base() {
  this.observerList = {};
  this.on = function(type, fn) {
    if (!this.observerList[type]) {
      this.observerList[type] = [];
    }
    this.observerList[type].push(fn.bind(this))
  }
  this.trigger = function(type) {
    var fns = this.observerList[type];
    var restArgs = Array.prototype.slice.call(arguments, 1);
    if (!fns || !fns.length) return;
    for (let i = 0; i < fns.length; i ++) {
      fns[i].call(null, restArgs)
    }
  }
}
Base.extend = function (proto, static) {
  var SuperType = this;
  var SubType = function () {
    SuperType.call(this);
  }

  var Foo = function () {};
  Foo.prototype = SuperType.prototype;
  SubType.prototype = new Foo();
  SubType.prototype.constructor = SubType;
  merge(SubType.prototype, proto);
  merge(SubType, SuperType, static);
  return SubType;
}

function merge(target) {
  var sources = Array.prototype.slice.call(arguments, 1);
  sources.forEach(source => {
    for (var key in source) {
      if (source.hasOwnProperty(key)) {
        target[key] = source[key];
      }
    }
  });
}

module.exports = Base