class Base {
  constructor() {
    this.events = [];
  }

  on(event,fn) {
    (this.events[event] = this.events[event] || []).push(fn);
  }

  trigger(event,...args) {
    for(let i=0;i<this.events[event].length;i++){
      this.events[event][i].apply(this,args);
      }
  }

}

module.exports = Base
