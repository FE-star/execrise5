/**
 *  --- 组合继承法 ----
 * 构造继承法 不大适合
 * 此种继承方式只能继承父构造器中的属性, 不能继承父构造器原型上的属性。
 * Animal.apply(this, arguments) 也可用 Animal.call(this) 替换。
 * Dog 对象有两个层级,第一级存放着自有属性以及父构造器中的属性,
 * 第二级存放着自己函数原型上的属性(Dog.prototype)。
 * 
 * 所以这里使用组合继承法
 */

// --- 组合继承法
function Base() {
  this.list = {};
}


Base.extend = function () {
  // 要继承当前使用的对象, 而不是 Base 对象; 
  // 继承当前使用的对象可以实现多次继承, 对应 test 中的 '可以extend多次'

  // 新建一个子类
  var _this = this;
  function Sub() {
    // 使用 apply 将父类的方法绑定到子类中
    // _this.apply(this, arguments);
    _this.call(this);
  };

  // ---- 组合继承法 start --------

  // Sub.prototype = new this();

  // 继承 Base 上的方法, Base.prototype 上的方法不需要再写方法继承了
  // 因为 Sub.prototype = new Base() 已经继承了原型链上的方法
  // 如果不了解可以在控制台上输出看下结果就明白了
  // for (const key in this) {
  //   if (this.hasOwnProperty(key)) {
  //     Sub[key] = this[key];
  //   }
  // }

  // 将传递进来的参数切割成数组
  // var extendList = Array.prototype.slice.apply(arguments);;
  // extendList.forEach(arg => {
  //   for (const key in arg) {
  //     if (arg.hasOwnProperty(key)) {
  //       Sub.prototype[key] = arg[key];
  //     }
  //   }
  // });
  // ---- 组合继承法 end --------

  // --- 优化内存的写法 start ------
  // 获取需要继承的类
  var extendList = Array.prototype.slice.apply(arguments);
  (function() {
    // 这里创建一个空的父类的对象, 将其 prototype 直接指向 当前对象的 prototype
    // 这里做一个中间转接作用
    var Super = function() {};
    Super.prototype = _this.prototype;

    Sub.prototype = new Super();

    // 继承 Base 上的方法, Base.prototype 上的方法不需要再写方法继承了
    for (const key in _this) {
      if (_this.hasOwnProperty(key)) {
        Sub[key] = _this[key];
      }
    }
    // 将传递进来的参数切割成数组
    extendList.forEach(arg => {
      for (const key in arg) {
        if (arg.hasOwnProperty(key)) {
          Sub.prototype[key] = arg[key];
        }
      }
    });
  })();
  // --- 优化内存的写法 end ------

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