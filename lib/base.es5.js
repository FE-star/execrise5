function Base() {}
Base.prototype = {}
Base.extend = function () {
    for (var i = 0; i < arguments.length; i++) {
        Base.prototype = {
            ...Base.prototype,
            ...arguments[i]
        }
    }
    return Base;
}

module.exports = Base