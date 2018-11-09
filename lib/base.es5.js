function Base() {
    // 属性属于实例
    this.eventMap = {};
}

// 方法放置于原型
Base.prototype.on = function (eventName, cb) {
    if (!this.eventMap[eventName]) {
        this.eventMap[eventName] = []
    }

    this.eventMap[eventName].push(cb)
}
Base.prototype.trigger = function (eventName, ...args) {
    const cbArr = this.eventMap[eventName];

    if (!cbArr) {
        return;
    }

    for (const cb of cbArr) {
        cb.call(this, ...args)
    }
}

Base.extend = function (proto, staticObj) {
    const Child = function () {
        Base.call(this); // 继承属性
    }
    /**
     * 继承原型链上的方法
     * 不能将this.prototype 直接赋值给Child.prototype 否则，instanceof判断会出错，因为所有的子类的prototype都是Base
     * 使用Object.create会在原型链上添加一级 
     */
    Child.prototype = Object.create(this.prototype); 
    if (proto) { // 添加新的方法
        for(const key in proto) {
            Child.prototype[key] = proto[key];
        }
    }
    Child.prototype.constructor = Child; // 修正constructor

    if (staticObj) { // 添加静态方法
        for(const key in staticObj) {
            Child[key] = staticObj[key];
        }
    }
    Child.extend = Base.extend; // 多次extend
    
    return Child;
}

module.exports = Base