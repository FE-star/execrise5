class Base {
  constructor() {
    this.events = {}
  }
  on (eventname, func) {
    if(!this.events[eventname]) {
      this.events[eventname] = []
    }
    this.events[eventname].push(func.bind(this))
  }
  trigger(eventname, params) {
    if(this.events[eventname]) {
      this.events[eventname].forEach(fn => {
        fn(params)
      })
    }
  }
}

module.exports = Base