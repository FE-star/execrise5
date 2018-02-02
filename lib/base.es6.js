class Base {
	constructor() {
		this.handlers = {}
	}
	// 绑定事件
	on (type, handler) {
		if (typeof this.handlers[type] == 'undefined') {
			this.handlers[type] = []
		}
		this.handlers[type].push(handler);

	}

	// 触发事件
	trigger(type, message) {
		if (!type) return ;

		if (this.handlers[type] instanceof Array) {
			var handlers = this.handlers[type];
			for (var i = 0, len = handlers.length; i < len; i++) {
				handlers[i].bind(this)(message)
			}
		}
	}
}

module.exports = Base