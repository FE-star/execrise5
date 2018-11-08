function Base() {}
Base.extend = function () {
    function obj(){}
    obj.__proto__=this
    obj.prototype.__proto__=this.prototype
    for(idx in arguments){
        for(ext in arguments[idx]){
            obj.prototype[ext]=arguments[idx][ext]
            obj[ext]=arguments[idx][ext]
        }
    }
    return obj
}
Base.prototype.mqList={}
Base.prototype.on=function(tName,callBack){
    this.mqList[tName]=callBack
}
Base.prototype.trigger=function(tName){
    var args = Array.prototype.slice.call(arguments);
    args.shift()
    this.mqList[tName].apply(this,args)
}
module.exports = Base