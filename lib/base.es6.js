class Base {
  constructor() {
    this.watchList = {
      
    }
  }
  on (event, fun) {
    this.watchList[event] = fun.bind(this)
  }
  trigger (event, params) {
    this.watchList[event](params)
  }
}

module.exports = Base