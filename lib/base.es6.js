class Base {
    constructor(){
        this.events= {};
    }
    on(event,cb){
        //单个监听
       // this.events[event]=cb;
       //监听多个
        (this.events[event]=this.events[event]||[]).push(cb);
    }
    trigger(event,...args){
        //监听事件并传值
       /*  if(this.events[event]) {
            this.events[event](...args);
        } */
        //监听函数的this指向自己
        (this.events[event]|| []).forEach(cb => {
            cb.apply(this,args)
        })
    }
}

module.exports = Base
