var slice = [].slice;

function Base() {
	this.events = {}
}
function assign(){
	var args = slice.call(arguments, 0)
	var target = args.shift(1)
	for(var i =0; i<args.length; i++){
		for(var key in args[i]){
			if(args[i].hasOwnProperty(key)){
				target[key] = args[i][key]
			}
		}
	}
}
Base.extend = function (prototype, static) {

	var Super = this;
	var Suber = function(){ Super.apply(this, arguments )}
	Suber.prototype = new Super()
	assign(Suber.prototype, prototype)
	assign(Suber, Super, static)
	return Suber;
};
Base.prototype.on = function(eventName, callback){
	this.events[eventName]=callback.bind(this)

}
Base.prototype.trigger = function(){
	var args = slice.call(arguments, 0);
	var eventName = args.shift(1)
	this.events[eventName].apply(this, args)
}
module.exports = Base