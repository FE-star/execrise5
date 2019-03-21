class Base {
	constructor() {
		this.events = {};
	}

	on(eventName, callback) {
		this.events[eventName] = callback;
	}

	trigger(eventName, value) {
		this.events[eventName].call(this, value);
	}
}

module.exports = Base;