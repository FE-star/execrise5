class Base {
	constructor() {
		this.events = {}   //这个相当于是Base这个类的一个私有属性，在属性里放的都是需要监听的事件及其方法，所以这个属性名是什么并不重要,之所以用这个将所有事件包起来是为了减少命名空间，防止变量被覆盖，我是这样理解的
  }
  // 这是一个监听事件的方法
  on(event, fn) {  
  	(this.events[event] = this.events[event] || []).push(fn);   //这个地方用数组是为了让这个event事件能够监听多个方法
  }
  // 这个方法是用来触发监听事件的
  trigger(event, ...args) {
  	this.events[event].forEach( (item) => {    //这个地方如果不用箭头函数的话就要在外面将this保存一下，不然this就变化了
  		item.apply(this, args)
  	})
  }
}



module.exports = Base