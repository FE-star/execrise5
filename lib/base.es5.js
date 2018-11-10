function Base() {
	this.watcher = {};
}
Base.extend = function () {
	function Super() {
        Base.call(this);
    }
    
    Super.prototype = new this;

 	let arg = arguments;
	for (const i in arg) {
    	for (const key in arg[i]) {
    		Super.prototype[key] = arg[i][key];
    		Super[key] = arg[i][key]
    	}
    }

	Super.extend = Base.extend;
	return Super;
}

Base.prototype.trigger = function ( name, value ) {
	this.watcher[ name ].map( cb =>{
		cb(value);
	});
}

Base.prototype.on = function ( name, callback ) {
	this.watcher[ name ] =  this.watcher[ name ] 
							? this.watcher[ name ].push( callback.bind(this) )
							: [ callback.bind(this)];
}

module.exports = Base