function Base() {
    // 必须将事件存储起来，因为每一个实例的事件都是不一样的
    this.eventList = new Array();
}
// 在原型中，this指向的是对象实例
Base.prototype = {
    on: function(event, cb) {
        this.eventList[event] = cb
    },
    trigger: function(event, ...arg) { // 在回调函数中，this的指向会被改变，使用apply即可改变this的指向
        this.eventList[event].apply(this, arg);
    }
};

Base.extend = function (methods, staticmethods) {
    function Sub() {
        methods && Object.keys(methods).forEach(item => {
            this[item] = methods[item];
        })
    }
    Sub.prototype = new Base();
    staticmethods && Object.keys(staticmethods).forEach(item=>{
        // 这就是所谓的静态方法，其实即是挂载在构造上
        Sub[item] = staticmethods[item];
    })
    Sub.extend = function () { // 这里只能实现一层的继承？？？
        let Child = function () {
        }
        Child.prototype = new Sub();
        return Child;
    }
    return Sub;
}

module.exports = Base
