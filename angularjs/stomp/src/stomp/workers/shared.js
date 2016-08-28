'use strict';

var messagePorts = [];
var client;
var subscription;
var isConnected = false;

self.onconnect = function(event) {
  var messagePort = event.ports[0];
  messagePort.onmessage = onMessage;
  // Starts the sending of messages queued on the port
  // (only needed when using EventTarget.addEventListener; it is implied when using MessagePort.onmessage.)
  // messagePort.start();

  messagePorts.push(messagePort);

  // When and where should I call close method?
  // Should I call messagePort.close() or SharedWorkerGlobalScope.close()?
  // SharedWorker doesn't have close method but SharedWorkerGlobalScope has one :(
};

self.onerror = function (msg, url, lineNo, columnNo, error) {
  var string = msg.toLowerCase();
  var substring = 'script error';

  self.console.log('SharedWorkerGlobalScope: There is an error with the shared worker!');
  if (string.indexOf(substring) > -1) {
    self.console.log('Script Error: See Browser Console for Detail');
  } else {
    self.console.log(msg, url, lineNo, columnNo, error);
  }

  return false;
};

function onMessage(event) {
  callCommand(event.data);
}

function postMessage(message) {
  messagePorts.forEach(function (messagePort) {
    messagePort.postMessage(message);
  });
}

function callCommand(data) {
  switch(data.command) {
    case 'connect':
      doImports(data.urlImports);
      connect(data.url, data.connectHeaders);
      break;
    case 'subscribe':
      subscribe(data.clientDestination,data.subscribeHeaders);
      break;
    case 'unSubscribe':
      unSubscribe();
      break;
    case 'send':
      send(data.serverDestination, data.sendHeaders, data.payload);
      break;
    case 'disconnect':
      disconnect();
      break;
    default:
      break;
  }
}

function connect(url, connectHeaders) {
  if (!isConnected) {
    doConnect(url, connectHeaders)
  }
}

function doConnect(url, connectHeaders) {
  var options = {
    debug: true,
    devel: true,
    //jscs:disable
    protocols_whitelist: ['websocket', 'xdr-streaming', 'xhr-streaming'],
    //jscs:enable
    transports: ['websocket', 'xdr-streaming', 'xhr-streaming']
  };

  var ws = new SockJS(url, undefined, options);
  client = Stomp.over(ws);
  client.heartbeat.outgoing = 20000; // client will send heartbeats every 20000ms
  client.heartbeat.incoming = 20000; // server will send heartbeats every 20000ms
  client.debug = stompClientDebug;
  client.connect(connectHeaders, connectSuccessCallback, connectErrorCallback);
}

function subscribe(clientDestination, subscribeHeaders) {
  subscription = client.subscribe(clientDestination, subscribeCallback, subscribeHeaders);
}

function unSubscribe() {
  subscription.unsubscribe();
}

function send(serverDestination, sendHeaders, payload) {
  client.send(serverDestination, sendHeaders, payload);
}

function disconnect() {
  client.disconnect(disconnectCallback);
}

function connectSuccessCallback() {
  isConnected = true;
  postMessage({
    command: 'connectSuccessCallback'
  });
}

function connectErrorCallback(error) {
  isConnected = false;
  var jsonConnectErrorAsString = JSON.stringify(error, null, 4);
  postMessage({
    command: 'connectErrorCallback',
    jsonConnectErrorAsString: jsonConnectErrorAsString
  });
}

function subscribeCallback(message) {
  var jsonMessageAsString = JSON.stringify(message, null, 4);
  postMessage({
    command: 'subscribeCallback',
    jsonMessageAsString: jsonMessageAsString
  });
}

function disconnectCallback() {
  isConnected = false;
  postMessage({
    command: 'disconnectCallback'
  });
}

function stompClientDebug(string) {
  self.console.log(string);
}

function doImports(url) {
  importScripts(url + '/stomp/js/sockjs.js');
  importScripts(url + '/stomp/js/stomp.min.js');
}
