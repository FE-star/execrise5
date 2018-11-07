class Base {
  constructor() {
    this._handlers = {}
  }
  on(eventName, handle) {
    if(!this._handlers[eventName]) 
      this._handlers[eventName] = [];
    this._handlers[eventName].push(handle.bind(this));
  }

  trigger(eventName, value) {
    if (!this._handlers[eventName]) return;
    this._handlers[eventName].forEach(handle => {
      handle(value);
    })
    delete this._handlers[eventName];
  }
}

module.exports = Base