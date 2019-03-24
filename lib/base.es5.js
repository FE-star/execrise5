function Base() {
    this.listener = {};
}
Base.extend = function (props, methods) {
    function Child() {
        Base.call(this)
    }
    Child.prototype = new this;

    for (let i in props) {
        Child.prototype[i] = props[i];
    }

    for (let i in methods) {
        Child[i] = methods[i];
    }

    Child.extend = this.extend;
    return Child;
}

Base.prototype.on = function (action, func) {
    this.listener[action] = func.bind(this);
}

Base.prototype.trigger = function (action, message) {
    this.listener[action](message);
}

module.exports = Base
