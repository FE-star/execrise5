function Base() {}
Base.extend = function () {
    function Child() {
        this.handlers = {};
    }
    Child.prototype = new Base();
    Child.prototype.constructor = Child;

    for (var i = 0; i < arguments.length; i++) {
        for (var k in arguments[i]) {
          if (typeof arguments[i][k] === 'function') {
            Object.assign(Child.prototype, {
              [k]: arguments[i][k]
            })
            Object.assign(Child, {
                [k]: arguments[i][k]
            })
          }
        }
      }
      Child.extend = function() {
          return Child;
      }
      Child.prototype.on = function(eveType, handler) {
        if (!(eveType in this.handlers)) {
            this.handlers[eveType] = [];
        }
        this.handlers[eveType].push(handler);
      }
      Child.prototype.trigger = function(eveType, ...args) {
        if (!(eveType in this.handlers)) {
            return;
        }
        let handlers = this.handlers[eveType];
        for (let i = 0; i < handlers.length; i++) {
            handlers[i].call(this, ...args);
        }
      }
    return Child;
}

module.exports = Base