class Base {

    constructor() {
        //主要负责 管理事件名和事件
        this.handler = [];

        this.on = function(type, fn) {
            let obj = {};
            //这是一个易错的地方  obj.type  
            obj[type] = fn.bind(this);
            this.handler.push(obj);
        }

        this.trigger = function(type,arg){
           for (var i of this.handler) {
	          if (Object.keys(i)[0] === type) {
	                i[type](arg);
	          }
           }
        }
    }

    //实现一个自定义事件
    //以下这样写 为为何子类继承不到
    /*on(type, fn) {

        let obj = {};

        obj.type = fn;

        this.handler.push(obj);
    }

    //触发
    trigger(type) {
        for (var i of this.handler) {
            if (Object.keys(i)[0] === type) {
                i[type]();
            }
        }
    }*/


}

module.exports = Base