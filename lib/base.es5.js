function Base() {
  this._handlers = {};
}
Base.prototype.on = function(type, fn) {
  if(!this._handlers[type]) {
    this._handlers[type] = [];
  }
  this._handlers[type].push(fn);

}
Base.prototype.trigger = function(type, args) {
  if(!this._handlers[type]) {
    return;
  }
  let i = 0,
  len = this._handlers[type].length;
  for(; i < len; i++) {
    this._handlers[type][i].call(this, args);
  }
}

Base.extend = function (protoM, staticM) {	
  var Super = function () {
    Base.call(this);
  };
  Super.prototype = Object.create(this.prototype);
  Super.prototype.constructor = Super;    
  
  for(var item in protoM) {
    var obj = protoM[item];
    if(isObject(obj) || isArray(obj)) {
      var extended = Base.extend(obj);
      Super.prototype[item] = extended;
    } else {
      Super.prototype[item] = protoM[item];
    }
  }
  for(var item in staticM) {
    var obj = staticM[item];
    if(isObject(obj) || isArray(obj)) {
      var extended = Base.extend(obj);
      Super[item] = extended;
    } else {
      Super[item] = staticM[item];
    }
  }
  

  Super.extend = Base.extend;
  return Super;
  
}
function isObject(source)  {
	return Object.prototype.toString.call(source)  === '[object Object]'
}
function isArray(source)  {
	return Object.prototype.toString.call(source)  === '[object Array]'
}
module.exports = Base