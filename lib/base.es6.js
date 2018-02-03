class Base {
  constructor() {
    this.functions = {};
  }

  on(eventName, fn) {
    this.functions[eventName] = fn.bind(this);
  }

  trigger(eventName, ...args) {
    this.functions[eventName](...args);
  }
}

module.exports = Base
