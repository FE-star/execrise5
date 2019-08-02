function Base() {
  this.handlerFunc = {}
}
Base.extend = function() {
  var t = this
  function sb() {
    t.call(this)
  }
  sb.prototype = new t()

  for (const key in arguments) {
    if (arguments.hasOwnProperty(key)) {
      for (const i in arguments[key]) {
        if (key == 1) {
          sb[i] = arguments[key][i]
        } else {
          sb.prototype[i] = arguments[key][i]
        }
      }
    }
  }
  sb.extend = t.extend
  return sb
}

Base.prototype.on = function(eName, callback) {
  if (!Array.isArray(this.handlerFunc[eName])) {
    // 判断事件是否存在
    this.handlerFunc[eName] = []
  }
  this.handlerFunc[eName].push(callback.bind(this))
}

Base.prototype.trigger = function(eName, params) {
  this.handlerFunc[eName].forEach(func => {
    func.call(this, params)
  })
}

module.exports = Base
