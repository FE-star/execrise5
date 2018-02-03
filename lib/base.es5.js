function Base () { this.events = {} }

Base.prototype.on = function (name, handler){
 this.events[name] = handler;
}

Base.prototype.trigger = function (){
  var args = Array.prototype.slice.call(arguments, 0);
  var name = args.shift();
  this.events[name].apply(this, args);
}

Base.extend = function (prop, method) {
  // 父类
  var Super = this;
  var Sub = function() {}
  /**
   * 原型指向父类 子类原型方法 构造函数重构
   */
  Sub.prototype = assign(new Super(), prop, { constructor: Sub });

  return assign(Sub, Super, method);
}

function assign() {
   var args = Array.prototype.slice.call(arguments, 0);
   // 返回子类
   var target = args.shift();

   args.forEach(item => {
     for (var key in item) {
       target[key] = item[key]
     }
   })

   return target;
 }

module.exports = Base
