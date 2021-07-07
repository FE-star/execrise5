function Base() {
	this._evList = {}
}
Base.extend = function (p, m) {
	
	function F () {
		Base.call(this);
	}
	F.prototype = Object.create(this.prototype);
	F.prototype.constructor = F;
	for(var key in p) {
		F.prototype[key] = p[key]
	}

	// 添加方法
	for(var key in m) {
		F[key] = m[key]
	}
	// 添加extend方法
	F.extend = this.extend
	return F;
}
Base.prototype.on = function (ev, callbeck) {
	this._evList[ev] = callbeck;
}

Base.prototype.trigger = function (ev, arg) {
	this._evList[ev].call(this, arg)
}

module.exports = Base