class Base {
	constructor() {
		this.evt = {}
  }
  on(evtName, func) {
  	this.evt[evtName] = func.bind(this);
  }
  trigger(name, value) {
  	this.evt[name](value)
  }
}

module.exports = Base