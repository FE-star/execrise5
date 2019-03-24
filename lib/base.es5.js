function Base() {
    this.events = []
}


Base.extend = function (proto, static) {
    var Super = this; //不写这句呢， this指向是Base
    function Sub() {
        Super.call(this)
    }
    
    //优化用中间函数实现继承
    var F = function () { }
    F.prototype = Super.prototype
    Sub.prototype = new F()


    //proto
    for (var i in proto) {
        Sub.prototype[i]= proto[i]
    }

    //static
    for (let i in static) {
        Sub[i] = static[i]
    }

    //可以extend多次
    Sub.extend = Super.extend;

    return Sub
}

Base.prototype.on = function (event, cb) {
    (this.events[event] = this.events[event] || []).push(cb.bind(this))
}
Base.prototype.trigger = function(event, parma) {
    this.events[event].forEach(function (handle) {
        handle.call(this, parma)
    })
}




module.exports = Base