function Base() {}

Base.extend = function (...val) {
  const args = val;

  const Super = this;
  const fn = function() {
    Super.call(this);
    this.events = [];
    args.forEach((item) => {
      for (const key in item) {
        this[key] = item[key]
      }
    });
  }
  args.forEach((item) => {
    for (const key in item) {
      fn[key] = item[key]
    }
  });

  fn.prototype = new Super();

  fn.prototype.on = function(event, cb) {
    if (this.events[event]) {
      this.events[event].push(cb.bind(this));
    } else {
      this.events[event] = [cb.bind(this)];
    }
  }

  fn.prototype.trigger = function(event, val) {
    if (this.events[event].length) {
      for (const cb of this.events[event]) {
        cb(val);
      }
    }
  }
  fn.extend = this.extend;
  return fn;
}


module.exports = Base
