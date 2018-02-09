class Base {
	constructor() {
    this.allEvents = [];
  }
  on(event,fn){
    (this.allEvents[event] = this.allEvents[event] || []).push(fn);
  }
  trigger(event,...args){
  	for(let i=0;i<this.allEvents[event].length;i++){
      this.allEvents[event][i].apply(this,args);
  	}
  }
}

module.exports = Base