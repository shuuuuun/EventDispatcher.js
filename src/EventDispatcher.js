(function(win){
  
  win.EventDispatcher = function() {
    this.event_list = [];
  };
  
  win.EventDispatcher.prototype.has     = has;
  win.EventDispatcher.prototype.on      = on;
  win.EventDispatcher.prototype.off     = off;
  win.EventDispatcher.prototype.trigger = trigger;
  win.EventDispatcher.prototype.fire    = trigger;
  win.EventDispatcher.prototype.emit    = trigger;
  
  function has(EVENT_NAME) {
    return !!this.event_list[EVENT_NAME];
  }
  
  function on(EVENT_NAME, callback) {
    var hasEvent = this.has(EVENT_NAME);
    if (!hasEvent) {
      this.event_list[EVENT_NAME] = [callback];
      return this;
    }
    var index = this.event_list[EVENT_NAME].indexOf(callback);
    if (index >= 0) return this;
    this.event_list[EVENT_NAME].push(callback);
    
    return this;
  }
  
  function off(EVENT_NAME, callback) {
    var hasEvent = this.has(EVENT_NAME);
    if (!hasEvent) return this;
    var event = this.event_list[EVENT_NAME];
    var index = event.indexOf(callback);
    if (index < 0) return this;
    event.splice(index,1);
    
    return this;
  }
  
  function trigger(EVENT_NAME) {
    var hasEvent = this.has(EVENT_NAME);
    if (!hasEvent) return this;
    var event = this.event_list[EVENT_NAME].slice();
    var length = event.length;
    var eventObj = {
      type: EVENT_NAME,
      // target: this,
    };
    var args = Array.prototype.slice.call(arguments);
    args.shift();
    args.unshift(eventObj);
    for (var i=0; i<length; ++i) {
      if (event[i]) {
        event[i].apply(this, args);
      }
    }
    
    return this;
  }
  
})(this);
