class Base {
    constructor() {
        this.listener = {};
      }
      trigger(action, message) {
        this.listener[action](message);
      }
    
      on(action, listener) {
        this.listener[action] = listener.bind(this);
      }
}

module.exports = Base