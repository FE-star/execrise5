function Base() {
  this.subscribers = {};
}
Base.prototype.on = function(type, fn) {
  this.subscribers[type] = this.subscribers[type] || [];
  this.subscribers[type].push(fn.bind(this));
}
Base.prototype.trigger = function(type) {
  var args = JSON.parse(JSON.stringify(arguments));
  args.length = arguments.length;
  args.__proto__ = Array.prototype;
  args.shift();
  if (!this.subscribers[type]) return;
  this.subscribers[type].forEach(function(ele) {
    ele.apply(null, args);
  });
}
Base.extend = function () {
  var args = arguments;
  var _this = this;
  args.__proto__ = Array.prototype;
  
  function Extend() {
    Base.call(this);
  }
  (function() {
    var Super = function () {};
    Super.prototype = _this.prototype;
    Extend.prototype = new Super();
    args.forEach(function(ele) {
      Object.keys(ele).forEach(function(element) {
        Extend.prototype[element] = ele[element];
        Extend[element] = ele[element];
      })
    })
  })();
  Extend.extend = this.extend;
  return Extend;
}

module.exports = Base