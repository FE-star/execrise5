function Base() {
  this.events = {};
}
Base.prototype.on = function(event, action) {
  this.events[event] = action;
}
Base.prototype.trigger = function() {
  var args = [];
  Array.prototype.push.apply(args, arguments)
  var event = args.shift()
  this.events[event].
  apply(this, args)
}
Base.extend = function () {
  var newClass = function() {};
  newClass.prototype = new this;
  [].forEach.call(arguments, function(data){
    for(index in data) {
      console.log(data[index]);
      newClass.prototype[index] = data[index];
      newClass[index] = data[index];
    }
  })
  newClass.extend = this.extend
  return newClass;
}

module.exports = Base