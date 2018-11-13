function Base() {
  
}
Base.extend = function (p, m) {
  let that = this
  function F () {
    this.watchList = {}
    Base.call(this)
  }
  (function(){
    var Super = function(){}
    Super.prototype = that.prototype
    F.prototype = new Super
  })()
  // F.prototype = Object.create(this.prototype);
  F.prototype.constructor = F;
  for(var key in p) {
		F.prototype[key] = p[key]
  }
  for(var key in m) {
		F[key] = m[key]
  }

  F.prototype.on = function(event, fun) {
    // this.watchList[event] = fun
    this.watchList[event] = fun.bind(this)
  }
  F.prototype.trigger = function(event, params) {
    this.watchList[event](params)
  }
  F.extend = this.extend
  return F
}

module.exports = Base

