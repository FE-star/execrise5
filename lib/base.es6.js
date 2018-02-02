
var events = require('events')

class Base {
	constructor(){
		const eve = new events.EventEmitter();
		const that = this;
		this.on = function(name,fn){
			eve.on(name,function(value){
				fn.call(that,value);
			})
		}
		this.trigger=function(name,value){
			eve.emit(name,value);
		}
	}
	
}

module.exports = Base