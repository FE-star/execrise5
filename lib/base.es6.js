
// var events = require('events')

// class Base {
// 	constructor(){
// 		const eve = new events.EventEmitter();
// 		const that = this;
// 		this.on = function(name,fn){
// 			eve.on(name,function(value){
// 				fn.call(that,value);
// 			})
// 		}
// 		this.trigger=function(name,value){
// 			eve.emit(name,value);
// 		}
// 	}
	
// }

// module.exports = Base

class Base {
	constructor(){
		const that = this;
		let eventList={};
		this.on = function(name,fn){
			eventList[name] = fn;
		}
		this.trigger=function(name,value){
			eventList[name].call(that,value);
		}
	}
	
}

module.exports = Base