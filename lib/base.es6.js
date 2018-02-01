class Base {
	constructor(options) {
		this.cache = {}
	}

	on(key,fn) {
		this.cache[key] = fn;
	}

	trigger(key,value){
		this.cache[key].call(this, value)
	}
}

module.exports = Base