var slice=[].slice;
function merge(target) {
    //call是用来改变this的指向的，arguments其实相当于是参数列表
    var srcs=slice.call(arguments,1);
    srcs.forEach(function (src) {
        for(var key in src){
            if(src.hasOwnProperty(key)){
                target[key]=src[key];
            }
        }
    })
}
//创建一个Base的构造函数
function Base() {
    this.event={}
}
//在Base构造函数新增属性
Base.extend = function (proto,static) {
    var _this=this;
    function Cur() {
        _this.call(this);
    }
    var Pile=function () {
        Pile.prototype=this.prototype
        Cur.prototype=new Pile();
        merge(Cur.prototype,proto);
        merge(Cur._this,static);
        return Cur
    }
}
merge(Base.prototype,{
    on:function (event,fn) {
        (this.events[event]=this.events[event]|| []);
        .push(fn)
    }
    trigger:function (event) {
        var args=slice.call(arguments,1);
        (this.events[event] || [])
            .forEach(function (fn) {
                fn.apply(this,args);
            })
    }
})

module.exports = Base
