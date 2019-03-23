class Base {
    constructor() {
        this.listener = {}
    }

    on(name, callback) {
        this.listener[name] = callback
    }

    trigger(name, value) {
        this.listener[name].call(this, value)
    }

}

module.exports = Base