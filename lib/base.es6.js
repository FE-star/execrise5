class Base {
  constructor(){
    this.events={}
  }
  on(eName,callback){
    this.events[eName]=callback.bind(this);
  }
  trigger(eName,...args){
    this.events[eName](...args)
  }
}

module.exports = Base