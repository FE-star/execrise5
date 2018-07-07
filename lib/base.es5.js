function Base() {
  this.events = {};
}
Base.prototype.on = function(eventType, handle) {
  if (!this.events[eventType]) {
    this.events[eventType] = [];
  }
  this.events[eventType].push(handle);
};
Base.prototype.trigger = function(eventType) {
  var handles = this.events[eventType];
  if (handles && handles.length) {
    // arrow function works!
    handles.forEach((handle) => {
      handle.apply(this, Array.prototype.slice.call(arguments, 1));
    });

    // for works, too!
    // for (var i = 0, len = handles.length; i < len; i++) {
    //   handles[i].apply(this, Array.prototype.slice.call(arguments, 1));
    // }

    // forEach does not work, I feel confuse, TODO
    // handles.forEach(function(handle) {
    //   var _this = this;
    //   handle.apply(_this, Array.prototype.slice.call(arguments, 1));
    // }, this)


  }
};

Base.extend = function () {
  var SuperType = this; // this指向的是Base,因为这个函数挂在Base的extend属性上
  function SubType() {
    SuperType.call(this); // this指向的是SubType的实例
  }

  // 多级继承静态extend方法
  var staticKey = Object.keys(SuperType);
  SubType[staticKey] = SuperType[staticKey];


  SubType.prototype = new SuperType();
  SubType.prototype.constructor = SubType;

  // 将入参的方法同时添加到静态方法和原型上
  var argumentsArray = Array.prototype.slice.call(arguments);
  argumentsArray.forEach(function(element) {
    var key = Object.keys(element);
    SubType.prototype[key] = element[key];
    SubType[key] = element[key];
  });

  return SubType;

};

module.exports = Base;