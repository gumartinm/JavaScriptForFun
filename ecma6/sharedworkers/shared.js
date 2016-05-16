onconnect = function(e) {
  var port = e.ports[0];

  port.onmessage = function(e) {
    var workerResult = 'Result: ' + e.data;

    console.log('SharedWorkerGlobalScope name: ' + name);
    console.log('SharedWorkerGlobalScope location: ' + location);

    // Data will be sent only to the current active tab.
    port.postMessage(workerResult);
  };

};
