
function Base(option){
     this.option = option;
     this.handlers = {};
}

Base.prototype.on = function(type, handler){
     
     if(!this.handlers[type]){
         this.handlers[type] = [];  
     }
     this.handlers[type].push(handler)
}



Base.prototype.trigger =  function(type, arg){
       let arr = this.handlers[type];
       arr.forEach((ele, index)=>{
             ele.call(this, arg);
       })
}


//开始真正的继承
Base.extend = function(){
    

    let arg = arguments || {};

    var args = Array.prototype.slice.call(arg);


    //将参数转变成数组
    var f = function(){
    	//先执行一下Base 的构造函数 并切绑定 this
    	Base.call(this);
    }

    f.prototype = new this();
    //继承 arguments属性 及原型属性
    for(let i in args){
        for(let j in args[i]){
            f[j] = args[i][j]; 
            f.prototype[j] = args[i][j]
        }
    } 

    for(var j in this){
    	//hasOwnProperty 是判断某个属性是不是静态属性
        if(this.hasOwnProperty(j)){
            f[j] = this[j]
        }
    }
    return f;   
}


module.exports = Base;
