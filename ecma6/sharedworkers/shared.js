'use strict';

var lastData;
var messagePorts = [];

onconnect = function(event) {
  var messagePort = event.ports[0];
  messagePort.onmessage = function(event) {

    var workerResult;
    if (lastData) {
      workerResult = 'Result: ' + event.data + ' Last data: ' + lastData;
    } else {
      workerResult = 'Result: ' + event.data;
    }
    lastData = event.data;

    console.log('SharedWorkerGlobalScope name: ' + name);
    console.log('SharedWorkerGlobalScope location: ' + location);
    console.log('SharedWorkerGlobalScope result: ' + event.data);

    messagePorts.forEach(function (messagePort) {
      messagePort.postMessage(workerResult);
    });
  };

  messagePorts.push(messagePort);

  // When and where should I call close method?
  // Should I call messagePort.close() or SharedWorkerGlobalScope.close()?
  // SharedWorker doesn't have close method but SharedWorkerGlobalScope has one :(

};

onerror = function() {
  console.log('SharedWorkerGlobalScope: There is an error with the shared worker!');
};
