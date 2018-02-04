function Base() {
    this.events = {};
}

Base.prototype.on = function(eventName, eventFun){
    if(!eventName){
        throw new Error("请传递事件名称");
        return;
    }
    if(!eventFun){
        throw new Error("请传递事件的回调函数");
        return;
    }
    this.events[eventName] = eventFun;
}

Base.prototype.trigger = function(eventName){

    if(!eventName || !this.events[eventName]){
        throw new Error("事件未绑定");
        return;
    }

    var args = Array.prototype.splice.call(arguments,1,arguments.length);

    this.events[eventName].apply(this,args);
}

Base.extend = function () {
    var parent = this;
    function SubClass(events){
        parent.apply(this, events); //继承父类的实例属性
    }
    SubClass.prototype = new this; //和 new Base有啥区别，new Base就不行，无法进行多次 extend
    for(let key in arguments){
        if(arguments[key] instanceof Object){
            for(let p in arguments[key]){
                SubClass.prototype[p] = arguments[key][p];//实例方法，用实例调用
                SubClass[p] = arguments[key][p];//类方法，用类调用
            }
        }
    }
    SubClass.extend = this.extend;
    return SubClass;
}

module.exports = Base