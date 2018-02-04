class Base {
  constructor() {
    this.options = {}
  }
  on(e, cb) {
    return this.options[e] = cb
  }
  trigger(e, ...args) {
    return this.options[e].call(this, ...args)
  }
}

module.exports = Base