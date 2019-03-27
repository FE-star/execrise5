function Base() {
  this.watchList= {};
}

Base.extend = function () {
  
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