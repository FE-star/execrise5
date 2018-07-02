// 利用空对象作为中介

function Base() {
  this.list = []; // 存放监听事件
}

Base.extend = function () {
  // 建一个中介, 指向当前调用的类, 而不是指向 Base
  var Super = this;
  var mid = function() {};
  mid.prototype = Super.prototype;

  // 创建一个子类
  function Sub() {
    // 将父类的参数挂载到子类中
    Super.call(this);
  };
  Sub.prototype = new mid();
  Sub.prototype.constructor = Sub;

  // 继承 Base 上的方法, Base.prototype 上的方法不需要再写方法继承了
  // 因为 Sub.prototype = new Base() 已经继承了原型链上的方法
  // 如果不了解可以在控制台上输出看下结果就明白了
  // 1. 先继承Base这个类
  for (const key in Super) {
    if (Super.hasOwnProperty(key)) {
      // console.log('key ' + key);
      // 将 父类的属性和方法 一一赋值给子类
      Sub[key] = Super[key];
    }
  }

  // 2. 继承传进来的类
  var supList = Array.prototype.slice.apply(arguments);
  supList.forEach(sup => {
    // var parent = sup.prototype;
    for (const key in sup) {
      if (sup.hasOwnProperty(key)) {
        // console.log('key ' + key);
        // 将 父类的属性和方法 一一赋值给子类
        Sub.prototype[key] = sup[key];
        Sub[key] = sup[key];
      }
    }
  });
  return Sub;
}

Base.prototype.on = function(name, fn) {
  if (!this.list[name]) {
    this.list[name] = [];
  }

  // 这里用 bind, apply 和 call 会立即执行,所以这里使用bind
  this.list[name].push(fn.bind(this));
}

Base.prototype.trigger = function(name, ...args) {
  if (!this.list[name]) {
    return;
  }

  this.list[name].forEach(fn => {
    fn(...args);
  });
}

module.exports = Base