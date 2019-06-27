class Base {
    constructor() {
    //    存储各种触发回调函数，通常用数组
     this.events = {};
    }
    // 监听事件，参数：事件名，回调函数
    on(event, callback) {
      if (!Array.isArray(this.events[event])) {
        this.events[event] = [];
      }
      this.events[event].push(callback.bind(this));
    }
    //触发事件函数trigger
    trigger(event, ...args) {
      if (Array.isArray(this.events[event])) {
        this.events[event].forEach((callback) => callback(...args));
      }
    }
}

module.exports = Base