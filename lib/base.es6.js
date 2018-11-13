class Base {
  constructor() {
    this.events = {}
  }
  on (eventname, func) {
   this.events[eventname] = func
  }
  trigger(eventname, ...params) {
   this.events[eventname].call(this, params)
  }
}

module.exports = Base