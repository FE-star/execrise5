class Base {
  
  constructor(){
    this.listener = {}
  }

  trigger(event, msg){
    this.listener[event](msg);
  }

  on(event, func){
    this.listener[event] = func.bind(this)
  }
}

module.exports = Base