function Base() {
    this.events = {};
}
Base.extend = function(proto, static) {
    var That = this;
    function BaseChild() {
      That.call(this);
    }
    BaseChild.prototype = new That;
    for (var key in proto) {
      BaseChild.prototype[key] = proto[key];
    }
    for (var key in static) {
      BaseChild[key] = static[key];
    }
    BaseChild.extend = Base.extend;
    return BaseChild;
  }
  
  Base.prototype.on = function(event, callback) {
    if (!Array.isArray(this.events[event])) {
      this.events[event] = [];
    }
    this.events[event].push(callback.bind(this));
  }
  
  Base.prototype.trigger = function(event) {
    var that = this;
    var args = [].slice.call(arguments, 1);
    if (Array.isArray(that.events[event])) {
      that.events[event].forEach(function(callback) {
        callback.apply(that, args)
      });
    }
  }
  
module.exports = Base