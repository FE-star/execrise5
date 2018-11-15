var slice=[].slice;
function merge(target) {
    console.log(target);
    //调用方法的参数取出来、 arguments,函数内部的变量，值是函数参数列表，一个类数组对象
    //hasOwnProperty ,判断一个属性是定义在对象本身而不是继承原型链
    var sources = slice.call(arguments,1);   
    sources.forEach(function(source){
        for(var key in source) {
            if(source.hasOwnProperty(key)) {
                target[key]= source[key];
            }
        }
    });
}
function Base() {
    this.events={};
}
Base.extend = function (proto,static) {
    var Super = this;     //父类Base
    var Sub = function() {
        Super.apply(this);          //继承父类属性，构造继承
    };
    //优化内存空间，创建没有实例的类，将父类属性赋值到func
    var Func= function() {};
    Func.prototype= Super.prototype;
    Sub.prototype = new Func();     //原型链继承
    console.log(Sub);
    merge(Sub.prototype,proto);
    merge(Sub,Super,static);

   return Sub;

}
merge(Base.prototype,{
    on:function(event,cb){
        //this.events[event] = this.events[event] || []
        //this.events[event].push(cb)
        (this.events[event]=this.events[event]||[]).push(cb);
    },
    trigger:function(event){
        //将参数列表转换为数组
        var args = slice.call(arguments,1 );
        var self=this;
        (this.events[event]||[]).forEach(function(cb){
            cb.apply(self,args);
        })
    }
})

module.exports = Base
