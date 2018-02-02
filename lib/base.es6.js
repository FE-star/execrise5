class Base {
  constructor() {
    this.funcs = {};
  }

  on(event, func) {
    this.funcs[event]=func;
  }
  trigger(event, args) {
    this.funcs[event].call(this, args);
  }
}

module.exports = Base