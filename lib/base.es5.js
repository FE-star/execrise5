function Base() {
  this.evtList = {};
}
Base.prototype.on = function (evt, handle) {
  this.evtList[evt] = handle;
}

Base.prototype.trigger = function () {
  var args = Array.prototype.slice.call(arguments);
  var evt = args.shift();
  this.evtList[evt].call(this, args);
}

Base.extend = function (methods, props) {
  var F = new this
  for(prop in methods) {
    F[prop] = methods[prop]
  }
  function Sub() {
    for(prop in props) {
      Sub[prop] = props[prop]
    }
  }
  F.constructor = Sub
  Sub.prototype = F
  Sub.extend = this.extend
  return Sub
}

module.exports = Base