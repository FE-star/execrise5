function Base() {
  this.options = {}
}
Base.prototype.on = function(e, cb) {
  this.options[e] = cb
}
Base.prototype.trigger = function(e, value) {
  this.options[e].call(this, value)
}
Base.extend = function (o) {
  var F = function(){}

  F.extend = this.extend
  F.prototype = new this
  
  for(var prop in o) {
    console.log(prop, o[prop])
    F.prototype[prop] = o[prop]
    F[prop] = o[prop]
  }

  return F
}

module.exports = Base