const assert = require('assert')

describe('实现一个基类，可以继承，可以监听事件', function () {
  describe('ES6', function () {
    const Base = require('../lib/base.es6')
    class View extends Base {
      constructor(options) {
        super(options)
      }
    }

    it('能够监听事件', function (done) {
      const view = new View
      view.on('test', function () {
        done()
      })
      view.trigger('test')
    })

    it('能够监听事件并传值', function (done) {
      const view = new View
      view.on('test', function (value) {
        assert.equal(value, 'hello world')
        done()
      })
      view.trigger('test', 'hello world')
    })

    it('监听函数的this指向自己', function (done) {
      const view = new View
      view.on('test', function () {
        assert.equal(this, view)
        done()
      })
      view.trigger('test')
    })
  })

  describe('ES5', function () {
    var Base = require('../lib/base.es5.5')
    var View = Base.extend()

    it('可以extend一个类', function () {
      var MyClass = Base.extend({
        getVal: function () {
          return 'hello world'
        }
      }, {
        say: function (word) {
          return word
        }
      })
      var myclass = new MyClass()
      // console.log(myclass)
      assert.equal(myclass.getVal(), 'hello world')
      assert.equal(MyClass.say('haha'), 'haha')
      assert.equal(myclass instanceof MyClass, true)
      assert.equal(myclass instanceof Base, true)
    })

    it('可以extend多次', function () {
      var A = Base.extend({
        say: function (word) {
          return word
        }
      })
      var B = A.extend()
      var b = new B
      assert.equal(b.say('hello world'), 'hello world')
      assert.equal(b instanceof View, false)
      assert.equal(b instanceof B, true)
      assert.equal(b instanceof A, true)
      assert.equal(b instanceof Base, true)
    })

    it('能够监听事件', function (done) {
      const view = new View
      view.on('test', function () {
        done()
      })
      view.trigger('test')
    })

    it('能够监听事件并传值', function (done) {
      const view = new View
      view.on('test', function (value) {
        assert.equal(value, 'hello world')
        done()
      })
      view.trigger('test', 'hello world')
    })

    it('监听函数的this指向自己', function (done) {
      const view = new View
      view.on('test', function () {
        assert.equal(this, view)
        done()
      })
      view.trigger('test')
    })
  })
})