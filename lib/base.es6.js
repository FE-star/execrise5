class Base {
    constructor(){
        this.eventList={}
    }
    on(enevt,fn){
        (this.eventList['event']=this.eventList['event']||[]).push(fn);
    }
    tirgger(event,...argm){//...argm其实就是相当于是arguments参数列表
        (this.eventList['event'] || []);
        for(let i=0;i<this.eventList['event'].length;i++){
            console.log(argm);
            this.eventList['event'][i].apply(this,argm)
        }
    }
}




module.exports = Base
