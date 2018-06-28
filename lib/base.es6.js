class Base {
  constructor(options) {
    this.options = options || {};
  }

  on(type, fn) {
    this.options[type] = this.options[type] || [];
    this.options[type].push(fn.bind(this));
  }

  trigger(type, ...args) {
    if (!this.options[type]) {
      return;
    }
    this.options[type].forEach(fn => {
      fn(...args);
    });
  }
}

module.exports = Base