class Base {
  constructor() {
    this.events = {};
  }

  on(eventType, handle) {
    if (!this.events[eventType]) {
      this.events[eventType] = [];
    }
    this.events[eventType].push(handle);
  }

  trigger(eventType) {
    let handles = this.events[eventType];
    if (handles && handles.length) {
      handles.forEach((handle) => {
        handle.apply(this, Array.prototype.slice.call(arguments, 1));
      });
    }
  }

}

module.exports = Base;