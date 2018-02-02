function Base() {
  this.events = {}
  this.on = function (name, callback) {
    let eventList = this.events[name]
    if (!eventList) eventList = this.events[name] = []
    if (eventList.indexOf(callback) === -1) {
      eventList.push(callback)
    }
  }

  this.trigger = function (name, data) {
    if (this.events[name]) {
      this.events[name].forEach((callback) => {
        callback.call(this, data)
      })
    }
  }
}

Base.extend = function () {
  var Sup = this // 父类
  var Sub = function() { // 子类
    Sup.call(this)
  }
  Sub.prototype = new Sup() // 原型继承
  var props = Array.prototype.slice.call(arguments)
  props.push(this)
  merge(Sub, props) // 继承父类并且合并新属性

  return Sub
}

function merge(target, props) {
  props.forEach(function(item) {
    for (var key in item) {
      if (item.hasOwnProperty(key)) {
        target.prototype[key] = target[key] = item[key]
      }
    }
  })
}


module.exports = Base
