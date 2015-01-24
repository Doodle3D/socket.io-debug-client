var $settings         = document.querySelector('#settings');
var $settingsURL      = document.querySelector('#settings #url');
var $timeline         = document.querySelector('#timeline'); 
var $emitter          = document.querySelector('#emitter'); 

var timeline      = new Timeline($timeline); 

console.log('$settingsSubmit: ',$settingsSubmit);

var _socket; 

$settings.onsubmit = function(event) {
  var url = $settingsURL.value;
  if(_socket) _socket.removeAllListeners();
  connectTo(url,function(err,socket) {
    if(err) return alert(err);
    _socket = socket;
    anyEventCreator(_socket);
    _socket.on("any",onAnyEvent); 
  });
  event.preventDefault();
  timeline.clear();
};

function onAnyEvent(eventType,data) {
  timeline.receivedEvent(eventType,data);
}

$emitter.onsubmit = function(event) {
  var $eventType = $emitter.querySelector('[name=eventType]');
  var $eventData = $emitter.querySelector('[name=eventData]');
  sendMessage($eventType.value,YAML.parse($eventData.value));
  event.preventDefault();
};

function connectTo(url,callback) {
  console.log("connecting to: ",url);
  var socket = io(url);
  if(!socket.connected) {
    socket.once('connect',function() {
      if(callback) callback(null,socket);
    });
    socket.once('error',function(err) {
      console.log("connect error: ",err);
      if(callback) callback(err);
    });
  }
  return socket;
}

function sendMessage(type,data) {
  timeline.sendEvent(type,data);
  _socket.emit(type,data,function(response) {
    timeline.receivedResponse(response);
  });
}


