function Base() {
  this.event = {}
}
Base.extend = function (props,event) {
  // console.log(arguments);
  function Son(){
    Base.call(this)
  }
  Son.prototype = new this;
  for(var k in props){
      Son.prototype[k] = props[k]
  }

  for(var i in event){
    Son[i] = event[i]
  }

  Son.extend = Base.extend
  console.log(Son)
  return Son;
}

Base.prototype.on = function (target,event) {
    this.event[target] = event
}

Base.prototype.trigger = function (target,args){
    this.event[target].call(this,args)
}

module.exports = Base