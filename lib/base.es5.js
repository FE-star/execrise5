function Base() {
  this.events = {}
}

Base.prototype.on = function(eventType, callback) {
  this.events[eventType] = callback
}

Base.prototype.trigger = function(eventType, data) {
  this.events[eventType].call(this, data)
}

// 静态方法
Base.extend = function () {
  var that = this

  function newBase() {
    that.call(this)
  }

  inheritPrototype(newBase,that)
  var arg = arguments
  for (var item in arg) {
    for (var key in arg[item]) {
      newBase.prototype[key] = arg[item][key]
      newBase[key] = arg[item][key]
    }
  }
  newBase.extend = that.extend
  return newBase
}

  function inheritPrototype(subType,superType){
    var prototype = new superType
    prototype.constructor = subType
    subType.prototype = prototype
  }

module.exports = Base
