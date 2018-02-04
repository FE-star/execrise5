function Base() { }
Base.extend = function (newMethods, newStaticMethod) {

    function o() {
        this._listeners = {};
    }

    o.prototype = new this();
    if(!!newMethods)
        Object.assign(o.prototype, newMethods);

    if(!!newStaticMethod)
        Object.assign(o, newStaticMethod);

    o.extend = this.extend;

    return o;
}

Base.prototype.on = function(key, listener) {
    if(!this._listeners[key])
        this._listeners[key] = [];

    this._listeners[key].push(listener);

    return this;
};

Base.prototype.trigger = function(key, value) {
    if(!!this._listeners[key]) {
        this._listeners[key].forEach(listener => {
            setTimeout(() => {
                listener.call(this, value);
            }, 0);
        });
    }
};

module.exports = Base