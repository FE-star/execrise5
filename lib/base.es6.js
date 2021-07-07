class Base {
    constructor() {
        this.eventList = {}
    }
    on(eventName, fn) {
       if (this.eventList[eventName]) {
          this.eventList[eventName].push(fn)
       } else {
        this.eventList[eventName] = [fn]
       }
    }
    trigger(eventName, ...args) {
        let list = this.eventList[eventName]
        let len = list.length
        for(;len--;) {
            list[len].apply(this, args)
        }
    }
}

module.exports = Base