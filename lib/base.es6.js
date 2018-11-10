class Base {
    constructor() {  // 构造函数
      this._handlers = {}
    }
    on(eventName, handle) { // 监听事件
        if (!this._handlers[eventName]) {
            this._handlers[eventName] = []
            this._handlers[eventName].push(handle.bind(this))
        }
        
    }
    trigger(eventName, value) { // 传参
        this._handlers[eventName].forEach(handle => {
            handle(value);
        })
    }
  }

module.exports = Base