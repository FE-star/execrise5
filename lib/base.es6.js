class Base {
  constructor() {
    this.events = {};
  }

  on(event, cb) {
    if (this.events[event]) {
      this.events[event].push(cb.bind(this));
    } else {
      this.events[event] = [cb.bind(this)];
    }
  }

  trigger(event, val) {
    if (this.events[event].length) {
      for (const cb of this.events[event]) {
        cb(val);
      }
    }
  }

  off(event, cb) {
    if (this.events[event].length) {
      this.events[event].forEach((item, index) => {
        if (cb.toString() === item.toString()) {
          this.events[event].splice(index, 1);
        }
      });
    }
  }
}

module.exports = Base
