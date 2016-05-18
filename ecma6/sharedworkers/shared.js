'use strict';

var lastData;
var messagePorts = [];

self.onconnect = function(event) {
  var messagePort = event.ports[0];
  messagePort.onmessage = onMessage;
  messagePorts.push(messagePort);

  // When and where should I call close method?
  // Should I call messagePort.close() or SharedWorkerGlobalScope.close()?
  // SharedWorker doesn't have close method but SharedWorkerGlobalScope has one :(

};

self.onerror = function() {
  self.console.log('SharedWorkerGlobalScope: There is an error with the shared worker!');
};

function onMessage(event) {
  var workerResult;
  if (lastData) {
    workerResult = 'Result: ' + event.data + ' Last data: ' + lastData;
  } else {
    workerResult = 'Result: ' + event.data;
  }
  lastData = event.data;

  self.console.log('SharedWorkerGlobalScope name: ' + self.name);
  self.console.log('SharedWorkerGlobalScope location: ' + self.location);
  self.console.log('SharedWorkerGlobalScope result: ' + event.data);

  messagePorts.forEach(function (messagePort) {
    messagePort.postMessage(workerResult);
  });
}
