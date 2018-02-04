class Base {
    callback() {}
    on(test, callback) {
        this.callback = callback
    }
    trigger(test, hello) {
        this.callback(hello)
    }
}

module.exports = Base