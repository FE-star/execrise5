class Base {
  constructor() {
    this.events = {}
  }
  on(event, cb) {
    this.events[event] = {}
    this.events[event].name = event
    this.events[event].callback = cb.bind(this)
  }
  trigger(event, value) {
    this.events[event].callback(value)
  }
}

module.exports = Base