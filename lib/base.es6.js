class Base {
    constructor(){
        this.mqList={}
    }
    on(tName,callBack){
        this.mqList[tName]=callBack
    }
    trigger(tName,...args){
        this.mqList[tName].apply(this,args)
    }
}

module.exports = Base