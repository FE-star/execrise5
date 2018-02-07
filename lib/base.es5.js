var slice = [].slice

function Base() {
  this.events = {}
}

function merge(target) {
  var srcs = slice.call(arguments, 1)
  srcs.forEach(function(src) {
    for(var key in src) {
      if (src.hasOwnProperty(key)) {
        target[key] = src[key]
      }
    }
  })
}

Base.extend = function () {
  var srcs = slice.call(arguments)

  var Super = this
  function Sub() {
    Super.call(this)
  }
  var prototype = Object.create(Super.prototype)
  prototype.constructor = Sub
  Sub.prototype = prototype

  for (var i = 0; i < srcs.length; i++) {
    merge(Sub.prototype, srcs[i])
    merge(Sub, srcs[i])
  }
  merge(Sub, Super)
  return Sub
}

merge(Base.prototype, {
  on: function(event, fn) {
    (this.events[event] = this.events[event] || []).push(fn)
  },
  trigger: function(event) {
    var args = slice.call(arguments, 1),
        e = this.events[event] || []

    e.forEach((fn) => {
      fn.apply(this, args)
    })
  }
})

module.exports = Base
