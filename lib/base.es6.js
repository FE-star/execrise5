class Base {
    constructor(){
        this.events = {};
    }
    on(eventName, callback) {
        if (!this.events[eventName]) {
            this.events[eventName] = [];
        }
        this.events[eventName].push(callback);
    }
    trigger(eventName, param) {
        if (this.events[eventName]) {
            this.events[eventName].map(fun => {
                fun.call(this, param);
            })
        }
    }
}

module.exports = Base