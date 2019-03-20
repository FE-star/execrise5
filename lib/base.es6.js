class Base {
  constructor(options) {
    this.options = options;
    this.event = {};
  }

  on(eventName, fn) {
    this.event[eventName] = fn;
  }

  trigger(eventName, ...value) {
    this.event[eventName].call(this, ...value)
  }
}

module.exports = Base