class Base {
    constructor() {
        // looks like: { 'test': [event1, event2, event3], 'test2': [XXX] }
        this.events = new Map()
        this.sentence = 'hello world'
    }
    on(type, handler) {
        const givenTypeEvents = this.events.get(type)
        const newHandler = handler.bind(this)
        this.events.get(type) ? 
            givenTypeEvents.push(newHandler) :
            this.events.set(type, [newHandler])  // first push of this type
    }
    trigger(type) {
        const givenTypeEvents = this.events.get(type)
        givenTypeEvents.forEach(event => event(this.sentence)())
    }
}

module.exports = Base