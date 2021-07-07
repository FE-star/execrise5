function Base() {
   this.eventList = {}
}
Base.prototype.on = function(eventName, fn) {
    if (this.eventList[eventName]) {
        this.eventList[eventName].push(fn)
    } else {
      this.eventList[eventName] = [fn]
    }
}
Base.prototype.trigger = function(eventName, ...args) {
    let list = this.eventList[eventName]
    let len = list.length
    for(;len--;) {
        list[len].apply(this, args)
    }
}
Base.extend = function (pro, cls) {
    // pro, cls 分别给原型和类添加方法
    let that = this
    function fn() {
        // 继承当前类属性
        that.apply(this)
    }
    // 继承方法
    fn.extend = Base.extend
    fn.prototype = new that
    for (let item in pro) {
        fn.prototype[item] = pro[item]
    }
    for (let item in cls) {
        fn[item] = cls[item]
    }
    return fn
}
module.exports = Base