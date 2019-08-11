function Base() {
    this.lisenters = {}
  }
Base.extend = function (protos, statics) {
  const _this = this
  const Child = function() {
    _this.call(this)
  }

  const Super = function() {}
  Super.prototype = this.prototype
  Child.prototype = new Super()

  for (let key in protos) {
    Child.prototype[key] = protos[key]
  }

  for (let key in statics) {
    Child[key] = statics[key]
  }

  Child.extend = this.extend

  return Child
}

Base.prototype.on = function(name, fn) {
  this.lisenters[name] = this.lisenters[name] || []
  this.lisenters[name].push(fn.bind(this))
}

Base.prototype.trigger = function(name, value) {
  if (!this.lisenters[name]) return
  this.lisenters[name].forEach(fn => {
    fn(value)
  });
}

module.exports = Base