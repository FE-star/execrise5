function Base() {
  this.events={};
}

Base.prototype.on=function(eName,callback){
  (this.events[eName]=this.events[eName]||[]).push(callback)
}

Base.prototype.trigger=function(eName){
  var args=Array.prototype.slice.call(arguments,1);
  var self=this;
  (this.events[eName]||[]).forEach(function(fn){
    fn.apply(self,args);
  })
  
}

Base.extend = function (proto,static) {
  var Super=this;
  function Sub(){
    Super.call(this);//第一步调用父类构造方法
  }
  
  Sub.prototype = Object.create(Super.prototype);//第二步继承父类原型
  
  merge(Sub.prototype,proto);
  merge(Sub,static,Super);
  
  return Sub;
}

function merge(target){
  var args=[].slice.call(arguments,1);
  args.forEach(function(arg){
    for(var prop in arg){
      if(arg.hasOwnProperty(prop)){//是否继承的属性
        target[prop]=arg[prop];
      }
    }
  })
}

module.exports = Base
