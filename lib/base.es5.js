function Base() {
  this._handlers = {};
}
Base.extend = function (protoProps, staticProps) {
  function Child() {
    Base.call(this);
  };
  Child.prototype = Object.assign(new this, protoProps);
  Object.assign(Child, this, staticProps);
  return Child;
}

Base.prototype.on = function(eventName, handle) {
  if(!this._handlers[eventName]) 
      this._handlers[eventName] = [];
    this._handlers[eventName].push(handle.bind(this));
}

Base.prototype.trigger = function(eventName, value) {
  if (!this._handlers[eventName]) return;
    this._handlers[eventName].forEach(handle => {
      handle(value);
    })
    delete this._handlers[eventName];
}

module.exports = Base