class Base {
    constructor() {
        this.callBack = null
    }

    on (_t, fn) {
        this.callBack = fn
    }

    trigger(_t, _e) {
        this.target = _t
        this.callBack(_e)
    }

}

module.exports = Base