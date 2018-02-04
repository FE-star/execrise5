class Base {
	constructor(){
		this.eventQueue = {};
	}
	on(type, fn){
		this.eventQueue[type] = fn;
	}
	trigger(){
		var type = Array.prototype.shift.call(arguments);
		if(this.eventQueue[type]){
			this.eventQueue[type].apply(this,arguments);
		}else{
			return false;
		}
	}
}

module.exports = Base