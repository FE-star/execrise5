class Base {
    constructor() {
        // this.events= {}
        this.events= []
    }
    //不能监听多个
    // on(event, cb) {
    //     this.events[event]= cb
        
    // }
    // trigger(event, ...args) {
    //     this.events[event].call(this, args)
    // }

    on(event, cb) {
        (this.events[event]= this.events[event] || []).push(cb)
    }
    trigger(event, ...args) {
        (this.events[event] || []).forEach((cb)=> {
            //为什么不能写cb(args), 直接就是调用回调函数
            cb.call(this,args)
        })
    }
}

module.exports = Base