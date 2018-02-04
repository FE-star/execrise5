class Base {
    constructor() {
        this.events = {}
    }

    on(event, fn) {
        (this.events[event] = this.events[event] || [])
            .push(fn)
    }

    trigger(event, ...args) {
        (this.events[event] || [])
            .forEach((fn) => {
                fn.apply(this, args)
            })
    }
}


module.exports = Base