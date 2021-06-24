var _ = {
  merge: function(target) {
    if (!target) return target
    const srcs = Array.prototype.slice.call(arguments, 1)
    srcs.forEach(function(src) {
      for (var key in src) {
        if (src.hasOwnProperty(key)){
          target[key] = src[key]
        }
      }
    })
  },
  inheritPrototype: function(Child, Parent) {
    if (!Child || !Parent) return
    /**
     * 如果这个地方是Child.prototype = Parent.prototype，然后执行Child.prototype.constructor = Child;
     * 那父类Parent的constructor也会是Child
     * 创建一个TempSuper的目的是为了让父类的prototype出现在子类prototype的__proto__上
     * 这样子类实例对象sub instantceof Sub;和sub instanceof Super都为true
     * 这种方式比Child.prototype = new Super()要节省空间，因为new Super()要执行两遍构造函数，且构造函数内的实例属性要出现在子类的原型上
     * 和子类构造函数内，call父类函数继承父类实例属性相冲突
    */
    function TempSuper() {}
    TempSuper.prototype = Parent.prototype;

    Child.prototype = new TempSuper()
    Child.prototype.constructor = Child;
  },
  bind: function(func, newScope) {
    return function() {
      return func.apply(newScope, arguments)
    }
  }
}


function Base() {}
Base.extend = function (proto, staticProps) {
  var SuperScope = this
  function Child() {
    SuperScope.apply(this, arguments)
  }

  _.inheritPrototype(Child, SuperScope)
  _.merge(Child.prototype, proto, {
    on: function(funcName, callback) {
      this[funcName] = _.bind(callback, this)
    },
    trigger: function(funcName) {
      if (typeof this[funcName] === 'function') {
        const newArgs = Array.prototype.slice.call(arguments, 1)
        _.bind(this[funcName], this)(newArgs)
      }
    }
  })
  _.merge(Child, SuperScope, staticProps)
  return Child
}

module.exports = Base