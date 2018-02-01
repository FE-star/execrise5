class Base {
  constructor() {
    this.evtList = {};
  }

  on(evt, handle) {
    this.evtList[evt] = handle;
  }
  
  trigger(evt, ...args) {
    this.evtList[evt].call(this, ...args);
  }
}

module.exports = Base