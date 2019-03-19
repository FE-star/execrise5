class Base {
    constructor(options) {
        this.eventList = new Array();
    }

    on (event, cb){
        this.eventList[event] = cb;
    }

    trigger(event, ...arg) {
        this.eventList[event].apply(this, arg);
    }
}

module.exports = Base
