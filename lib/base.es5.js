//	合并参数
function merge(target){
	//	target
	//	arguments是一个类数组,这里使用数组方法call auguments对象，获取第二个开始的参数
	var	srcs = [].slice.call(arguments, 1);
	//	循环srcs参数数组
	srcs.forEach(function(src){
		//	for in 循环是不能屏蔽原型链上的属性的，所以这里用了hasOwnProperty来找到当前对象的自身属性
		for(var key in src){
			/*
			* src = {
			*	name : "august"
			* }
			*/
        	if(src.hasOwnProperty(key)){
            	target[key] = src[key];
			}
		}
	});
	/*
	*
	*Object.keys(object).forEach(function(){
	*
	*});
	*/
}

/*
*构造函数Base
*/
function Base(){
	this.events = {};
}
Base.extend = function (proto, static) {
	var Super = this;
	function Cur(){
    	Super.call(this);
	}
	var Pile = function(){};
	Pile.prototype = this.prototype;
	Cur.prototype = new Pile();
	merge(Cur.prototype, proto);
	merge(Cur,Super, proto);
	return Cur;
}
merge(Base.prototype, {
	on: function(event, fn){
    	(this.events[event] = this.events[event] || []).push(fn);
	},
	trigger: function(event){
		var args = [].slice.call(arguments, 1);
		(this.events[event] || []).forEach(function(fn){
			fn.apply(this, args);
		});
	}
});