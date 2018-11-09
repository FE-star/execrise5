class Base {
  constructor() {
    this.observers = {};
  }

  on(_eventName, _observer) {
    if (!this.observers[_eventName]) {
      this.observers[_eventName] = [];
    }
    this.observers[_eventName].push(_observer);
  }

  trigger(_event, params) {
    this.observers[_event].forEach((_observer) => {
      _observer.call(this, params);
    });
  }
}


module.exports = Base