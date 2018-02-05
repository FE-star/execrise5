function Base() {
	this.evtList = {};
}
Base.extend = function (methods, staticMethods) {
	var Super = this;
	var Child = function() { Super.call(this); }
	// 父类的成员方法
	Child.prototype = new Super;
	// 现有的成员方法
	for(m in methods) Child.prototype[m] = methods[m];	
	// 父类的静态方法
    for(m in Super) Child[m] = Super[m];
    // 现有的静态方法
	for(m in staticMethods) Child[m] = staticMethods[m];
    return Child;
}

Base.prototype.on = function(evtName, cb) {
	if(typeof evtName !== 'string') {
		console.error('事件名必须为字符串！');
		return;
	}
	if(typeof cb !== 'function') {
		console.error('回调方法必须为函数！');
		return;
	}
	if(!this.evtList[evtName]) {
		this.evtList[evtName] = [];
	}
	this.evtList[evtName].push(cb);
}

Base.prototype.trigger = function(evtName, value) {
	var evtList = this.evtList[evtName];
	if(evtList) {
		for(var i = 0, len = evtList.length; i < len; i++) {
			var v = evtList[i];
			v.call(this, value);
		}
	}
}

module.exports = Base