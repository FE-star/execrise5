function Base() {
	this.events = {}
}
Base.extend = function (proto, static) {
	var Super = this;
	var Sub = function() {
		Super.call(this);
	}
	
	var Temp = function(){}
	Temp.prototype = Super.prototype;
	Sub.prototype = new Temp();
	merge(Sub.prototype, proto);
	merge(Sub, Super, static); // 将Super merge到Sub中，可以extend多次

	return Sub;
}
function merge(target) {
	var args = [].slice.call(arguments, 1);
	args.forEach(function(arg){
		for (var prop in arg) {
			if (arg.hasOwnProperty(prop)) { // 判断不是原型链上的属性
				target[prop] = arg[prop];
			}
		}
	})
}
Base.prototype.on = function(event, fn) {
	(this.events[event] = this.events[event] || [])
            .push(fn)
}
Base.prototype.trigger = function(event) {
	var args = [].slice.call(arguments, 1);
	var self = this;
	(this.events[event] || [])
		.forEach(function(fn){
			fn.apply(self, args); // 监听函数的this指向自己
		})
}
module.exports = Base