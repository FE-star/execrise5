function Base() {
    this.events = {};
}

Base.extend = function () {
    // 首先分析功能、输入、输出
    // 功能是实现继承 => 输出肯定是一个构造函数
    // 且此构造函数除了继承父类的属性和方法外，还要继承输出参数对象的方法

    // => 构建一个函数，作为构造函数输出，使用组合继承方式
    let SuperType = this;
    function SubType() {
        // 继承属性
        // Base.call(this); // 因为需要多级继承，所以使用_super引用父类
        SuperType.call(this);

    }

    // this.extend = SuperType.extend.bind(this);  // 继承静态属性和方法，本质上就是将SuperType上的属性和方法合并到SubType上
    Object.keys(SuperType).forEach(function (key) {
        if (SuperType.hasOwnProperty(key)) {
            SubType[key] = SuperType[key];
        }
    });

    SubType.prototype = new SuperType();
    SubType.prototype.constructor = SubType;

    // 传入参数作为子类自己的公有属性或方法，如何遍历arguments，如何遍历对象，如何判断对象自有属性，如何合并对象
    for (var i = 0, len = arguments.length; i < len; i++) { // 遍历arguments
        var arg = arguments[i];
        Object.keys(arg).forEach(function (key) {   // 遍历对象
            if (arg.hasOwnProperty(key)) {
                SubType.prototype[key] = arg[key].bind(this);
                SubType[key] = arg[key].bind(this);    // 这里主要是测试用例里子类中能直接调用传输对象（类）中的方法
            }
        });
    }
    return SubType;
}

Base.prototype.on = function (type, handle) {
    if (!this.events[type]) this.events[type] = [];
    this.events[type].push(handle);
}

Base.prototype.trigger = function (type) {
    let handles = this.events[type];
    if (handles && handles.length) {
        for (var i = 0, len = handles.length; i < len; i++) {
            handles[i].apply(this, Array.prototype.slice.call(arguments, 1));
        }
    }
}

module.exports = Base