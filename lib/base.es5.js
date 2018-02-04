function Base() {}
Base.extend = function () {
	let that = this;
	function F(){
		this.eventQueue = {};
		that.call(this);
	}
	F.prototype = new that();
	for(let key in arguments[0]){
			F.prototype[key] = arguments[0][key];
	}
	F.prototype.on = function(type, fn){
		this.eventQueue[type] = fn;
	}
	F.prototype.trigger = function(){
		var type = Array.prototype.shift.call(arguments);
		if(this.eventQueue[type]){
			this.eventQueue[type].apply(this,arguments);
		}else{
			return false;
		}
	}
	for(let key in arguments[1]){
			F[key] = arguments[1][key];
	}
	for(let key in Base){
		F[key] = that[key];
	}
	return F;
}

module.exports = Base