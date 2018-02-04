var events = require('events');
class Base {
	constructor(options){
		this.cache = {};
	}
	on(key,fn)
	{
		this.cache[key] = fn;
	}
	trigger(key,message){

		this.cache[key].call(this,message);
	}

}

module.exports = Base