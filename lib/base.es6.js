class Base {
	constructor() {
		this.evtList = {};
	}
	on(evtName, cb) {
		if(typeof evtName !== 'string') {
			console.error('事件名必须是字符串！');
			return;
		}
		if(typeof cb !== 'function') {
			console.error('回调方法必须是函数！');
			return;
		}
		if(!this.evtList[evtName]) {
			this.evtList[evtName] = [];
		}
		this.evtList[evtName].push(cb);
	}
	trigger(evtName, value) {
		var evtList = this.evtList[evtName];
		if(evtList) {
			evtList.forEach((v) => {
				v.call(this, value);
			})
		}
	}
}

module.exports = Base