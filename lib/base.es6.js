class Base {
    constructor(){
        this.events= {};
    }
    on(event,cb){
        (this.events[event]||[]).push(cb);
    }
    trigger(event,...args){
        (this.events[event]|| []).forEach(cb=>{
            cb.apply(this,args)
        })
    }
}

module.exports = Base