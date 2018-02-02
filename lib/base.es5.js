function Base() {
	this.handlers = {}

	// 绑定事件
	this.on = function (type, handler) {
		if (typeof this.handlers[type] == 'undefined') {
			this.handlers[type] = []
		}
		this.handlers[type].push(handler);
	}

	this.trigger = function (type, message) {
		if (!type) return ;

		if (this.handlers[type] instanceof Array) {
			var handlers = this.handlers[type];
			for (var i = 0, len = handlers.length; i < len; i++) {
				handlers[i].bind(this)(message)
			}
		}
	}

}
Base.extend = function () {
	for (var i = 0, len = arguments.length; i < len; i++) {
		var item = arguments[i]
		
		for( k in item) {
			this.prototype[k] = item[k]
			this[k] = item[k]
		}
	}
	return this

}

module.exports = Base