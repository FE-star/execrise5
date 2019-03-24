class Base {
    constructor() {
        this.eventMap = {}
    }

    trigger(name, ...params) {
        this.eventMap[name].call(this, params)
    }

    on(name, callback) {
        this.eventMap[name] = callback
    }

}

module.exports = Base