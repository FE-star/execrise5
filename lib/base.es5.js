function Base() {
    this.callBack = null
}
Base.extend = function () {
    var _arr = Array.prototype.slice.call(arguments)
    var InheritClass = function () {}
    InheritClass.prototype =  new this
    InheritClass.prototype.constructor = InheritClass.prototype.constructor
    _arr.forEach(function (_e) {
        for (var key in _e) {
            InheritClass.prototype[key] = _e[key]
            InheritClass[key] = _e[key]
            }
    })
    InheritClass.extend = this.extend
    return InheritClass
}

Base.prototype.on = function (_t, fn) {
    this.callBack = fn
}

Base.prototype.trigger = function (_t, _e) {
    this.callBack(_e)
}

module.exports = Base