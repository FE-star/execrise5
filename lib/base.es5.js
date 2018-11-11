function Base() {
    this.listener = {};
}
Base.extend = function (props, methods) {
    function Child() {
        Base.call(this)
    }
    Child.prototype = new this;

    // copy props
    for (let i in props) {
        Child.prototype[i] = props[i];
    }

    // copy static methods
    for (let i in methods) {
        Child[i] = methods[i];
    }

    Child.extend = this.extend;
    return Child;
    }

    Base.prototype.on = function(action, listener) {
    this.listener[action] = listener.bind(this); // this to self
}

Base.prototype.trigger = function(action, message) {
    this.listener[action](message);
}
  
module.exports = Base 