'use strict';

var messagePorts = [];
var client;
var subscription;

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

self.onerror = function() {
  self.console.log('SharedWorkerGlobalScope: There is an error with the shared worker!');
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
  client.heartbeat.incoming = 20000;     // client does not want to receive heartbeats from the server
  client.connect(JSON.parse(connectHeaders), connectSuccessCallback, connectErrorCallback);
}

function subscribe(clientDestination, subscribeHeaders) {
  subscription = client.subscribe(clientDestination, subscribeCallback, JSON.parse(subscribeHeaders));
}

function unSubscribe() {
  subscription.unsubscribe();
}

function send(serverDestination, sendHeaders, payload) {
  client.send(serverDestination, JSON.parse(sendHeaders), payload);
}

function disconnect() {
  client.disconnect(disconnectCallback);
}

function connectSuccessCallback() {
  postMessage({
    command: 'connectSuccessCallback'
  });
}

function connectErrorCallback(error) {
  postMessage({
    command: 'connectErrorCallback',
    connectError: error
  });
}

function subscribeCallback(message) {
  postMessage({
    command: 'subscribeCallback',
    message: message
  });
}

function disconnectCallback() {
  postMessage({
    command: 'disconnectCallback'
  });
}

function doImports(url) {
  importScripts(url + '/stomp/js/sockjs.js');
  importScripts(url + '/stomp/js/stomp.min.js');
}
