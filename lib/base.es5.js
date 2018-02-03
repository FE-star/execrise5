
function Base() {
  this.evts = {};
}
Base.extend = function (prototype, staticProperties) {
  var Sup = this;
  var Sub = function() { Sup.apply(this, arguments) }
  Sub.prototype = assign(new Sup, prototype, { constructor: Sub });
  return assign(Sub, Sup, staticProperties);
}

Base.prototype.on = function(evtName, callback) {
  this.evts[evtName] = callback.bind(this)
}
Base.prototype.trigger = function() {
  var args = Array.prototype.slice.call(arguments, 0);
  var evtName = args.shift();
  this.evts[evtName].apply(this, args);
}


function assign() {
  var args = Array.prototype.slice.call(arguments, 0);
  var target = args.shift();

  args.forEach(item => {
    for (var key in item) {
      target[key] = item[key]
    }
  })
  return target;
}

module.exports = Base
