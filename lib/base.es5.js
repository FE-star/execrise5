function Base() { }
Base.extend = function (proto, static) {
  var _this = this;
  function Child() {
    _this.call(this);
  }
  Child.prototype = Object.create(_this.prototype);
  Child.prototype.constructor = Child;
  merge(Child.prototype, proto);
  merge(Child, Base, static);
  return Child;
}

function Base() {
  this.events = {}
}

function merge(target) {
  var srcs = Array.prototype.slice.call(arguments, 1);
  srcs.forEach(function (src) {
    for (var key in src) {
      if (src.hasOwnProperty(key)) {
        target[key] = src[key];
      }
    }
  })
}

merge(Base.prototype, {
  on: function (eventname, func) {
    if (!this.events[eventname]) {
      this.events[eventname] = []
    }
    this.events[eventname].push(func.bind(this))
  },
  trigger: function (eventname, params) {
    if (this.events[eventname]) {
      this.events[eventname].forEach(fn => {
        fn(params)
      })
    }
  }
})

module.exports = Base