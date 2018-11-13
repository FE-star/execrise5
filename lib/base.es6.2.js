class Base {
  constructor() {
    this.events = {}
  }
  on (eventname, func) {
    if(!this.events[eventname]) {
      this.events[eventname] = []
    }
    this.events[eventname].push(func)
  }
  trigger(eventname, ...params) {
    if(this.events[eventname]) {
      this.events[eventname].forEach(fn => {
        fn.apply(this, params)
      })
    }
  }
}

module.exports = Base