/**
 * 看完答案之后自己写的
 */
class Base{
	constructor(){
		this.events = {};	
	}
	on(type, fn){
		(this.events[type] = this.events[type] || []).push(fn);
	}
	trigger(type){
		var args = [].slice.call(arguments,1);
		(this.events[type] = this.events[type] || []).forEach((fn)=>{
			fn.apply(this, args);
		})
	}
}

module.exports = Base