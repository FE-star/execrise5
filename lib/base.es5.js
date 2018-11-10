const events = require('events');

function Base() {
    this.emitter = new events.EventEmitter();
}

Base.prototype = {
    constructor: Base,
    on: function (eventName, cb) {
        // console.log(this.emitter, 'aaa')
        this.emitter.on(eventName, cb.bind(this));
    },
    trigger: function () {
        console.log('apply')
        this.emitter.emit.apply(this.emitter, arguments);
    },
    remove: function (eventName, fn) {
        this.emitter.removeListener(eventName, fn);
    }
}
Base.extend = function (protoProps, staticProps) {
    var SuperClass = this;
    // 继承父类的构造过程
    function SubClass () {
        SuperClass.bind(this)()
    }
    // 继承父类原型链上的属性，混入传入的原型链属性
    SubClass.prototype = Object.assign({}, SuperClass.prototype, protoProps, {
        constructor: SubClass
    });
    // 分配传入的静态属性
    for (var prop in staticProps) {
        SubClass[prop] = staticProps[prop];
    }
    // 使instanceOf，getPrototypeOf判断生效
    SubClass.prototype.__proto__ = SuperClass.prototype;
    // 继承extend方法
    SubClass.extend = SuperClass.extend;

    return SubClass;
}

module.exports = Base