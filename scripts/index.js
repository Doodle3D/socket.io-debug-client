var $settings         = document.querySelector('#settings');
var $settingsURL      = document.querySelector('#settings #url');
var $timeline         = document.querySelector('#timeline'); 
var $emitter          = document.querySelector('#emitter'); 

var timeline      = new Timeline($timeline); 

var _socket; 

$settings.onsubmit = function(event) {
  var url = $settingsURL.value;
  connect(url);
  event.preventDefault();
  timeline.clear();
};
function connect(url) {
  console.log("connecting to: ",url);
  if(_socket) {
    _socket.disconnect();
    _socket.removeAllListeners();
  }
  _socket = io(url);
  _socket.on('connect',function() {
    timeline.addSuccess('Connected to: ',url);
  });
  _socket.on('connect_error',function(err) {
    timeline.addError('Connect error: ',err);
  });
  _socket.on('connect_timeout',function() {
    timeline.addError('Connection timeout');
  });
  _socket.on('reconnect',function(num) {
    timeline.addSuccess('Reconnected '+num);
  });
  _socket.on('reconnect_attempt',function() {
    timeline.addWarning('Reconnect attempt');
  });
  _socket.on('reconnecting',function(num) {
    timeline.addWarning('Reconnecting '+num);
  });
  _socket.on('reconnect_error',function(err) {
    timeline.addError('Reconnect error: ',err);
  });
  _socket.on('reconnect_failed',function() {
    timeline.addError('Reconnecting failed');
  });
  _socket.on('error',function(err) {
    timeline.addError('Connect error: ',err);
  });
  anyEventCreator(_socket);
  _socket.on("any",function(eventType,data) {
    timeline.receivedEvent(eventType,data);
  }); 
}

$emitter.onsubmit = function(event) {
  var $eventType = $emitter.querySelector('[name=eventType]');
  var $eventData = $emitter.querySelector('[name=eventData]');
  sendMessage($eventType.value,YAML.parse($eventData.value));
  event.preventDefault();
};

function sendMessage(type,data) {
  if(!_socket) return;
  _socket.emit(type,data,function(response) {
    timeline.receivedResponse(response);
  });
  timeline.sendEvent(type,data);
}


