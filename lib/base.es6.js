class Base {
    constructor () {
        this.List = {};
    }

    on(name,fn){
        if (this.List[name]) {
            this.List[name].push(fn.bind(this));
        }
        this.List[name] = [fn.bind(this)];
    }
    trigger(name,param) {
        if (this.List[name]) {
            this.List[name].map(fn => {
                fn(param);
            })
        }
    }
}

module.exports = Base