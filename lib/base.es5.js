function Base() {
    this.cbs = {};
}
Base.prototype = {
    on: function (key, fn) {
        let fns = this.cbs[key] || (this.cbs[key] = []);
        fns.push(fn);
    },
    trigger: function (key, ...args) {
        let fns = this.cbs[key];
        fns.forEach((fn) => {
            fn.apply(this, args);
        });
    }
};
Base.extend = function (instanceProperty = {}, staticProperty = {}) {
    const Fn = function() {};
    Fn.prototype = new this();
    const fn = new Fn();
    const Child = function () {
        Base.call(this);
    };
    // 拷贝实例属性
    for (let [key, value] of Object.entries(instanceProperty)) {
        fn[key] = value;
    }
    Child.extend = this.extend;
    // 拷贝静态属性
    for (let [key, value] of Object.entries(staticProperty)) {
        Child[key] = value;
    }
    Child.prototype = fn;

    return Child;
}

module.exports = Base