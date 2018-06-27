const assert = require('assert')

describe('实现一个基类，可以继承，可以监听事件', function () {
  // ES6方式实现
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


  // ES5方式实现
  describe('ES5', function () {
    var Base = require('../lib/base.es5')
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
      var myclass = new MyClass
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
	    console.log(A)
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


describe("测试assert.throw", function() {
  it('test custom error', function(done) {
	  const err = new TypeError('Wrong value');
	  err.code = 404;
	  err.foo = 'bar';
	  err.info = {
		  nested: true,
		  baz: 'text'
	  };
	  err.reg = /abc/i;
    console.log(err)
	  assert.throws(
		  () => {
			  throw err;
		  },
      function (err) { // 8支持function 和 regex
        return true
      }
		  // { // node 8不支持自定义对象校验 // node 10的新增特性
			 //  name: 'TypeError',
			 //  message: 'Wrong value',
			 //  info: {
				//   nested: true,
				//   baz: 'text'
			 //  },
       //  code: '404',
       //  foo: 'bar',
			 //  reg: /abc/i
			 //  // Note that only properties on the validation object will be tested for.
			 //  // Using nested objects requires all properties to be present. Otherwise
			 //  // the validation is going to fail.
		  // }
	  )
    done()
  })
})