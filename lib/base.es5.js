function Base() {
    this.listener = {}
}
Base.prototype.on = function(name, func) {
    this.listener[name] = func.bind(this)
}
Base.prototype.trigger = function(name, ...args) {
    if(this.listener[name]) {
        this.listener[name](...args)
    }
}
Base.extend = function (props, methods) {
    const that = this
    const Func = function() {
        that.call(this)
    }
    Func.prototype = Object.create(that.prototype)
    Func.prototype.constructor = Func
    for(let a in props) {
        Func.prototype[a] = props[a]
    }
    for(let j in methods){
        Func[j] = methods[j]
    }
    Func.extend = that.extend
    return Func
}

module.exports = Base