class Base {
  constructor() {
    this.observerList = {}
  }
  on(type, fn) {
    if (!this.observerList[type]) {
      this.observerList[type] = [];
    }
    this.observerList[type].push(fn.bind(this));
  }
  trigger(type, ...args) {
    const fns = this.observerList[type];
    if (!fns || !fns.length) return;
    for (let i = 0; i < fns.length; i ++) {
      fns[i](...args);
    }
  }
}

module.exports = Base