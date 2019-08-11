class Base {
    constructor(){
        this.listeners = {}
    }
    on(event,fn){
      if(this.listeners[event]) {
        this.listeners[event].push(fn)
      } else {
        this.listeners[event] = [fn]
      }
    }
    trigger(event, args){
        const eventList = this.listeners[event]
        if(!eventList || !eventList.length) {
            return
        }
        eventList.forEach( e => {
            e.call(this, args)
        })
    }
  }

module.exports = Base