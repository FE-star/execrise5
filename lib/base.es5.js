
var  slice=[].slice

function merge(target){
    var sources=slice.call(arguments,1)//把target参数去掉？类数组转化为数组
    // console.log(sources)
    sources.forEach(source => {
        for(var key in source){

            if(source.hasOwnProperty(key)){
                target[key]=source[key];
            }
        }
    });
}

function Base() {
    this.event={}
}

Base.extend = function (proto,static) {
   
    var Super=this;

    var Sub=function(){
        Super.apply(this)
    }
    

    var Func=function(){}
    Func.prototype=Super.prototype;
    Sub.prototype=new Func();
    merge(Sub.prototype,proto);
    merge(Sub,Super,static)

    return Sub

}

module.exports = Base