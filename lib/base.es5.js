function Base() {
  this.eventList = {}
}

function _extend (target) {
  var args = (arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments)); // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/arguments
  args = args.slice(1)
  args.forEach((arg) => {
    for (var key in arg) {
      if(arg.hasOwnProperty(key)) {
        target[key] = arg[key]
      }
    }
  })
}

// based on test/test.js:55, so it is intended that
// the second object contains all the static methods
// that Base class should extend? To me that seems to
// be reasonable
Base.extend = function (prototypeObject, staticObject) {
  var Super = this
  function Subclass() {
      Super.call(this)
  };
  Subclass.prototype = Object.create(Super.prototype)
  _extend(Subclass.prototype, prototypeObject)
  _extend(Subclass, Base, staticObject)
  return Subclass
}

 _extend(Base.prototype, {
  on(eventName, callback) {
    if (typeof eventName === 'string' && callback instanceof Function) {
      this.eventList[eventName] = callback
    }
  },
  trigger(eventName, value) {
    if (typeof eventName === 'string') {
      this.eventList[eventName].call(this, value)
    }
  }
})


module.exports =  Base

