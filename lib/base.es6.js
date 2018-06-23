class Base {
  constructor() {
    this.subscribes = new Map();
    this.index = 0;
  }

  addListen(eventName, callback) {
    if (!this.subscribes.has(eventName)) {
      this.subscribes.set(eventName, new Map())
    }
    this.subscribes.get(eventName).set(++this.index, callback);
  }

  on(evertName, callback) {
    this.addListen(evertName, callback)
  }

  trigger(evertName, ...arg) {
    const evertMaps = this.subscribes.get(evertName);
    evertMaps.forEach(map => map.call(this, ...arg))
  }

}

module.exports = Base