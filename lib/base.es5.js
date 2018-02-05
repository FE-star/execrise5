// function Base() {}
// Base.extend = function () {
// 	let that = this;
// 	function F(){
// 		this.eventQueue = {};
// 		that.call(this);
// 	}
// 	F.prototype = new that();
// 	for(let key in arguments[0]){
// 			F.prototype[key] = arguments[0][key];
// 	}
// 	F.prototype.on = function(type, fn){
// 		this.eventQueue[type] = fn;
// 	}
// 	F.prototype.trigger = function(){
// 		var type = Array.prototype.shift.call(arguments);
// 		if(this.eventQueue[type]){
// 			this.eventQueue[type].apply(this,arguments);
// 		}else{
// 			return false;
// 		}
// 	}
// 	for(let key in arguments[1]){
// 			F[key] = arguments[1][key];
// 	}
// 	for(let key in Base){
// 		F[key] = that[key];
// 	}
// 	return F;
// }

// module.exports = Base


var slice = [].slice

function merge(target) {
    // 非常常见的技巧
    var srcs = slice.call(arguments, 1)
    srcs.forEach(function (src) {
        for (var key in src) {
            // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty 

            if (src.hasOwnProperty(key)) {
                target[key] = src[key]
            }
        }
    })
    // 现在有可能这么遍历Object的key
    // Object.keys(object).forEach((key) => {
    //     // TODO
    // })
}

function Base() {
    this.events = {}
}
Base.extend = function (proto, static) {
    var Super = this
    function Cur() {
        Super.call(this)
    }
    var Pile = function () {}
    Pile.prototype = this.prototype
    Cur.prototype = new Pile()
    merge(Cur.prototype, proto)
    merge(Cur, Super, static)
    return Cur
}
merge(Base.prototype, {
    on: function (event, fn) {
        (this.events[event] = this.events[event] || [])
            .push(fn)
    },
    trigger: function (event) {
        var args = slice.call(arguments, 1)
        ;(this.events[event] || [])
            .forEach((fn) => {
                fn.apply(this, args)
            })
    }
})

module.exports = Base