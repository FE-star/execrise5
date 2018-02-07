class Base {
  constructor() {
    this.evnets = {};
  }
  on(event, fn) {
    (this.evnets[event] = this.evnets[event] || []).push(fn);
  }
  trigger(event, ...args) {
    (this.evnets[event] || []).forEach(fn => {
      fn.apply(this, args);
    });
  }
}

module.exports = Base;
