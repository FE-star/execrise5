const events = require('events');

class Base {
    constructor () {
        this.emitter = new events.EventEmitter();
    }
    on(eventName, cb) {
        this.emitter.on(eventName, cb.bind(this))
    }
    trigger(eventName, ...args) {
        this.emitter.emit(eventName, ...args)
    }
    remove(eventName, fn) {
        this.emitter.removeListener(eventName, fn)
    }
}

module.exports = Base