
class Base{
    
    constructor(option){
       this.option = option;
       this.handlers = {};
    }

    on(type,handler){
         if(!this.handlers[type]){
             this.handlers[type] = [];                    
         }
         this.handlers[type].push(handler);
    }

    trigger(type,arg){
        let arr = this.handlers[type];
        arr.forEach((ele,index)=>{
             //做一下 this 绑定
             ele.call(this,arg);
        })
    }
}


module.exports = Base


