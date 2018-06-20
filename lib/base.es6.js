class Base {
  constructor() {
    this.subscribers = {};
  }
  trigger(type, ...args) {
    if (!this.subscribers[type]) return;
    this.subscribers[type].forEach(ele => ele(...args));
  }
  on(type, fn) {
    this.subscribers[type] = this.subscribers[type] || [];
    this.subscribers[type].push(fn.bind(this));
  }
}

module.exports = Base