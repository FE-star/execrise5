function Base(ops) {

	this.events = {}
	if(typeof ops === "object") {
		for (var key in ops) {
			if(ops.hasOwnProperty(key)){
				this[key] = ops[key]
			}
		}
	}
}
Base.extend = function(ops, staticOps, pops) {

	var Super = this

	if(typeof ops === "undefined" || (typeof ops === 'object' && ops !== null)) {

		function subClass () {

			Super.call(this, pops)

			if(typeof ops === "object") {
				for (var key in ops) {
					if(ops.hasOwnProperty(key)){
						this[key] = ops[key]
					}
				}
			}
		}
		Object.assign(subClass, Super, staticOps)
		function fn(){}
		fn.prototype = Super.prototype
		subClass.prototype = Object.assign(new fn, subClass.prototype)

		return subClass
	} else {
		throw new Error('参数类型不正确')
	}
}









Base.prototype.on = function(type, fn){
	if(!this.events[type]) this.events[type] = []
	this.events[type].push(fn)
	return this
}
Base.prototype.trigger = function(type, value) {
	var ths = this
	if(this.events[type]){
		this.events[type].map(function(fn){
			// fn.call(ths, value)
			fn.apply(ths, [value])
		})
	}
	return this
}



module.exports = Base