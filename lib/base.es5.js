var Base = function(){this.cache = {};};
Base.prototype = {
    on: function(type, callback){
        var fns = (this.cache[type] = this.cache[type] || []);
        fns.push(callback);
    },
    off: function(type, callback){
        var fns = this.cache[type];
        if(this.isArray(fns)){
            if(callback){
                var index = fns.indexOf(callback);
                index !== -1 && fns.splice(index, 1);
            }else{
                fns.length = 0;
            }
        }
    },
    trigger: function(type, data){
        var fns = this.cache[type];
        if(this.isArray(fns)){
            fns.forEach(function(fn){
                fn(data);
            });
        }
    },
    isArray: function(o){
        return Object.prototype.toString.call(o) === '[object Array]';
    }
}

module.exports = Base