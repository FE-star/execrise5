const assert = require('assert');

describe('实现一个基类，可以继承，可以监听事件', function () {
  describe('ES6', function () {
    const Base = require('../lib/base.es6');
    class View extends Base {
      constructor(options) {
        super(options)
      }
    }

    it('能够监听事件', function (done) {
      const view = new View();
      view.on('test', function () {
        done()
      });
      view.trigger('test')
    });

    it('能够监听事件并传值', function (done) {
      const view = new View();
      view.on('test', function (value) {
        assert.equal(value, 'hello world');
        done()
      });
      view.trigger('test', 'hello world')
    });

    it('监听函数的this指向自己', function (done) {
      const view = new View();
      view.on('test', function () {
        assert.equal(this, view);
        done()
      });
      view.trigger('test')
    })

  });

  describe('ES5', function () {
    var Base = require('../lib/base.es5');
    var View = Base.extend();

    it('可以extend一个类', function () {
      var MyClass = Base.extend({
        getVal: function () {
          return 'hello world'
        }
      }, {
        say: function (word) {
          return word
        }
      });

      var myclass = new MyClass(); // 说明MyClass是一个构造函数，即Base.extend()需要返回一个构造函数
      assert.equal(myclass.getVal(), 'hello world');
      assert.equal(MyClass.say('haha'), 'haha');
      assert.equal(myclass instanceof MyClass, true);
      assert.equal(myclass instanceof Base, true);  //实例既是MyClass的实例，同时也是Base的实例，而且是new MyClass获得的实例，说明Base是基类
    });

    it('可以extend多次', function () {
      var A = Base.extend({
        say: function (word) {
          return word
        }
      });
      var B = A.extend(); // 说明Base.extend返回的类上仍有静态extend方法

      var b = new B();
      assert.equal(b.say('hello world'), 'hello world');
      assert.equal(b instanceof View, false);
      assert.equal(b instanceof B, true);
      assert.equal(b instanceof A, true);
      assert.equal(b instanceof Base, true);
    });

    it('能够监听事件', function (done) {
      const view = new View();
      view.on('test', function () {
        done()
      });
      view.trigger('test')
    });

    it('能够监听事件并传值', function (done) {
      const view = new View();
      view.on('test', function (value) {
        assert.equal(value, 'hello world');
        done()
      });
      view.trigger('test', 'hello world')
    });

    it('监听函数的this指向自己', function (done) {
      const view = new View();
      view.on('test', function () {
        assert.equal(this, view);
        done()
      });
      view.trigger('test')
    })

  })
});