class Base {
  constructor(options) {
    this.listener = {}
  }

  on(type, fn) {
    if (this.listener[type]) {
      this.listener[type].push(fn)
    } else {
      this.listener[type] = [fn]
    }
  }

  trigger(type, value) {
    const fnList = this.listener[type]
    if (!fnList || fnList.length <= 0) {
      return
    }
    for (let i = 0; i < fnList.length; i++) {
      fnList[i].call(this, value)
    }
  }
}

module.exports = Base