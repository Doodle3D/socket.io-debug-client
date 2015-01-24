function Timeline($element) {
  
  var _$element = $element;
  
  Timeline.ITEM_TYPES = {
    RECEIVED_EVENT: 'received event',
    RECEIVED_RESPONSE: 'received response',
    SEND_EVENT: 'send event',
    SUCCESS: 'connection success',
    INFO: 'connection info',
    WARNING: 'connection warning',
    ERROR: 'connection error'
  };
    
  this.receivedEvent = function(type,data) {
    data = YAML.stringify(data,4);
    this.addItem(Timeline.ITEM_TYPES.RECEIVED_EVENT,type,data);
  };
  this.receivedResponse = function(response) {
    response = YAML.stringify(response,4);
    this.addItem(Timeline.ITEM_TYPES.RECEIVED_RESPONSE,'Response',response);
  };
  this.sendEvent = function(type,data) {
    data = YAML.stringify(data,4);
    this.addItem(Timeline.ITEM_TYPES.SEND_EVENT,type,data);
  };
  this.addSuccess = function(header,body) {
    this.addItem(Timeline.ITEM_TYPES.SUCCESS,header,body);
  };
  this.addInfo = function(header,body) {
    this.addItem(Timeline.ITEM_TYPES.INFO,header,body);
  };
  this.addWarning = function(header,body) {
    this.addItem(Timeline.ITEM_TYPES.WARNING,header,body);
  };
  this.addError = function(header,body) {
    this.addItem(Timeline.ITEM_TYPES.ERROR,header,body);
  };
  
  // ToDo: add parsing failed indicator
  this.addItem = function(type,header,body) {
    console.log('addItem: ',arguments);
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
    _$element.appendChild($row);
    fadeIn($item);
    _$element.scrollTop = _$element.scrollHeight;
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
}