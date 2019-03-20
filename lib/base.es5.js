function Base() {
    // looks like: { 'test': [event1, event2, event3], 'test2': [XXX] }
    this.events = {}
    this.sentence = 'hello world'
}

Base.extend = function (instanceM, staticM) {
    // do not set a specific Class here
    var MySelf = this
    function Sub() {MySelf.call(this)}
    Sub.prototype = new MySelf
    for(var field in instanceM) {
        Sub.prototype[field] = instanceM[field] // instance method
    }
    for(var field in staticM) {
        Sub[field] = staticM[field] // static method
    }
    Sub.extend = MySelf.extend.bind(Sub)
    return Sub
}

Base.prototype.on = function(type, handler) {
    var givenTypeEvents = this.events[type]
    givenTypeEvents ? 
        givenTypeEvents.push(handler.bind(this)):
        this.events[type] = ([handler.bind(this)])  // first push of this type
}

Base.prototype.trigger = function(type) {
    var givenTypeEvents = this.events[type]
    for(var i = 0; i < givenTypeEvents.length; i ++) {
        var event = givenTypeEvents[i]
        event(this.sentence)
    }
}

module.exports = Base