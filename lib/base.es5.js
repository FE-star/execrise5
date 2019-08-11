function Base() {
  this.events = [];
}
Base.extend = function () {
  var _this = this;
  var args = Array.prototype.slice.apply(arguments);
  var extend = function(){
    // 构造继承
    _this.call(this);
  };
  // 原型链继承
  extend.prototype = new _this();

  args.forEach(function (obj) {
    if(Object.prototype.toString.call(obj) === '[object Object]') {
      for(var key in obj) {
        extend.prototype[key] = obj[key];
        extend[key] = obj[key];
      }
    }
  });

  extend.extend = _this.extend;

  return extend;
}

Base.prototype.on = function (name, fn) {
  this.events[name] = fn;
}

Base.prototype.trigger = function (name, value) {
  this.events[name] && this.events[name].call(this, value);
}

module.exports = Base