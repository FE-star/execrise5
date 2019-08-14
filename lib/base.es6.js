class Base {
    constructor() {
        this.eventBus = {} // 事件总线
    }

    on(name, fn) {
        this.eventBus[name] = fn // 绑定事件名与事件
    }

    trigger(name) {
        let fn = this.eventBus[name]
        if (!fn || !fn instanceof Function) {
            console.log('函数不存在')
            return
        }
        let arg = [...arguments]
        arg.splice(0,1)
        fn.apply(this, arg) // 触发事件，并传入相应的参数
    }
}

module.exports = Base