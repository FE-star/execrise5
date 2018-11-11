class Base {
  constructor() {
    this.handles = {};
  }
  on(name, fun) {
    this.handles[name] = fun.bind(this);
  }
  trigger(name, params) {
    if (!this.handles[name]) return;
    this.handles[name](params);
  }
}

module.exports = Base
