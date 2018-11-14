class Base {
    constructor(){
        this.events={}
        
    }   

    

    on(event,cb){
        // 这个只能传一个回调
        // this.events[event]=cb.bind(this)

        // 这样就能一个事件，就能传多个回调
        this.events[event]=this.events[event]||[]
        this.events[event].push(cb.bind(this))
    }

    trigger(event,...args){
        // 这个只能触发一个回调
        // if(this.events[event]){
        //     this.events[event](...args);
        // }
       

        // 这样就能触发多个回调
        (this.events[event]||[]).forEach(cb => {
            cb.call(this,...args)
   
            
        });
    }
}

module.exports = Base