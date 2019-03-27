class Base {
  constructor() {
    this.watchList = {};
  }

  on(event, fn) {
    this.watchList[event] && this.watchList[event].push(fn.bind(this));
    this.watchList[event] = [fn.bind(this)];
  }

  trigger(event, value) {
    this.watchList[event] && this.watchList[event].map(fn => {
      fn(value);
    });
  }
}

module.exports = Base