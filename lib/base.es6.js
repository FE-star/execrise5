var slice = [].slice;
class Base {
  constructor(options){
    this.options = options
    this.list = {}
  }
  on (event, cb) {
    (this.list[event] = this.list[event] || []).push(cb);
  }
  trigger (event) {
    var args = slice.call(arguments, 1);
    this.list[event].map((item) => {
      item.call(this, args)
    });
  }
}

module.exports = Base
