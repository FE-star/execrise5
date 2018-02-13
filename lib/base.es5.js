/*
*构造函数Base
*/
function Base(){
    //  事件存储属性events
	this.events = {};
}
/**
 * 扩展接口方法
 * @param {*} proto 原型链上的方法
 * @param {*} static 私有属性方法
 */
Base.extend = function (proto, static) {
	//	将this存储起来，用于后面合并
	var Super = this;
	//	构造继承，继承于Base这个构造函数。（Super）
	function Cur(){
    	Super.call(this);
	}
	//	新建一个匿名函数
	var Pile = function(){};
	//	并将原型链继承于Base这个构造函数的原型链
	Pile.prototype = this.prototype;
	//	被继承的Cur的原型链再继承于Pile
	Cur.prototype = new Pile();
	merge(Cur.prototype, proto);
	merge(Cur,Super, proto,static);
	return Cur;
}


merge(Base.prototype, {
	on: function(event, fn){
    	(this.events[event] = this.events[event] || []).push(fn);
	},
	trigger: function(event){
		var args = [].slice.call(arguments, 1),
			that = this;
		(this.events[event] || []).forEach(function(fn){
			fn.apply(that, args);
		});
	}
});

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
module.exports = Base;