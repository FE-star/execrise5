function Base() {
	// 事件总线
    this.eventBus = {}
}
Base.extend = function (protoProps={}, staticProps={}) {
    function f(){}
    // 原型继承
    f.prototype = new this
    // 添加extend属性
    f.extend = this.extend
	// 原型上添加方法
	Object.keys(protoProps).map(fun => {
		f.prototype[fun] = protoProps[fun]
	})
	// 类上添加方法-静态方法
	Object.keys(staticProps).map(fun => {
		f[fun] = staticProps[fun]
	})
    return f
}

Base.prototype.on = function(name, fun) {
    this.eventBus[name] = fun
}

Base.prototype.trigger = function(name) {
	let fn = this.eventBus[name]
	if (!fn || !fn instanceof Function) {
		console.log('函数不存在')
		return
	}
	let arg = [...arguments]
	arg.splice(0,1)
	fn.apply(this, arg) // 触发事件，并传入相应的参数
}

module.exports = Base