function Base() {
	this.allEvents = {};
}

function merge(target) {
  var addFns = [].slice.call(arguments, 1);
  addFns.forEach(function (arrValues) {
    for (var key in arrValues) {
      if (arrValues.hasOwnProperty(key)) {
          target[key] = arrValues[key];
      }
    }
  })
}

Base.extend = function (protoFn, staticFn) {
    var Super = this;
    function returnObj() { Super.call(this)};//子调用父方法
    var MiddleFn = function () {};
    MiddleFn.prototype = this.prototype;
    returnObj.prototype = new MiddleFn();
    merge(returnObj.prototype, protoFn);//给对象的原型链上添加方法
    merge(returnObj, Super, staticFn);//给对象上添加方法
    return returnObj;
}

merge(Base.prototype,{
	on: function (event,fn){
    (this.allEvents[event] = this.allEvents[event] || []).push(fn);
	},
	trigger: function (event){
		for(var i=0;i<this.allEvents[event].length;i++){
	    this.allEvents[event][i].apply(this,[].slice.call(arguments, 1));
		}
	}
});
module.exports = Base;
