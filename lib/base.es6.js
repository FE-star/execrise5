class Base {
    constructor(){
        this.listener = {}
    }
    on(name, fn) {
        this.listener[name] = fn.bind(this)
    }
    trigger(name, ...arg) {
        this.listener[name] && this.listener[name](...arg)
    }
}

module.exports = Base