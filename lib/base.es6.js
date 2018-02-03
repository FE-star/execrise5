class Base {
  constructor () {
    this.events = {}
  }

  on (name, cb) {
    this.events[name] = cb.bind(this)
  }

  trigger (name, ...args) {
    this.events[name](...args)
  }
}

module.exports = Base
