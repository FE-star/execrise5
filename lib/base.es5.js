function Base() {}
Base.extend = function (p, s) {
    p = p || {}
    function Fun() {}
    Fun.prototype = Object.create(this.prototype);
    Object.assign(p, {
        _eventMap: {},
        on: function(name, cb) {
            this._eventMap[name] = cb;
        },
        trigger: function(name, p) {
            this._eventMap[name].call(this, p)
        }
    })
    // 实例方法
    for (key in p) {
        Fun.prototype[key] = p[key];
    }

    // 类方法
    for (key in s) {
        Fun[key] = s[key];
    }

    Fun.extend = this.extend
    return Fun;
}



module.exports = Base