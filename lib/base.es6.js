class Base {
  constructor() {
    this.events = {};
  }

  on(event, fn) {
    (this.events[event] = this.events[event] || [])
      .push(fn);
  }

  trigger(event, ...args) {
    (this.events[event] || [])
      .forEach((fn) => {
        fn.apply(this, args);
      })
    // for 循环比 forEach 性能好一些
    // var eventList = this.events[event] || [];
    // for (var i = 0, len = eventList.length; i < len; i++) {
    //   eventList[i].apply(this, args);
    // }
  }
}

module.exports = Base
