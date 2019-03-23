var Base = require('./lib/base.es5')
var View = Base.extend()
var MyClass = Base.extend(
  {
    getVal: function () {
      return 'hello world'
    }
  },
  {
    say: function (word) {
      return word
    }
  }
)
var myclass = new MyClass()
console.log('---------------------------------')
console.log(myclass.getVal())
console.log(myclass.say('myclass: success'))
console.log(MyClass.say('MyClass: success'))
console.log(myclass instanceof MyClass)
console.log(myclass instanceof Base)
console.log('---------------------------------')

const BaseES6 = require('./lib/base.es6')

var A = Base.extend({
  say: function (word) {
    return word
  }
})
var B = A.extend()
var b = new B()
console.log(b.say('hello world'))
console.log(b instanceof View)
console.log(b instanceof B)
console.log(b instanceof A)
console.log(b instanceof Base)
