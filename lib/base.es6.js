class Base {
    constructor(){
        this.events={}
        
    }   

    

    on(action,cb){
        this.events[action]=cb.bind(this)
    }

    trigger(action,...args){
        this.events[action](...args)
    }
}

module.exports = Base