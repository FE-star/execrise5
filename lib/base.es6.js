class Base {

  constructor () {
    this.events = {}
    //维护一个事件的map表    事件名:回调
    //name:[cb1,cb2...] 为支持一个事件绑定多个回调
  }

  trigger (event, ...args) {
    (this.events[event] || []).forEach(cb => {
      cb.apply(this, args)
    })
  }
  //因为支持多个回调 这里维护的是一个数组 需要forEach 执行数组中的每个回调。
  on (event, cb) {
    (this.events[event] = this.events[event] || []).push(cb)

  }
}

module.exports = Base