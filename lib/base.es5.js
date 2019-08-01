function Base() {
  this.events = {};
}
Base.extend = function () {
  // bind custom function from Base
  function baseExtend() {
    Base.call(this);
  }

  // inherit Base's prototype
  baseExtend.prototype = new Base();

  for (let index = 0; index < arguments.length; index++) {
    const item = arguments[index];
    Object.keys(item).forEach((key) => {
      // add custom function to Base
      baseExtend.prototype[key] = item[key];
      // add custom function to baseExtend
      baseExtend[key] = item[key];
    });
  }
  
  baseExtend.extend = function() {
    return baseExtend;
  };

  return baseExtend;
}

Base.prototype.on = function (eventType, callback) {
  var callbacks = this.events[eventType] || [];
  // bind this
  callbacks.push(callback.bind(this));

  this.events[eventType] = callbacks;
}

Base.prototype.trigger = function (eventType, args) {
  this.events[eventType].forEach(function (callback) {
    callback && callback(args);
  })
}

module.exports = Base