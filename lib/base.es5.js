function Base() {
  this.observers = {};
}
Base.extend = function (shareMethod, staticMethod) {
  function o() {
    // 继承Base的属性
    Base.call(this);
  }

  for (staticMethodName in staticMethod) {
    o[staticMethodName] = staticMethod[staticMethodName];
  }
  // 在o上添加extend方法，注意不是prototype
  o.extend = Base.extend;

  // 这句不能放在下面代码之后，作用是修改o的原型链，让o的prototype指向调用本函数(extend)的对象，不一定是Base
  o.prototype = new this;
  for (shareMethodName in shareMethod) {
    o.prototype[shareMethodName] = shareMethod[shareMethodName];
  }
  return o
}

Base.prototype.on = function (_eventName, _observer) {
  if (!this.observers[_eventName]) {
    this.observers[_eventName] = [];
  }
  this.observers[_eventName].push(_observer);
}
Base.prototype.trigger = function (_event, params) {
  this.observers[_event].forEach((_observer) => {
    _observer.call(this, params);
  });
}




module.exports = Base




/**
 * 备份：用此方式会导致所有的Base.extend()返回的都是Base对象
 */
// Base.extend = function (shareMethod, staticMethod) {
//   Base.call(this);
//   for (shareMethodName in shareMethod) {
//     Base.prototype[shareMethodName] = shareMethod[shareMethodName];
//   }
//   for (staticMethodName in staticMethod) {
//     Base[staticMethodName] = staticMethod[staticMethodName];
//   }
//   return Base
// }