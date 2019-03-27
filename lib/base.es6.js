class Base {
    constructor(options){
        this.handlers = {};
    }
}
Base.prototype.addHandler = function(type,handler){
    if(typeof this.handlers[type] == 'undefined'){
        this.handlers[type] = [];
    }

    this.handlers[type].push(handler);
}

Base.prototype.on = function(eventName,callback){
    //给对应的事件数组里添加对应的回调
    if(!this.handlers){
        this.handlers = [];
    }
    if(!this.handlers[eventName]){
        this.handlers[eventName] = [];
    }
    this.handlers[eventName].push(callback);
}

Base.prototype.trigger = function(eventName,value){
    if(this.handlers[arguments[0]]){
        var len = this.handlers[arguments[0]].length;
        for(var i=0;i<len;i++){
            // 回调执行时，this绑定到当前对象
            this.handlers[arguments[0]][i].call(this,value);
        }
    }
}


module.exports = Base