class Base {

    constructor(){
        this.watcher = {};
    }

    trigger( name, value ) {
        this.watcher[ name ].map( cb =>{
            cb(value);
        });
    }

    on ( name, callback ) {
        this.watcher[ name ] =  this.watcher[ name ] 
                                ? this.watcher[ name ].push( callback.bind(this) )
                                : [ callback.bind(this)];
    }

}

module.exports = Base