class Base {
    constructor() {
        this.handlers = {}
    }
    on(type, fn) {
        if (this.handlers[type] == undefined) {
            this.handlers[type] = [];
            this.handlers[type].push(fn.bind(this))
        }
    }
    trigger(type, ...arg) {
        if (this.handlers[type]) {
            this.handlers[type].forEach((fn) => {
                fn(arg)
            }, this);
        }
    }
}

module.exports = Base