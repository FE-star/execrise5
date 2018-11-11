class Base {
    constructor(options){
        this.events = {};
    }
    on(name, func) {
        if (this.events[name]) {
            this.events[name].push(func.bind(this));
        }
        this.events[name] = [func.bind(this)];
    }
    trigger(name, param){
        if (this.events[name]) {
            this.events[name].map(func => func(param));
        }
    }

}

module.exports = Base