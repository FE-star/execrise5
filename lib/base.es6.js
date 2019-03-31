class Base {
	constructor() {
		this.events = {}
	}

	on(event, callback) {
		this.events[event] = callback.bind(this)
	}

	trigger(event, ...args) {
		if (this.events[event]) {
			this.events[event](...args)
		}
	}
}

module.exports = Base