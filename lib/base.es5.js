function Base() {
  this.events = [];
}

function merge (target) {
  var srcs = Array.prototype.slice.call(arguments, 1);
  srcs.forEach(function (src) {
      for (var key in src) {
          if(src.hasOwnProperty(key)) {
              console.log(2)
              target[key] = src[key];
          }
      }
    })
  }

Base.extend = function (proto, static) {

  var Super = this;
  function Sub() {
      Super.call(this);
  };
  Sub.prototype = Object.create(Super.prototype);
  merge(Sub.prototype, proto);
  merge(Sub, Base, static);
  return Sub;

 }

 merge(Base.prototype, {
     on: function (event,fn) {
        (this.events[event] = this.events[event] || []).push(fn);
     },
     trigger: function (event,...args) {
       for(let i=0;i<this.events[event].length;i++){
         this.events[event][i].apply(this,args);
         }
     }
 })


module.exports =  Base
