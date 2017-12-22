# 继承

### ES6

开始有 `class` 语法，可以直接定义和 `extends` 一个类型：

https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Classes

### ES5

以前没有类型，所以大家模拟了很多继承的方法，但本质上都是两种的变体：

* 原型链继承

```
// 假设有一个需要继承的一个类型 Animal

function Cat() {}
Cat.prototype = new Animal
// 添加一个属性
Cat.prootypte.name = 'cat'
```

* 构造继承

```
// 假设有一个需要继承的一个类型 Animal

function Cat(name){
  Animal.call(this)
  // 添加一个属性
  this.name = name || 'cat'
}
```

* 所以组合这两个东东：组合继承

```
// 假设有一个需要继承的一个类型 Animal

function Cat(name) {
  Animal.call(this)
  // 添加属性
  this.name = name || 'cat'
}
Cat.prototype = new Animal()
// 添加方法
Cat.prototype.say = function () {
  // TOOD
}
```

* 优化内存节省一些：

```
// 假设有一个需要继承的一个类型 Animal

function Cat(){
  Animal.call(this)
  this.name = 'cat'
}

(function(){
  // 创建一个没有实例方法的类
  var Super = function () {}
  Super.prototype = Animal.prototype
  // 将实例作为子类的原型
  Cat.prototype = new Super()
  // 添加方法
  Cat.prototype.say = function () {
    // TOOD
  }
})()
```

* [extend]

```
http://www.alloyteam.com/2015/04/xiang-es6-kao-qi-di-class-js/
```