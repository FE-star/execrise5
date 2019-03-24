function Base() {
  this.lisenters = {}
}
Base.extend = function (protos, statics) {
  const superClass = this
  const Son = function() {
    superClass.call(this)
  }

  const Mid = function() {}
  Mid.prototype = this.prototype
  Son.prototype = new Mid()

  for (let key in protos) {
    Son.prototype[key] = protos[key]
  }

  for (let key in statics) {
    Son[key] = statics[key]
  }

  Son.extend = this.extend

  return Son
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