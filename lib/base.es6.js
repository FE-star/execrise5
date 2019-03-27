class Base {
  constructor() {
    this._handlers = {}; 
  }
  on (type, fn) {
    if(!this._handlers[type]) {
      this._handlers[type] = [];
    }
    this._handlers[type].push(fn);
  }
  trigger (type, args) {
    if(!this._handlers[type]) {
      return;
    }
    let i = 0,
    len = this._handlers[type].length;
    for(; i < len; i++) {
      this._handlers[type][i].call(this, args);
    }
  }
}

module.exports = Base