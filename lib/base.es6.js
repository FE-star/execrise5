class Base {

    constructor(){
        this.events = {}
    }

    on(event, callback){
        (this.events[event] = this.events[event] || [])
            .push(callback);
    }

    trigger(event, options){
        (this.events[event] || [])
            .forEach(fn => {
                fn.call(this, options);
            });
    }
}

module.exports = Base