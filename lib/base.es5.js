function Base () {
  this.listener = {}
  this.on = function (eventName, eventHandle) {
    this.listener[eventName] = eventHandle
  }
  this.trigger = function (eventName, content) {
    if (!this.listener[eventName]) return
    this.listener[eventName].call(this, content)
  }
}
Base.extend = function () {
  var args = Array.prototype.slice.call(arguments)
  // 返回的函数
  function Fun () {}
  // 处理之前的继承关系
  Fun.prototype = new this()
  // 处理当前需要之间的关系
  args.forEach(function (obj) {
    Object.keys(obj).forEach(function (key) {
      Fun.prototype[key] = obj[key]
      // 将需要继承的方法当做新创建类的静态方法
      Fun[key] = obj[key]
    })
  })
  // 在新创建类中加静态继承方法
  Fun.extend = Base.extend
  // 需要返回一个函数
  return Fun
}

module.exports = Base
