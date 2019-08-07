function Base() {}
Base.extend = function () {
    function Child() {}
    Child.prototype = Object.create(Base.prototype, {
        constructor: {
            value: Child,
            configurable: true,
            writable: true,
            enumerable: true
        }
    })
    for (var i = 0; i < arguments.length; i++) {
        for (var k in arguments[i]) {
            if (typeof arguments[i][k] === 'function') {
                Object.assign(Child.prototype, {
                    [k]: arguments[i][k]
                })
            }
        }
    }
    return Child;
}

module.exports = Base