class Base {
  constructor() {
    // 初始化一个对象（缓存列表）
    this.events = {}
  }

  on(eventType, fn) {
    // on方法用来把回调函数fn都加到缓存列表中
    if (!this.events[eventType]) {
      this.events[eventType] = []
    }
    this.events[eventType].push(fn)
  }

  trigger() {
    // trigger 方法取到arguments里第一项当做key，根据key值去执行对应缓存列表中的函数
    let key = [].shift.call(arguments)
    let fns = this.events[key]

    if (!fns || fns.length === 0) return false
    fns.forEach(fn => fn.apply(this, arguments))
  }
}

module.exports = Base
