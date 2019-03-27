function Base() {
    this.handlers = {};
}
Base.extend = function () {
    var arr = arguments;
    var fn = function(){
        Base.call(this);
    }

    fn.prototype = new this;

    if (arr.length) {
        var len = arr.length;
        for (var i = 0; i < len; i++) {
            var object = arr[i];
            for (const key in object) {
                //搞不懂
                fn[key] = object[key];
                fn.prototype[key] = object[key];
            }
        }
    }
    fn.extend = this.extend;
    return fn;
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