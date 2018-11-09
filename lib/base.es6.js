class Base {
    constructor () {
        this.watchList = {};
    }

    on (name, func) {
        if (this.watchList[name]) {
            this.watchList[name].push(func.bind(this));
        }
        this.watchList[name] = [func.bind(this)];
    }

    trigger (name, param) {
        if (this.watchList[name]) {
            this.watchList[name].map(func => {
                func(param);
            })
        }
    }
}

module.exports = Base