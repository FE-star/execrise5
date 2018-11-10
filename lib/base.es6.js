class Base {
    constructor() {	
        this.evList = {};
    }
    trigger(evName, fn) {
        this.evList[evName](fn);
    }
    
    on(evName, fn) {
        this.evList[evName] = fn.bind(this);
    }
}

module.exports = Base