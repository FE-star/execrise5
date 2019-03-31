function Base() {
  this.watchList= {};
}

// TODO: 如何判断前面的是原型方法，后面的是静态方法？
Base.extend = function(protoProps, staticProps) {
  function Child() {
    Base.call(this);
  }

  // TODO,这个地方不能用Base()
  Child.prototype = new this;

  for(var i in protoProps) {
    if (protoProps.hasOwnProperty(i)) {
        Child.prototype[i] = protoProps[i];
    }
  }

  for(var j in staticProps) {
    if (staticProps.hasOwnProperty(j)) {
        Child[j] = staticProps[j];
    }
  }

  // TODO
  Child.extend = this.extend;
  return Child;
}

Base.prototype.on = function(event, fn) {
  if (this.watchList[event]) {
    this.watchList[event] = this.watchList[event].push(fn.bind(this));
  }

  this.watchList[event] = [fn.bind(this)];
}

Base.prototype.trigger = function(event, value) {
  if (this.watchList[event]) {
    this.watchList[event].map(fn => {
      fn(value);
    });
  }
}

module.exports = Base