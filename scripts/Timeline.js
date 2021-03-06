function Timeline($element,$timelineMenu) {
  
  var _this = this;
  var _$element = $element;
  var _$timelineMenu = $timelineMenu;
  var _$clearTimeline = _$timelineMenu.querySelector('#cleartimeline');
  var _$autoscroll = _$timelineMenu.querySelector('#autoscroll');
  var _autoscroll = true;
  Timeline.ITEM_TYPES = {
    RECEIVED_EVENT: 'received event',
    RECEIVED_STREAMING_EVENT: 'received streaming event',
    RECEIVED_RESPONSE: 'received response',
    SEND_EVENT: 'send event',
    SUCCESS: 'connection success',
    INFO: 'connection info',
    WARNING: 'connection warning',
    ERROR: 'connection error'
  };
    
  this.receivedEvent = function(type,data) {
    this.addItem(Timeline.ITEM_TYPES.RECEIVED_EVENT,type,data);
  };
  this.receivedStreamingEvent = function(type,data) {
    this.addItem(Timeline.ITEM_TYPES.RECEIVED_STREAMING_EVENT,type,data);
  };
  this.receivedResponse = function(response) {
    this.addItem(Timeline.ITEM_TYPES.RECEIVED_RESPONSE,'Response',response);
  };
  this.sendEvent = function(type,data) {
    this.addItem(Timeline.ITEM_TYPES.SEND_EVENT,type,data);
  };
  this.addSuccess = function(header,body) {
    this.addItem(Timeline.ITEM_TYPES.SUCCESS,header,body,body);
  };
  this.addInfo = function(header,body) {
    this.addItem(Timeline.ITEM_TYPES.INFO,header,body,body);
  };
  this.addWarning = function(header,body) {
    this.addItem(Timeline.ITEM_TYPES.WARNING,header,body,body);
  };
  this.addError = function(header,body) {
    this.addItem(Timeline.ITEM_TYPES.ERROR,header,body,body);
  };
  
  // ToDo: add parsing failed indicator
  this.addItem = function(type,header,body) {
    console.log('addItem: ',arguments);
    
    var rawBody = body;
    if(typeof body == 'object') {
      rawBody = JSON.stringify(body, undefined, 2);
      body = YAML.stringify(body,5,2);
    }
    
    var $row = document.createElement("div");
    $row.setAttribute("class",'row ');
    
    var $item = document.createElement("div");
    $item.setAttribute("class",type+' item columns');
    $row.appendChild($item);
    
    var $header = document.createElement("div");
    $header.setAttribute("class",'header small-12 medium-3 columns');
    $header.textContent = header;
    $item.appendChild($header);
    
    if(body) {
      var $body = document.createElement("pre");
      $body.setAttribute("class",'body small-12 medium-9 columns');
      $body.textContent = body;
      $item.appendChild($body);
    }
    if(rawBody) {
      var $rawBody = document.createElement("pre");
      $rawBody.setAttribute("class",'rawbody small-12 medium-9 columns');
      $rawBody.textContent = rawBody;
      $item.appendChild($rawBody);
    }
    _$element.appendChild($row);
    fadeIn($item);
    if(_autoscroll) {
      _$element.scrollTop = _$element.scrollHeight;
    }
  };
  
  this.clear = function() {
    while (_$element.firstChild) {
      _$element.removeChild(_$element.firstChild);
    }
  };
  function fadeIn($element) {
    // Make the element fully transparent.
    $element.style.opacity = 0;
    // Make sure the initial state is applied.
    window.getComputedStyle($element).opacity;
    // Fade it in.
    $element.style.opacity = 1;
  }
  _$clearTimeline.onclick = function() {
    _this.clear();
  };
  _$autoscroll.onclick = function() {
    _autoscroll = !_autoscroll;
    this.classList.toggle('disabled');
  };
}