function Base() {
    this.events= []
}


Base.extend = function(proto,static) {
    var Super= this; //不写这句呢， this指向是Base
    function Sub() {
        Super.call(this)
    }

    var F= function() {}
    F.prototype= Super.prototype
    Sub.prototype= new F()

    merge(Sub.prototype, proto)
    merge(Sub,Super,static)

    return Sub
}

merge(Base.prototype, {
    on: function(event,cb) {
       (this.events[event]= this.events[event] || []).push(cb.bind(this))
    },
    trigger: function(event, parma) {
        this.events[event].forEach(function(handle) {
            handle.call(this,parma)
        })
    }
})

function merge(target) {
    var sources= Array.prototype.slice.call(arguments,1)
    sources.forEach(function(source) {
        for(var key in source) {
            if(source.hasOwnProperty(key)) {
                target[key] = source[key];
            }
        }
    })

}

module.exports = Base