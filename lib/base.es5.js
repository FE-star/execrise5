function Base() {
    this.events = {};
}
var p = Base.prototype;
p.on = function(event, callback){
    (this.events[event] = this.events[event] || [])
        .push(callback);
}

p.trigger = function(event, options){
    var _this = this;
    (this.events[event] || [])
        .forEach(function(fn) {
            fn.call(_this, options);
        });
}

Base.extend = function (prototype, static) {
    var Super = this;
    function S(){
        Super.call(this);
    }
    S.prototype = merge(new Super, prototype);
    return merge(merge(S, Base), static);
}

function merge(a, b){

    if( !b )    return a;

    for(key in b){
        a[key] = b[key];
    }

    return a;
}

module.exports = Base

// Base.extend = function (prototype, static) {
//     var Super = this;
//     function S(){}
//     S.prototype = Super.prototype;
//     function Klass(){
//         Super.call(this);
//     }
//     Klass.prototype = merge(new S, prototype);
//     return merge(merge(Klass, Base), static);
// }