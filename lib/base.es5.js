function Base() {}
Base.extend = function () {

  var that = this;

  function baseExtend() {
    that.call(this);
  }

  baseExtend.prototype = new Base();

  for (let index = 0; index < arguments.length; index++) {
    const item = arguments[index];
    Object.keys(item).forEach((key) => {
      baseExtend[key] = item[key];
    });
  }

  baseExtend.extend = that.extend;

  return baseExtend;
}

module.exports = Base