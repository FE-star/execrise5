class Base {
    constructor() {
        this.eventMap = {};

        this.on = this.on.bind(this);
        this.trigger = this.trigger.bind(this);
    }

    on(eventName, cb) {
        if (!this.eventMap[eventName]) {
            this.eventMap[eventName] = []
        }

        this.eventMap[eventName].push(cb)
    }

    trigger(eventName, ...args) {
        const cbArr = this.eventMap[eventName];

        if (!cbArr) {
            return;
        }

        for (const cb of cbArr) {
            cb.call(this, ...args)
        }
    }
}

module.exports = Base