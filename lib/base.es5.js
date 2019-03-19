function Base() { this.events = {} }
Base.extend = function (proto, static) {
  var Self = this
  function BaseExtend() { Self.call(this) }
  BaseExtend.prototype = new Self()
  for (let key in proto) {
    Self.prototype[key] = proto[key]
  }
  for (let key in static) {
    BaseExtend[key] = static[key]
  }
  BaseExtend.extend = Base.extend
  return BaseExtend
}
Base.prototype.on = function (event, cb) {
  this.events[event] = {}
  this.events[event].name = event
  this.events[event].callback = cb.bind(this)
}
Base.prototype.trigger = function (event, value) {
  this.events[event].callback(value)
}
module.exports = Base

// 在JavaScript构造函数中：如果return值类型，那么对构造函数没有影响，实例化对象返回空对象；如果return引用类型（数组，函数，对象），那么实例化对象就会返回该引用类型