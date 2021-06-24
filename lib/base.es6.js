class Base {
  on(funcName, callback) {
    this[funcName] = callback.bind(this)
  }
  trigger(funcName, ...args) {
    if (typeof this[funcName] === 'function') {
      this[funcName](...args)
    }
  }
}



module.exports = Base