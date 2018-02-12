class Base {
    constructor() {
        this.events = {};
    }
    /**
     * 添加事件
     * @param {*} event 事件名称
     * @param {*} fn 回调
     */
    on(event, fn) {
        //  这里判断传进来的事件名称在储存事件的对象中是否存在
        //  如果已经存在，则不变，如果第一次新增。设为空数组。并将回调函数推入
        (this.events[event] = this.events[event] || []).push(fn);
    }
    /**
     * 触发事件
     * @param {*} event 事件名称
     * @param {*} agrs 参数组
     */
    trigger(event, ...agrs) {
        //  一个事件触发，可能会有多个回调函数
        //  从events对象中取出该事件的回调函数们，依次执行
        if(this.events[event]){
            this.events[event].forEach((fn) => {
                fn.apply(this, args);
            });
        }
    }
}

module.exports = Base