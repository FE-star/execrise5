// class Base {
// 	constructor(){
// 		this.eventQueue = {};
// 	}
// 	on(type, fn){
// 		this.eventQueue[type] = fn; // 这样只能传一个callback
// 	}
// 	trigger(){
// 		var type = Array.prototype.shift.call(arguments);
// 		if(this.eventQueue[type]){
// 			this.eventQueue[type].apply(this,arguments);
// 		}else{
// 			return false;
// 		}
// 	}
// }

/**
 * 优化后，能给一个事件类型绑定多次
 */
class Base {
	constructor(){
		this.eventQueue = {};
	}
	on(type, fn){
		(this.eventQueue[type] = this.eventQueue[type] || []).push(fn)
		// 相当于这个：
		// if (this.eventQueue[type]) {
		// 	this.eventQueue[type].push(fn)
		// }else{
		// 	this.eventQueue[type]=[];
		// 	this.eventQueue[type].push(fn)
		// }
	}
	trigger(event, ...args){
		(this.eventQueue[event] || []).forEach((fn)=>{
			fn.apply(this, args)
		})// 讲究性能的话别用forEach，直接用for循环
	}
}
module.exports = Base