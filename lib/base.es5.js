function Base () {
  this.events = {};
}
Base.extend = function (proto, static) {
  var Super = this;
  var Sub = function () {
    Super.call(this)
  }
  var Func = function () {
  };
  Func.prototype = Super.prototype; //Func原型指向Super 原型
  Sub.prototype = new Func(); //子类原型指向 Func 的构造实例
  merge(Sub.prototype, proto);
  merge(Sub, Super, static); // 将Super merge到Sub中，可以extend多次
  return Sub;

}
function merge (target) {
  var args = [].slice.call(arguments, 1);
  args.forEach(function (arg) {
    for (var prop in arg) {
      if (arg.hasOwnProperty(prop)) { // 判断不是原型链上的属性
        target[prop] = arg[prop];
      }
    }
  })
}
Base.prototype.on = function (event, cb) {
  (this.events[event] = this.events[event] || []).push(cb)
};
Base.prototype.trigger = function (event) {
  var args = [].slice.call(arguments, 1),
    self = this;
  (this.events[event] || []).forEach(function (cb) {
    cb.apply(self, args)
  });
}


module.exports = Base;