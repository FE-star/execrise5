class Base {
  constructor(options) {
    this.eventList = {};
  }

  on(eventName, callback) {
    if (typeof eventName === 'string' && callback instanceof Function) {
      this.eventList[eventName] = callback
    }
  }

  trigger(eventName, value) {
    if (typeof eventName === 'string') {
      this.eventList[eventName].call(this, value)
    }
  }
}

module.exports = Base
