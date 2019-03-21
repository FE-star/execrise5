function Base() {
	this.events = {};
}

Base.extend = function (instanceMembers, staticMembers) {
	var childClass = function () {
	};
	childClass.prototype = new this();
	childClass.prototype.constructor = childClass;
	childClass.extend = Base.extend;

	if (instanceMembers) {
		Object.keys(instanceMembers).forEach(function (prop) {
			childClass.prototype[prop] = instanceMembers[prop];
		});
	}

	if (staticMembers) {
		Object.keys(staticMembers).forEach(function (prop) {
			childClass[prop] = staticMembers[prop];
		});
	}

	return childClass;
};

Base.prototype.on = function (event, callback) {
	this.events[event] = callback;
};

Base.prototype.trigger = function (event, value) {
	this.events[event].call(this, value);
};

module.exports = Base;
