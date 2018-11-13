class Base {
    constructor () {
        this.cbs = {};
    }
    on (key, fn) {
        let fns = this.cbs[key] || (this.cbs[key] = []);
        fns.push(fn);
    }
    trigger (key, ...args) {
        let fns = this.cbs[key];
        fns.forEach((fn) => {
            fn.apply(this, args);
        });
    }
}

module.exports = Base