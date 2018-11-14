
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
    this.events={}
}

Base.extend = function (proto,static) {
    var Super=this;
    var Sub=function(){
        Super.apply(this);
    }


    // 一般方法
    // Sub.prototype=new Super()


    // 节省内存方法，创造一个空函数
    var Func=function(){}
    Func.prototype=Super.prototype;
    Sub.prototype=new Func();

    merge(Sub.prototype,proto);
    merge(Sub,Super,static)
    return Sub
}


merge(Base.prototype,{
    on:function(event,cb){
        (this.events[event]=this.events[event]||[])
        .push(cb)
    },
    trigger:function(event,param){
    
        
        var args=slice.call(arguments,1);
        var self=this;
       (this.events[event]||[]).forEach(function(cb){
       
            // cb.call(self,param)
            cb.apply(self,args)
       })
    }
})


// Base.prototype.on=function(event,cb){
//     this.events[event]=this.events[event]||[];
//     this.events[event].push(cb)
// }



// Base.prototype.trigger=function(event){
    
//     var args=slice.call(arguments,1);

//     var self=this;
//    (this.events[event]||[]).forEach(function(cb){
//         cb.apply(self,args)
//    })
// }

module.exports = Base