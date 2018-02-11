/*自己经过摸索尝试之后写的*/ 

// 先申明一个基础的构造函数
function Base() {
  this.events = {}
}
// 给构造函数的原型赋值的方法
function merge(proto) {
  var args = [].slice.call(arguments, 1);  //取得从第二个开始的所有参数, 这里的第一个参数是构造函数的原型独享
  args.forEach( function(arg){   //arg现在是一个对象
    for(key in arg) {
      if (arg.hasOwnProperty(key)) {
        proto[key] = arg[key];
      }
    }
  })
}
// 给Base的远行对象加上几个方法 
merge(Base.prototype, {
  on: function(event, fn) {
    (this.events[event] = this.events[event] || [])
      .push(fn)
  },
  trigger: function(event) {
    var args = [].slice.call(arguments, 1);
    var this_ = this;
    (this.events[event] = this.events[event] || []).forEach( function(fn){
      fn.apply(this_, args);
    })
  }
})
// 定义继承属性extend
Base.extend = function (proto, static) {
  var Super = this;
  function Child() {
    Super.call(this);  //这个实际上就是让字类继承了父类上直接挂载的方法和属性
  }
  Child.prototype = Object.create(Super.prototype);   //这边没有采用老师那种使用中间变量的方法，最终目的都是为了让子类和父类能分别指向自己的原型对象
  merge(Child.prototype, proto);
  merge(Child, Super, static)
  return Child
}


/*老师的方法*/ 

// var slice = [].slice;

// function merge(target) {
//     // 非常常见的技巧
//     var srcs = slice.call(arguments, 1)
//     srcs.forEach(function (src) {
//         for (var key in src) {
//             // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty
//             if (src.hasOwnProperty(key)) {
//                 target[key] = src[key]
//             }
//         }
//     })
//     // 现在有可能这么遍历Object的key
//     // Object.keys(object).forEach((key) => {
//     //     // TODO
//     // })
// }

// function Base() {
//     this.events = {}
// }
// Base.extend = function (proto, static) {
//     var Super = this
//     function Cur() {
//         Super.call(this)
//     }
//     var Pile = function () {}
//     Pile.prototype = this.prototype
//     Cur.prototype = new Pile()
//     merge(Cur.prototype, proto)
//     merge(Cur, Super, static)
//     return Cur
// }
// merge(Base.prototype, {
//     on: function (event, fn) {
//         (this.events[event] = this.events[event] || [])
//             .push(fn)
//     },
//     trigger: function (event) {
//         var args = slice.call(arguments, 1)
//         ;(this.events[event] || [])
//             .forEach((fn) => {
//                 fn.apply(this, args)
//             })
//     }
// })





module.exports = Base

