function Base() {
    this.event = undefined;
    this.callBack = null;
}
Base.prototype.on = function(event, call) {
    this.event = event;
    this.callBack = call;
}
Base.prototype.trigger = function(event, para) {
    if (this.event == event && this.event) {
        this.callBack(para);
    }
}
Base.extend = function() {
    for (var n in arguments[0]) {
        Base.prototype[n] = arguments[0][n];
    }

    var that = this;
    var Child = function() {
        that.prototype.constructor.call(this)
    }
    Child.prototype = new that.prototype.constructor;
    Child.prototype.constructor = Child;
    Child.extend = Base.extend;
    if (arguments[1]) {
        for (var n in arguments[1]) {
            Child[n] = arguments[1][n];
        }
    }
    return Child
}

module.exports = Base