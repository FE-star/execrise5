// 测试要求：
// 实现一个基类，可以继承，可以监听事件
// 能够监听事件
// 能够监听事件并传值
// 监听函数的this指向自己

class Base {
	constructor(){
		this.Event = {}
	}
	on(type, fn) {
		// 能够监听事件
		if(!this.Event[type])
			this.Event[type] = []
		this.Event[type].push(fn)
		return this
	}

	// trigger的apply版
	// 能够派发事件并传数据
	trigger(type, ...arg){
		if(this.Event[type]) {
			this.Event[type].map(fn => {
				// fn回调函数执行时，this指向派发事件的对象
				fn.apply(this, [...arg])
			})
		}
		return this
	}
	// trigger的call版
	// trigger(type, ...arg){
	// 	if(this.Event[type]) {
	// 		this.Event[type].map(fn => {
	// 			// 回调函数执行时，指向trigger的对象
	// 			fn.call(this, ...arg)
	// 		})
	// 	}
	// 	return this
	// }
}

module.exports = Base