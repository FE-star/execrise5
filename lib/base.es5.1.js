// 拷贝继承

function Base() {
}

// Base.prototype.list = [];

/**
 * 拷贝继承
 *
 * @param {*} subList 父类 列表
 */
function copyExtend(supList, sub) {
  supList.forEach(sup => {
    // var parent = sup.prototype;
    for (const key in sup) {
      if (sup.hasOwnProperty(key)) {
        // console.log('key ' + key);
        // 将 父类的属性和方法 一一赋值给子类
        sub.prototype[key] = sup[key];
        sub[key] = sup[key];
      }
    }
  });
  return sub;
}

Base.extend = function () {
  // 建一个中介, 指向当前调用的类, 而不是指向 Base
  // var mid = function() {};
  // mid.prototype = this.prototype;

  // 创建一个子类
  function Sub() {
    this.list = []; // 存放监听事件
  };
  // Sub.prototype = new mid();
  Sub.prototype = new this();
  Sub.prototype.constructor = Sub;

  // 继承 Base 上的方法, Base.prototype 上的方法不需要再写方法继承了
  // 因为 Sub.prototype = new Base() 已经继承了原型链上的方法
  // 如果不了解可以在控制台上输出看下结果就明白了
  
  // 1. 先继承Base这个类
  for (const key in Base) {
    if (Base.hasOwnProperty(key)) {
      // console.log('key ' + key);
      // 将 父类的属性和方法 一一赋值给子类
      Sub[key] = Base[key];
    }
  }

  // 2. 继承传进来的类
  var supList = Array.prototype.slice.apply(arguments);
  Sub = copyExtend(supList, Sub);
  // console.log(Sub);

  return Sub;
}

Base.prototype.on = function(name, fn) {
  if (!this.list[name]) {
    this.list[name] = [];
  }

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