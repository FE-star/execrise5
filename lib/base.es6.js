class Base {
    constructor(options) {
        this._listeners = {};
    }
    on(key, listener) {
        if(!this._listeners[key])
            this._listeners[key] = [];

        this._listeners[key].push(listener);

        return this;
    }
    trigger(key, value) {
        if(!!this._listeners[key]) {
            this._listeners[key].forEach(listener => {
                setTimeout(() => {
                    listener.call(this, value);
                }, 0);
            });
        }
    }
}

module.exports = Base