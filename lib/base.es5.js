function Base() {
	this.cache = {};
}

Base.prototype.on = function(key,fn){
	this.cache[key] = fn;
};
Base.prototype.trigger = function(key,value){
	this.cache[key].call(this, value);
};

Base.extend = function () {
	let that = this;
	function newBase() {
	    that.call(this)
	}
	
	inheritPrototype(newBase,that)

	let arg = arguments;
	for (let i in arg) {
    	for (let a in arg[i]) {
    		newBase.prototype[a] = arg[i][a];
    		newBase[a] = arg[i][a]
    	}
    }
	newBase.extend = that.extend;
	return newBase;
}
function inheritPrototype(subType,superType){
    var prototype = Object(superType.prototype);
    prototype.constructor = subType;
    subType.prototype = prototype;
}

module.exports = Base