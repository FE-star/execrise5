var slice = [].slice;

function merge(target) {
  var args = slice.call(arguments, 1);
  args.forEach(function(arg) {
    for (var key in arg) {
      if (arg.hasOwnProperty(key)) {
        target[key] = arg[key];
      }
    }
  });
}

function Base() {
  this.events = {};
}

Base.extend = function(proto, static) {
  var Super = this;
  function Cur() {
    Super.call(this);
  }
  var Pile = function() {};
  Pile.prototype = this.prototype;
  Cur.prototype = new Pile();
  merge(Cur.prototype, proto);
  merge(Cur, Super, static);
  return Cur;
};

merge(Base.prototype, {
  on: function(event, fn) {
    (this.events[event] = this.events[event] || []).push(fn);
  },
  trigger: function(event) {
    var args = slice.call(arguments, 1);
    var _this = this;
    (this.events[event] || []).forEach(function(fn) {
      fn.apply(_this, args);
    });
  }
});

module.exports = Base;
