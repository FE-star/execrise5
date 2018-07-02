/**
 * 直接继承法 -- 这个方法不可行
 * 具体原因查看第 21 - 32 行
 */

// --- 组合继承法
function Base() {
  this.list = {};
}

Base.extend = function () {
  // 要继承当前使用的对象, 而不是 Base 对象; 
  // 继承当前使用的对象可以实现多次继承, 对应 test 中的 '可以extend多次'

  // 新建一个子类
  var Super = this;
  function Sub() {
    Super.call(this);
  };

  // ---- 直接继承法 start --------
  // sub.prototype 直接指向了 this.prototype
  // 会将父类和子类的 prototype 指向同一个对象, 会互相进行影响
  // 即 当 子类 增加了一个方法或者属性, 那么父类中也会出现该方法和属性
  // 对照 test.js 中的 43 - 59 行测试内容, 我们直接在控制台上输出下结果
  // 会发现用这个继承法, 3者都是同一个对象
  /**
   * View.prototype
   * {on: ƒ, trigger: ƒ, getVal: ƒ, say: ƒ, constructor: ƒ}
   * myclass.__proto__
   * {on: ƒ, trigger: ƒ, getVal: ƒ, say: ƒ, constructor: ƒ}
   * Base.prototype
   * {on: ƒ, trigger: ƒ, getVal: ƒ, say: ƒ, constructor: ƒ}
   */
  Sub.prototype = Super.prototype;
  Sub.prototype.constructor = Sub;

  // 继承 Base 上的方法, Base.prototype 上的方法不需要再写方法继承了
  // 因为 Sub.prototype = new Base() 已经继承了原型链上的方法
  // 如果不了解可以在控制台上输出看下结果就明白了
  for (const key in Super) {
    if (Super.hasOwnProperty(key)) {
      Sub[key] = Super[key];
    }
  }

  // 将传递进来的参数切割成数组
  var extendList = Array.prototype.slice.apply(arguments);;
  extendList.forEach(arg => {
    for (const key in arg) {
      if (arg.hasOwnProperty(key)) {
        Sub.prototype[key] = arg[key];
        Sub[key] = arg[key];
      }
    }
  });
  // ---- 直接继承法 end --------

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