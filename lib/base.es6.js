class Base {
	constructor(){
		this.events = {}
	}
	on(eventName, callback){
		this.events[eventName]=callback.bind(this)
	}
	trigger(eventName, ...args){
		this.events[eventName].apply(this, args)
	}

}

module.exports = Base