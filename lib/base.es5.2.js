// --- 原型链继承法
function Base() {
  // 为什么 list 放在这里会报 Error: done() called multiple times ??
  this.list = {};
}

Base.extend = function () {
  var Super = this;
  // 新建一个子类
  function Sub() {
    Super.apply(this);
  };
  // 要继承当前使用的对象, 而不是 Base 对象; 
  // 继承当前使用的对象可以实现多次继承, 对应 test 中的 '可以extend多次'
  Sub.prototype = new Super(); 
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