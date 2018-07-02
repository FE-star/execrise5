/**
 *  --- 构造继承法 ----
 * 这个方法不可用
 * 
 * 此种继承方式只能继承父构造器中的属性, 不能继承父构造器原型上的属性。
 * Animal.apply(this, arguments) 也可用 Animal.call(this) 替换。
 * Dog 对象有两个层级,第一级存放着自有属性以及父构造器中的属性,
 * 第二级存放着自己函数原型上的属性(Dog.prototype)。
 * 
 * 所以这个继承法无法实现 test.js 里面的功能
 */

function Base() {
  this.list = {};
}


Base.extend = function () {

  // 这个方法在 test.js 的第一个测试用例中就无法通过
  // 在控制台执行并输出可以看出来
  /*
    myclass
    Sub {list: {…}}list: {}__proto__: Object
    myclass.__proto__
    {getVal: ƒ, say: ƒ, constructor: ƒ}
    View.prototype
    {constructor: ƒ}
    myclass instanceof View
    false
    myclass instanceof Base
    false
  */

  // 新建一个子类
  var _this = this;
  function Sub() {
    // 使用 apply 将父类的方法绑定到子类中
    // _this.apply(this, arguments);
    _this.call(this);
  };

  // ---- 构造继承法 start --------

  // 继承 Base 上的方法, Base.prototype 上的方法不需要再写方法继承了
  // 因为 Sub.prototype = new Base() 已经继承了原型链上的方法
  // 如果不了解可以在控制台上输出看下结果就明白了
  for (const key in this) {
    if (this.hasOwnProperty(key)) {
      Sub[key] = this[key];
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