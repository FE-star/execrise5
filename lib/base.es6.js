
class Base {
	constructor() {
		this._evState = {}
	}
	on (key, callback) {
		this._evState[key] = callback
	}
	trigger (ev, ...arg) {
		const fn = this._evState[ev];
		fn.call(this, ...arg)
	}
}

module.exports = Base