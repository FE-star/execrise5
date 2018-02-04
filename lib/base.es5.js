function Base() {

}
Base.prototype.trigger = function () {
    if (this.handles[arguments[0]]) {
        for (var i = 0; i < this.handles[arguments[0]].length; i++) {
            this.handles[arguments[0]][i](arguments[1]).call(this);
        }
    }
}
Base.prototype.on = function (eventName, callback) {
    if (!this.handles) {
        this.handles = {};
    }
    if (!this.handles[eventName]) {
        this.handles[eventName] = [];
    }
    this.handles[eventName].push(callback.bind(this));
}


Base.extend = function () {
    function F() { }
    // F.prototype = Object.create(Base.prototype)
    F.prototype = new this;
    for (var i = 0; i < arguments.length; i++) {
        for (var k in arguments[i]) {
            F.prototype[k] = arguments[i][k]
            F[k] = arguments[i][k]
        }
    }
    F.extend = this.extend

    return F;
}

module.exports = Base