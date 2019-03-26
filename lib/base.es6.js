class Base {
  constructor(name){
      this.name = name
  }
  on(event,cb){
    this[event] = cb;
    return this;
  }
  trigger(event,args){
    
    if(this[event]){
      this[event](args)
    }
  }
}

module.exports = Base