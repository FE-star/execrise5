class Base {
  constructor() {
    this.events = {}; // “事件管理对象”
  }
  on(type, handler) {
    if (!this.events[type]) this.events[type] = [];
    this.events[type].push(handler);
  }
  trigger(type) {
    const args = Array.prototype.slice.call(arguments, 1); // 获取传入参数
    const handles = this.events[type];
    if (handles && handles.length) {
      for (let i = 0, len = handles.length; i < len; i++) {
        handles[i].apply(this, args);
      }
    }
  }
}

module.exports = Base