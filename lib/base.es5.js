var slice = [].slice;

function merge(target) {
  var srcs = slice.call(arguments, 1);
  srcs.forEach(function(src) {
    for(var key in src) {
      if(src.hasOwnProperty(key)) {
        target[key] = src[key];
      }
    }
  });
}

function Base() {
  this.events = {}
}

Base.extend = function(proto, static) {
  var Super = this;
  function Cur() {
    Super.call(this);
  }
  var Pile = function() {

  }
  Pile.prototype = this.prototype;
  Cur.prototype = new Pile();
  merge(Cur.prototype, proto);
  merge(Cur, Super, static);
  return Cur;
}

merge(Base.prototype, {
  on: function (event, fn) {
    (this.events[event] = this.events[event] || [])
      .push(fn);
  },
  trigger: function (event) {
    var args = slice.call(arguments, 1);
    (this.events[event] || [])
      .forEach((fn) => {
        fn.apply(this, args);
    })
  }
})

module.exports = Base