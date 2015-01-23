function anyEventCreator(socket) {
  var streamEvent = ss.Socket.event;
  // socket.io socket
  if(socket.onevent !== undefined) {
    var originalOnEvent = socket.onevent;
    socket.onevent = function() {
      // emit regular event
      originalOnEvent.apply(socket, arguments);
      var data = arguments[0].data;
      // ignore any and internal socket.io-stream events
      if(data[0] === 'any' || data[0].indexOf(streamEvent) === 0) return;
      // Note: turn this event into a 'any' event
      // We add the event type as first argument, the regular arguments 
      // (data and callback) become the subsequent arguments
      data.unshift('any');
      // emit 'any' event
      originalOnEvent.apply(socket, arguments);
    };
  } else if(socket.sio && socket.$emit) {
    // listen for stream events on original socket.io socket
    socket.sio.on(streamEvent,function() {
      var args = Array.prototype.slice.call(arguments);
      // Chanding original event to any event, 
      // adding original event type as argument
      // from: eventType, pos, streamID, data, callback
      // to: any, pos, eventType, streamID, data, callback
      // Adding original eventType after pos:
      args.splice(2,0,args[0]); 
      // Changing event type to any:
      args[0] = 'any'; 
      // Increment pos (streamID position) to 1 
      // (because we added eventType in front of it)
      //args[1] = [1]; 
      for(var i in args[1]) args[1][i]++;
      socket.$emit.apply(socket,args);
    });
  } else {
    debug("Error: Can't create 'any' event");
  }
}