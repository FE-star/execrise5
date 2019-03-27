class Base {
  constructor() {
    this.listener = {};
  }
  // dispatch
  trigger(action, message) {
    this.listener[action](message);
  }

  // subscribe
  on(action, listener) {
    this.listener[action] = listener.bind(this);
  }
}

module.exports = Base