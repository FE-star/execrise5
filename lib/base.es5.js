function Base() {
    this.events = {};
}
Base.extend = function (param, props) {
    function Sub() {
        Base.call(this);
    }
    Sub.prototype = Object.assign(new this, param);
    Object.assign(Sub, Base, props);
    return Sub;
}
Base.prototype.on = function(eventName, callback) {
    this.events[eventName] = callback.bind(this);
}
Base.prototype.trigger = function(eventName, params) {
    if (!this.events[eventName]) return;
    this.events[eventName](params);
}
module.exports = Base