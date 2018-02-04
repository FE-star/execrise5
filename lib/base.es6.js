class Base {
  constructor() {
    this.events = {};
  }

  on(types, fn) {
    if (typeof types === "object") {
      Object.keys(types).forEach(type => {
        this.on(type, types[type]);
      });
    } else if (typeof types === "string") {
      this.events[types] = fn.bind(this);
    }
  }

  trigger(types, value) {
    if (typeof types === "object") {
      Object.keys(types).forEach(type => {
        this.trigger(type, types[type]);
      });
    } else if (typeof types === "string") {
      this.events[types](value);
    }
  }
}

module.exports = Base