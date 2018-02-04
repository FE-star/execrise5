class Base {
    constructor(options){
        this.options = options;
        this.events = {};
    }

    on(eventName, eventFun){
        if(!eventName){
            throw new Error("请传递事件名称");
        }
        if(!eventFun){
            throw new Error("请传递事件的回调函数");
        }
        this.events[eventName] = eventFun;
    }
    trigger(eventName, ...args){//第一个参数为绑定的事件名称，args为其他参数
        if(!eventName || !this.events[eventName]){
            throw new Error("事件未绑定");
        }

        this.events[eventName].apply(this,args);
    }
    // arguments 的方法也可以，但不推荐，use strict 可能有问题
    // trigger(eventName){
    //     if(!eventName || !this.events[eventName]){
    //         throw new Error("事件未绑定");
    //     }
    //     var args = Array.prototype.splice.call(arguments,1,arguments.length);

    //     this.events[eventName].apply(this,args);
    // }
}

module.exports = Base