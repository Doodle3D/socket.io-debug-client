function Timeline($element) {
  
  var _$element = $element;
  
  Timeline.ITEM_TYPES = {
    RECEIVED_EVENT: 'received-event',
    RECEIVED_RESPONSE: 'received-response',
    SEND_EVENT: 'send-event'
  };
  
  console.log('$element: ',$element);
  
  this.receivedEvent = function(type,data) {
    console.log('receivedEvent: ',type,data);
    data = YAML.stringify(data,4);
    this.addItem(Timeline.ITEM_TYPES.RECEIVED_EVENT,type,data);
  };
  this.receivedResponse = function(response) {
    console.log('receivedResponse: ',response);
    response = YAML.stringify(response,4);
    this.addItem(Timeline.ITEM_TYPES.RECEIVED_RESPONSE,'Response',response);
  };
  this.sendEvent = function(type,data) {
    console.log('sendEvent');
    data = YAML.stringify(data,4);
    this.addItem(Timeline.ITEM_TYPES.SEND_EVENT,type,data);
  };
  
  this.addItem = function(type,header,body) {
    //console.log('addItem: ',arguments);
    var $row = document.createElement("div");
    $row.setAttribute("class",'row ');
    
    var $item = document.createElement("div");
    $item.setAttribute("class",type+' item small-8 columns');
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
    _$element.scrollTop = _$element.scrollHeight;
  };
  
  this.clear = function() {
    while (_$element.firstChild) {
      _$element.removeChild(_$element.firstChild);
    }
  };
}