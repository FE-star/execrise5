class Base {
  constructor() {
    this._evts = {};
  }
  on(evtName, callback) {
    this._evts[evtName] = callback.bind(this);
  }
  trigger(evtName, ...args) {
    this._evts[evtName](...args);
  }
}

module.exports = Base