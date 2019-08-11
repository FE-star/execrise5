class Base {
  constructor(options){
    this.events = [];
  }
  on(name, fn) {
    this.events[name] = fn;
  }
  trigger(name, value){
    this.events[name] && this.events[name].call(this, value);
  }
}

module.exports = Base