class Base {
    constructor() {
        this.event = {}
    }

    on(eventType, callback) {
        this.event[eventType] = callback
    }

    trigger(eventType, ...args) {
        this.event[eventType].call(this, ...args)
    }
}

module.exports = Base
