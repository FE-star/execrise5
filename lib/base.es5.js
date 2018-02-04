function merge(target){
    var srcs = [].slice.call(arguments,1)
  
    srcs.forEach(function(src){
        for(var prop in src){
            if(src.hasOwnProperty(prop)){
                target[prop] = src[prop]
            }
        }
    })
}
function Base(opt) {
   this.handlers = {}

}
Base.extend = function(opt, static){
    var Sup = this;
    function Cur(){
        Sup.call(this)
    }
    function A(){}
    A.prototype = Sup.prototype;
    Cur.prototype = new A
    Cur.constructor = Cur;
    merge(Cur.prototype, opt);
    merge(Cur,Sup, static);
    return Cur
}

merge(Base.prototype,{
    on: function(type, fn){
        (this.handlers[type] = this.handlers[type] || []).push(fn.bind(this))
    },
    trigger: function(type){
        var arg = [].slice.call(arguments,1);
        (this.handlers[type] =  this.handlers[type] || []).forEach(function(fn){
            fn(arg)
        })
    }
})

module.exports = Base