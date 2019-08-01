class Base {
  constructor() {
    this.events = {};
  }

  on(eventType, callback) {
    let callbacks = this.events[eventType] || [];

    callbacks.push(callback);

    this.events[eventType] = callbacks;
  }

  trigger(eventType, ...args) {
    let callbacks = this.events[eventType];

    callbacks.forEach(callback => callback.apply(this, args));
  }
}

module.exports = Base