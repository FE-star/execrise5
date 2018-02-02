function Base() {
  this.myEvents = {}
}
Base.prototype.on = function(event, callback) {
  this.myEvents[event] = callback
}
Base.prototype.trigger = function(event, ...args) {
  this.myEvents[event].bind(this, ...args)()
}
Base.extend = function () {
  let Func = function(){}

  Func.extend = this.extend
  Func.prototype = new this
  
  for (var i = 0; i < arguments.length; i++) {
    let current = arguments[i]
    let key = Object.keys(current)[0]
    Func.prototype[key] = current[key] // 通过对象调用
    Func[key] = current[key] // 通过类名调用
  }

  return Func
}

module.exports = Base