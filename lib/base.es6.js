class Base {
  constructor() {
    this.handlerFunc = {}
  }

  on(eName, callback) {
    if (!Array.isArray(this.handlerFunc[eName])) {
      // 判断事件是否存在
      this.handlerFunc[eName] = []
    }
    this.handlerFunc[eName].push(callback.bind(this))
  }

  trigger(eName, params) {
    this.handlerFunc[eName].forEach(func => {
      func.call(this, params)
    })
  }
}

module.exports = Base
