function merge(first, second) {
  if (!second) return first;
  for (key in second) {
    first[key] = second[key];
  }
  return first;
}

function Base() {
  this.events = {};
  this.on = function (name, callback) {
    this.events[name] = this.events[name] || []
    this.events[name].push(callback);
  }
  this.trigger = function (name, params) {
    var self = this;
    this.events[name] && this.events[name].forEach(function (callback) {
      callback.call(self, params);
    });
  }
}
Base.extend = function (prototype, obj) {
  var self = this;
  function Super() {
    self.call(this);
  }
  Super.prototype = merge(new self, prototype);
  return merge(merge(Super, Base), obj);
}
module.exports = Base