class Base {
    constructor() {
        this.events = {};
    }

    on(event, fn) {
      this.events[event] = fn.bind(this)
    }

    trigger(event, ...args) {
      this.events[event](...args)
    }
}

module.exports = Base
