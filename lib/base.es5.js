function Base() {
    this.watchList = [];
}

Base.prototype = {
    on : function(name, func) {
        if (this.watchList[name]) {
            this.watchList[name].push(func).bind(this);
        }
        this.watchList[name] = [func.bind(this)];
    },
    trigger : function(name, param){
        if (this.watchList[name]) {
            this.watchList[name].map(func => func(param));
        }
    }
}
function merge(target){
    var srcs = Array.prototype.slice.call(arguments, 1);
    srcs.forEach(function (src) {
        for (var key in src) {
            if(src.hasOwnProperty(key)) {
                target[key] = src[key];
            }
        }
    })
}

Base.extend = function(proto, static){
    var Super = this;
    function sub(){
        Super.call(this);
    }
    var protoFun = function(){}
    protoFun.prototype = this.prototype;
    sub.prototype = new protoFun();
    merge(sub.prototype, proto);
    merge(sub, Super, static);
    return sub;
}


module.exports = Base;