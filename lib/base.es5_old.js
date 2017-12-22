function Base() {
	this.handler = [];
}

Base.extend = function () {

   var args = arguments || {};
   var argsArr = Array.prototype.slice.call(args) 
   
   function fn(){
   	   Base.call(this)
   };
   
   fn.prototype = new this();
   
   //继承父类的静态方法
   for(var i=0;i<argsArr.length;i++){
       for(var j in argsArr[i]){
          //原型 和 构造函数上都加
          fn.prototype[j] = argsArr[i][j];
          fn[j] = argsArr[i][j];
       }
   } 
   
   //继承 Base 的静态属性
   for(var i in this){
       if(this.hasOwnProperty(i)){
          fn[i] = this[i];     
       }
   }
   
   return fn;
}


Base.prototype.on = function(type,fn){
     var obj = {};
     //obj[type] = fn.bind(this);
     obj[type] = bind(fn,this);
     this.handler.push(obj);
}

//自定义 bind
function bind(fn,context){
    return function(){
    	 return fn.apply(context,arguments);
    }
} 


Base.prototype.trigger = function(type,arg){
    for(var i = 0;i < this.handler.length ; i++){
          for(var j in this.handler[i]){
              if(j === type){
                 this.handler[i][j](arg);
              }
          }
    }
}

module.exports = Base