function Base() {

	this.cache = {};
}
Base.prototype.on = function(key,fn){
	this.cache[key] = fn;
}
Base.prototype.trigger = function(key,message){
	this.cache[key].call(this,message);
}

Base.say =function (word) {
	return word;
}

Base.extend = function () {
   
   Base.call(this);

   for(var i=0;i<arguments.length ;i++){
   	    for(var item in arguments[i]){
   	    	this.prototype[item] = arguments[i][item];
   	    }
   }

   return this;

}
Base.extend.say = function (word) {
	return word;
}



module.exports = Base