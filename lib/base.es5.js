function Base() { this.events = {} }
Base.extend = function (proto, static) {
  var _this = this;
  function Child() {
    _this.call(this);
  }
  Child.prototype = Object.create(_this.prototype);
  Child.prototype.constructor = Child;
  // console.log('=====    Child.prototype')
  merge(Child.prototype, proto); // 将proto对象中的方法赋给Child的原型对象上
  // console.log('=====    Child')  
  merge(Child, Base, static); // 将Base和static对象中的方法赋给Child方法
  return Child;
}

function merge(target) {
  var srcs = Array.prototype.slice.call(arguments, 1); // arguments转化成数组，除了target
  // console.log('--- target', target)
  // console.log('--- arguments', arguments)
  // console.log('--- srcs', srcs)
  srcs.forEach(function (src) {
    for (var key in src) {
      if (src.hasOwnProperty(key)) {
        target[key] = src[key]; // 将方法赋给target
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