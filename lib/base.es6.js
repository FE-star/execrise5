class Base {
  constructor(){
    this.events = {};
  }

  on(name, handler){
    this.events[name] = handler;
  }

  trigger(name, ...arg){
    let handler = this.events[name];
    handler.apply(this, arg);
  }
}

module.exports = Base
