class Base {
  constructor () {
    this.eventList = {};
  }
  on (name, callback) {
    // if (!this.eventList[name]) return
    if (this.eventList[name]) {
        this.eventList[name].push(callback.bind(this));
    }
    this.eventList[name] = [callback.bind(this)];
  }
  trigger (name, params) {
    if (this.eventList[name]) {
        this.eventList[name].map(callback => {
            callback(params);
        })
    }
  }
}

module.exports = Base