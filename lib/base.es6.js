class Base {
    constructor(){
        this.event = undefined;
        this.callBack= null;
    }
    on(event,call){
        this.event = event;
        this.callBack = call;
    }
    trigger(event,para){
        if(this.event == event && this.event){
            this.callBack(para);
        }
    }
}

module.exports = Base