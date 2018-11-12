function Base() {
  this.observe = {};
}
function merge(target) {
  let source = [].slice.call(arguments, 1);
  source.forEach(el => {
    for (let key in el) {
      if (el.hasOwnProperty(key)) {
        target[key] = el[key];
      }
    }
  });
}
Base.extend = function(proto, static) {
  let Super = this;
  function Sub() {
    Super.call(this);
  }
  let Temp = function() {};
  Temp.prototype = Super.prototype;
  Sub.prototype = new Temp();
  merge(Sub.prototype, proto);
  merge(Sub, proto);
  merge(Sub, Super, static);
  return Sub;
};

merge(Base.prototype, {
  on: function(event, fn) {
    let that = this;
    (this.observe[event] = this.observe[event] || []).push(fn);
  },
  trigger: function(event) {
    let that = this;
    let args = [].slice.call(arguments, 1);
    (this.observe[event] || []).forEach(function(fn) {
      fn.apply(that, args);
    });
  }
});



module.exports = Base;
