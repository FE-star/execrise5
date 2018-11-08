class Base {
  constructor(){
    this.listener = {}
  }
  on(name, callback){
    this.listener[name] = callback
  }
  trigger(name, payload){
    let callback = this.listener[name].bind(this);
    callback(payload)
  }
}

module.exports = Base