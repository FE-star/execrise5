function Base() {
  this.events = {};
}

Base.prototype.on = function(name, handler){
  this.events[name] = handler;
}

Base.prototype.trigger = function(name, ...arg){
  var handler = this.events[name];
  handler.apply(this, arg);
}

Base.extend = function(obj, staticObj) {
  var Child = function() {};
  Child.prototype = new this;
  Child.prototype.constructor = Child;

  for (var i in obj) {　　　　　　
    Child.prototype[i] = obj[i];　　　　
  }
  for (var j in staticObj) {　　　　　　
    Child[j] = staticObj[j];　　　　
  }
  Child.extend = this.extend;

  return Child;
}

module.exports = Base
