/**
 * 看完答案后自己写一个
 */

function Base() {
	this.events = {};
}

var merge = function(target,...args){
	args.forEach((obj)=>{
		for(let key in obj){
			if(obj.hasOwnProperty(key)){
				target[key] = obj[key]
			}
		}
	})
};

Base.extend = function(proto, static){
	var Super = this
	function F(){
		Super.call(this); // 组合继承Base
	}
	F.prototype = new Super; // 组合继承Base
	merge(F.prototype, proto); // 合并proto
	merge(F, static, Super); // 合并static
	return F;
}

merge(Base.prototype, {
	on(type, fn){
		(this.events[type] = this.events[type] || []).push(fn);
	},
	trigger(type, ...args){
		(this.events[type] = this.events[type] || []).forEach((fn)=>{
			fn.apply(this,args);
		})
	}
})

module.exports = Base;