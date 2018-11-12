class Base {
  constructor(props) {
    this.listener = {};
  }
  on(event, fn) {
    this.listener[event] = this.listener[event]
      ? this.listener[event].push(fn)
      : [fn];
  }
  trigger(event, ...arg) {
    if (this.listener.hasOwnProperty(event) && this.listener[event]) {
      this.listener[event].map(e => {
        e.call(this, ...arg);
      });
    }
  }
}

module.exports = Base;
