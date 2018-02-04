class Base {
  constructor() {
    this._events = {}
  }
  on(type, handle) {
    this._events[type] = handle
  }
  trigger(type, data) {
    this._events[type].call(this, data)
  }
}

module.exports = Base