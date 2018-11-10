function Base() {
    this._handlers = {};
  }
  Base.extend = function (protoProps, staticProps) { // extend一个类
    function Child() {
      Base.call(this);
    };
    Child.prototype = Object.create(this.prototype, (() => {
      const _properties = {}
      protoProps && Object.keys(protoProps).forEach(key => {
        _properties[key] = {
          value: protoProps[key]
        }
      })
      return _properties;
    })());
    // 静态属性
    staticProps && Object.keys(staticProps).forEach(key => {
      Child[key] = staticProps[key];
    })
    // 多次extend
    Child.extend = this.extend;
    return Child;
  }
   Base.prototype.on = function(eventName, handle) { // 监听
    if(!this._handlers[eventName]) 
        this._handlers[eventName] = [];
      this._handlers[eventName].push(handle.bind(this));
  }
   Base.prototype.trigger = function(eventName, value) { // 传值
    if (!this._handlers[eventName]) return;
      this._handlers[eventName].forEach(handle => {
        handle(value);
      })
      delete this._handlers[eventName];
  }

module.exports = Base