class Base {
  constructor() {
    this.myEvents = {}
  }

  on(event, callback){
    this.myEvents[event] = callback
  }

  trigger(event, ...args) {
    this.myEvents[event].bind(this, ...args)()
  }
}

module.exports = Base
