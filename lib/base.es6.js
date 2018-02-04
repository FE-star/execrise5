class Base {
  constructor() {
    this._events = {}
  }
  on(event, fn) {
    (this._events[event] = this._events[event] || []).push(fn);
  }
  trigger(event, ...args) {
    var self = this;
    (this._events[event]||[]).forEach((fn) => {
      fn.apply(self, args)
    })
  }
}

module.exports = Base