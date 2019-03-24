class Base {
    constructor() {
        this.listener = {};
    }

    trigger(action, message) {
        this.listener[action](message);
    }

    on(action, func) {
        this.listener[action] = func.bind(this);
    }

}

module.exports = Base
