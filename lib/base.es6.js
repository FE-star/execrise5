class Base {
  constructor(options) {
    this.options = options;
    this.event = {};
  }

  on(eventName, fn) {
    if (!this.event[eventName]) {
      this.event[eventName] = [fn];
    } else {
      this.event[eventName].push(fn);
    }
  }

  trigger(eventName, ...value) {
    const events = this.event[eventName] || [];
    for (let i = 0; i < events.length; i++) {
      events[i].call(this, ...value)
    }
  }
}

module.exports = Base