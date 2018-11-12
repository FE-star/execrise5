class Base {
    constructor(){
        this.events={}
    }

    on(action,cb){
        this.events[action]=cb
    }

    trigger(action,...args){
        this.events[action](...args)
    }
}

module.exports = Base