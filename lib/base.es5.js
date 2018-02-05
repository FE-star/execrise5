var slice = [].slice

function merge(target) {
    var srcs = slice.call(arguments, 1)
    srcs.forEach(function (src) {
        for (var key in src) {
            // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty
            if (src.hasOwnProperty(key)) {
                target[key] = src[key]
            }
        }
    })
}

function Base() {
    this.events = {}
}
Base.extend = function (proto, static) {
    // 就只改了这段，其他抄老师的 
    var Super = this;
    function Cur(name) {
      Super.call(this)
    }
    Cur.prototype = new Super()
    merge(Cur.prototype, proto)
    merge(Cur, Super, static)
    return Cur
}
merge(Base.prototype, {
    on: function (event, fn) {
        (this.events[event] = this.events[event] || [])
            .push(fn)
    },
    trigger: function (event) {
        // view.trigger('test', 'hello world', ...)
        // event -> 'test'
        // args -> 'hello world' 及后面的参数
        var args = slice.call(arguments, 1)
        // this,events['test'] = [fn1[,fn2]]
        ;(this.events[event] || [])
            .forEach((fn) => {
                // fn -> fn1 ,fn2...
                // apply(this) -> this.events -> 保证指向同一个this
                fn.apply(this, args)
            })
    }
})

module.exports = Base
