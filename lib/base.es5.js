function merge(target) {
  // Array.prototype.slice.call(arguments)能将具有length属性的对象转成数组
  var args = Array.prototype.slice.call(arguments, 1);
  args.forEach(item => {
    for (var key in item) {
      // 所有继承了 Object 的对象都会继承到 hasOwnProperty 方法。
      // 这个方法可以用来检测一个对象是否含有特定的自身属性；
      // 和 in 运算符不同，该方法会忽略掉那些从原型链上继承到的属性。
      // https://www.jianshu.com/p/714e7f47d90f
      if (item.hasOwnProperty(key)) {
        target[key] = item[key];
      }
    }
  });
}

function Base() {
  this.events = {};
}

Base.extend = function (proto, staticProperties) {
  // 组合继承的优化方法
  var Super = this;
  function Cur() {
    Super.call(this);
  }
  var Pile = function () {};
  Pile.prototype = this.prototype;
  Cur.prototype = new Pile();
  merge(Cur.prototype, proto);
  merge(Cur, Super, staticProperties);
  return Cur;
};

merge(Base.prototype, {
  on: function (event, fn) {
    (this.events[event] = this.events[event] || [])
      .push(fn);
  },
  trigger: function (event) {
    var args = Array.prototype.slice.call(arguments, 1);
    (this.events[event] || [])
      .forEach(fn => fn.apply(this, args));
  }
});

module.exports = Base
