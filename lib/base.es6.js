class Base {
  constructor() {
    this.events = {};
  }
  on(value, action) {
    this.events[value] = action;
  }
  trigger(value, ...params) {
    this.events[value].apply(this, params);
  }
}

module.exports = Base