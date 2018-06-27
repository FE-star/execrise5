// 该文件为详尽版，请


// 测试要求：
// 可以extend一个类
//    1. 子类能够继承父类方法
//    2. 子类能够继承父类属性
//    3. 子类new操作的实例必须是该子类的实例
//    4. 子类new操作的实例必须是该子类继承的父类的实例
// 可以extend多次
//    1. 满足extend一个类的所有要求
//    2. 子类new操作的实例必须是 父类的父类（所有祖先类...）的实例
// 能够监听事件且可选传值
// 监听函数的this指向监听者

//
// 继承是从已有的类中派生出新的类，新的类能吸收已有类的数据属性和行为，并能扩展新的能力。
// Java继承是使用已存在的类的定义作为基础建立新类的技术，
// 新类的定义可以增加新的数据或新的功能，也可以用父类的功能，但不能选择性地继承父类。

// ES5中实现继承的目的是尽可能完全的模仿JAVA这种强类型语言的继承作用，以达到能够在ES中实现OOP编程
// 那么我们有了依据就需要想想怎么尽可能的逼近
// JAVA中的继承有什么特点？
// 1. 只支持单继承，即一个子类只允许有一个父类。
//
// 2. 子类可以拥有父类的属性和方法
//
// 3. 子类可以拥有自己的属性和方法
//
// 4. 子类可以重写覆盖父类的方法
//
// 5. 可以声明父类，创建子类（又称父类装载子类）
//
// 	例如：Person p=new Teacher();
//
// 	(1) 声明什么样的类型，就只能调用什么类型的属性和方法
//
// 	(2) 创建什么样的类型，就真正运行的什么类型的方法
//
// 	提示： (1)和(2)称为向上转型， 例如：Person p=new Teacher();那么p只能打点调用Person类中的方法和属性（看到的）,但实际上却运行的是创建的Teacher类型的方法。
//
// 	(3) 创建什么样的类型，就可以强转为什么类型
//
// 	提示：例如： Person p=new Teacher();
//
// 	Teacher t=(Teacher) p;
//
// 	这种叫做向下转型，此时t调用的是创建的Teacher类型的相应属性和方法。

// 我们来实现一下
function Base(ops) {

	this.events = {}


	// 带参构造，需要把参数中的属性一一拷贝给实例
	if(typeof ops === "object") {
		for (var key in ops) {
			if(ops.hasOwnProperty(key)){
				this[key] = ops[key]
			}
		}
	}
}




// // 使用bind
// Base.prototype.on = function(type, fn){
// 	if(!this.events[type]) this.events[type] = []
// 	this.events[type].push(fn.bind(this))
// 	return this
// }
// Base.prototype.trigger = function(type, value) {
// 	if(this.events[type]){
// 		this.events[type].map(function(fn){
// 			fn(value)
// 		})
// 	}
// 	return this
// }

// 使用call / apply
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



// 测试用例
// Base.extend() 需要返回一个新类
// Base.extend({}) 同样返回一个类

// 可以extend多次
// var A = Base.extend({base:'我是A类属性'})
// var a = new A
// var B = A.extend({base:'我是B类属性'})
// var b = new B

// 分析可知：
// 我们的目的就是实现：
// 返回一个从  【已知类】（输入之一） 并根据【传入对象】（输入之二）参数派生出的 【新类】（唯一输出）




// extend方法实现详细步骤
// 1. 声明一个新的子类；
// 2. 将父类（已知类）注入到子类中，
//    a. 使新类能够访问父类的直接属性和方法
//    b. 使新类能够访问父类原型上的属性和方法
//    c. 使新类的实例也是父类的实例 (new sub) instanceof Super 为true
// 3. 将参数对象注入到新类中, 使新类的实例能够做到以下几点
//    a. 够访问（参数对象）实例的属性和方法
//    b. 能够访问父类定义的直接属性和方法
//    c. 能够访问父类原型上的属性和方法
//    d. 参数对象中与父类中同名的方法或属性以参数对象的为最终属性，即覆盖父类属性或方法




Base.extend = function(ops, staticOps, pops) {

	// 如果要支持多次extend, 则需要内部实现中，新类必须是直接父类的派生
	var Super = this

	if(typeof ops === "undefined" || (typeof ops === 'object' && ops !== null)) {


		// 实现 1， 声明新类subClass
		function subClass () {// 有参构造和无参构造

			// 实现 2.a 和 3.b
			// 借用父类构造函数，实现拷贝父类的属性到新类
			Super.call(this, pops)

			// 实现 3.a 3.d 带参构造，需要把参数中的属性一一拷贝给实例
			if(typeof ops === "object") {
				for (var key in ops) {
					if(ops.hasOwnProperty(key)){
						this[key] = ops[key]
					}
				}
			}
		}
		// copy 静态属性，父类静态方法
		Object.assign(subClass, Super, staticOps)

		// 根据原型继承的方式，我们来实现以下其继承机制
		// 通过将新类的原型指向一个父类的实例
		// 来实现 2.a 2.b 2.c 3.b 3.c 3.d这几点

		// 我们来思考以下这么做为什么能实现上述几点：
		// new Super()这个对象的能力：

		// 1. 能够访问Super给实例直接定义的方法的 3.b
		// 2. 能够访问Super.prototype上的方法的 3.c
		// 3. new Super的原型链上是存在Super的constructor的 2.c

		// 而将新类的原型指向这个对象就直接实现了
		// 新类原型链基本完整还原，所以2.a 2.b正常支持
		// 使用merge()方法，把新类原有的所有方法都合并到父类的实例对象上来可以屏蔽父类的方法，对新类的原型几乎没有副作用
		// 至于3.a在新类构造器中实际上已经实现了
		// subClass.prototype = merge(new Super(), subClass.prototype)

		// 但是上面还是有一个问题，new Super()还是会生成实例属性,
		// 只是父类构造函数生成的那份新类实例属性屏蔽了新类原型上的父类实例属性


		// 要解决这个也容易，我们不直接new 父类实例, 定义一个中间
		function fn(){}

		// 实现 2.b 2.c 3.c
		fn.prototype = Super.prototype


		subClass.prototype = Object.assign(new fn, subClass.prototype)

		return subClass
	} // 其他情况抛出错误日志
	else {
		throw new Error('参数类型不正确')
	}
}

module.exports = Base