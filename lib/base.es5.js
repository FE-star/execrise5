function Base() {
    this.event = {}
}

Base.extend = function() {
    var subClass = function() {}
    subClass.prototype = new this

    for (var i = 0; i < arguments.length; i++) {
        var arg = arguments[i]
        for (var index in arg) {
            subClass.prototype[index] = arg[index]
            subClass[index] = arg[index]
        }
    }

    subClass.extend = this.extend
    return subClass

}

Base.prototype.on = function(eventType, callback) {
    this.event[eventType] = callback.bind(this)
}

Base.prototype.trigger = function() {
    var argsArr = Array.prototype.slice.call(arguments)
    var eventType = argsArr.shift()
    this.event[eventType].apply(this, argsArr)
}

module.exports = Base
