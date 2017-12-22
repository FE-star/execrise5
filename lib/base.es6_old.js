//es6 的标准继承
class Base {

    constructor() {
        //主要负责 管理事件名和事件
        this.handler = {};
    }

    //实现一个自定义事件
    //以下这样写 为为何子类继承不到
    on(type, fn) {
        
        //如果当前的类型 没有初始化的话 
        if(!Array.isArray(this.handler[type])){
            //初始化为一个数组 并把handler 添加进去
            //此处注意不是空数组 如果是空数组 则相当于没有初始化完成
            this.handler[type] = [fn];      
        }else{
            //如果之前初始化完以后 就直接push了
            this.handler[type].push(fn);
        }
    }

    //触发
    trigger(type,arg) {
        
       var handlerArr = this.handler[type];
       handlerArr.forEach((elem)=>{
           elem.call(this, arg);
       })           
    }
}

module.exports = Base