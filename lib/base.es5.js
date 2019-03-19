function Base() {
    this.listener = {}
    this.on = function (name, callback) {
        this.listener[name] = callback
    }
    this.trigger = function (name, value) {
        this.listener[name].call(this, value)
    }
}

Base.extend = function (proto, member) {
    let son = function () {
    }
    son.prototype = new this()
    son.extend = this.extend
    for (let key in proto) {
        if (proto.hasOwnProperty(key)) son.prototype[key] = proto[key]
    }
    for (let key in member) {
        if (member.hasOwnProperty(key)) son[key] = member[key]
    }
    return son
}

module.exports = Base