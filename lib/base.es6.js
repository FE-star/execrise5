class Base {
    constructor() {
        this.handlers = {};
    }
    on(eveType, handler) {
        if (!(eveType in this.handlers)) {
            this.handlers[eveType] = [];
        }
        this.handlers[eveType].push(handler);
    }
    trigger(eveType, ...args) {
        if (!(eveType in this.handlers)) {
            return;
        }
        let handlers = this.handlers[eveType];
        for (let i = 0; i < handlers.length; i++) {
            handlers[i].call(this, ...args);
        }
    }
}

module.exports = Base