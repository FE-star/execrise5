function Base() {
    this.evList = {};
}
Base.extend = function (props, methods) {
      function Child() {
        Base.call(this)
      }
      Child.prototype = new this;
    
      // copy props
      for (var i in props) {
        Child.prototype[i] = props[i];
      }
    
      // copy static methods
      for (var j in methods) {
        Child[j] = methods[j];
      }
    
      Child.extend = this.extend;
      return Child;
}

Base.prototype = {
    on:function(name,fn){
        this.evList[name] = fn.bind(this);
    },
    trigger:function(name,fn){
        this.evList[name](fn);
    }
}

module.exports = Base