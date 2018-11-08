function Base() {}
Base.extend = function (...objs) {
        
  objs.forEach(value => {
    let key = Object.keys(value)
    Object.defineProperty(Base.prototype, key, {
      value: value[key],
      writable: true
    });
  })
  
  function BaseInner() {}
  BaseInner.prototype = Object.create(Base.prototype);
  BaseInner.prototype.listener = {}
  BaseInner.prototype.on = function(name, callback){
    this.listener[name] = callback
  }
  BaseInner.prototype.trigger = function(name, payload){
    let callback = this.listener[name].bind(this);
    callback(payload)
  }
  BaseInner.extend = function(){
    return BaseInner;
  }
  BaseInner.__proto__ = Base.prototype;  
  return BaseInner;
  
}

module.exports = Base