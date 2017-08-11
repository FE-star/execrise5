function Base() {
	this.handler = [];
}

Base.extend = function () {

   var args = arguments || {};
   var argsArr = Array.prototype.slice.call(args) 
   for(var i=0;i<argsArr.length;i++){
       for(var j in argsArr[i]){
          if(i != argsArr.length -1 || argsArr.length == 1){
             this.prototype[j] = argsArr[i][j];
          }else{
          	 this[j] = argsArr[i][j];
          }
       }
   } 

   return this;
}


Base.prototype.on = function(type,fn){
     var obj = {};
     //为啥不能用 call apply
     //obj[type] = fn.bind(this);
     obj[type] = bind(fn,this);
     this.handler.push(obj);
}


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