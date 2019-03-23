class Base {
  constructor () {
    this.listener = {}
  }
  on (eventName, eventHandle) {
    this.listener[eventName] = eventHandle
  }
  trigger (eventName, content) {
    this.listener[eventName].call(this, content)
  }
}

module.exports = Base
