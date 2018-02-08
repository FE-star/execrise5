class Base {
    constructor(){
      this.events={};
    }
    on(event,fn){
        (this.events[event]=this.events[event]||[])
            .push(fn)
    }
    trigger(event,...args){
        // (this.events[event]||[])
        //     .forEach((fn)=>{
        //         fn.apply(this,args)
        //     })
        var eventsList = this.events[event]||[];
        for (var i=0;i<eventsList.length;i++){
            eventsList[i].apply(this,args)
        }
    }
}

module.exports = Base