class Base {
    constructor () {
        this.eventList = {}
    }
    on (eventname, callback) {
       this. eventList[eventname] = callback;
    }
    trigger (eventname, val = '') {
        this.eventList[eventname]  && this.eventList[eventname] .call(this, val);
    }
}

module.exports = Base