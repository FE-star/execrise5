function Base() {
    this.watchList = [];
}
Base.extend = function (proto, static) {
    var superScope = this;
    function Child () {
        superScope.call(this);
    }
    var Super = function () {}
    Super.prototype = this.prototype;
    Child.prototype = new Super();
    merge(Child.prototype, proto);
    merge(Child, Base, static);
    return Child;
}

merge(Base.prototype, {
    on: function (name, func) {
        if (this.watchList[name]) {
            this.watchList[name].push(func.bind(this));
        }
        this.watchList[name] = [func.bind(this)];
    },

    trigger: function (name, param) {
        if (this.watchList[name]) {
            this.watchList[name].map(func => {
                func(param);
            })
        }
    }
})

function merge (target) {
    var srcs = Array.prototype.slice.call(arguments, 1);
    srcs.forEach(function (src) {
        for (var key in src) {
            if(src.hasOwnProperty(key)) {
                target[key] = src[key];
            }
        }
    })
}

module.exports = Base