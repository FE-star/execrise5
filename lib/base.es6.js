class Base {

  // events = []

  constructor (options) {
    this.events = {}
  }

  on (name, callback) {
    let eventList = this.events[name]
    if (!eventList) eventList = this.events[name] = []
    if (eventList.indexOf(callback) === -1) {
      eventList.push(callback)
    }

    return this;
  }

  trigger (name, data) {
    if (this.events[name]) {
      this.events[name].forEach((callback) => {
        callback.call(this, data)
      })
    }

    return this;
  }
}

module.exports = Base
