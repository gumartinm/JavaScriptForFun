(function () {
  'use strict';

  var log = document.getElementById('log');
  var sendText = document.getElementById('sendText');
  var retrieveText = document.getElementById('retrieveText');
  var messagePort;

  if (!!window.SharedWorker) {
    // Shared worker will be released once every tab using that worker is closed.
    // see: chrome://inspect/#workers
    var sharedWorker = new SharedWorker('shared.js', 'shared-worker-example');

    var sendButton = document.getElementById('sendButton');
    sendButton.addEventListener('click', postMessage);

    messagePort = sharedWorker.port;
    messagePort.onerror = onError;
    messagePort.onmessage = onMessage;
    // Starts the sending of messages queued on the port
    // (only needed when using EventTarget.addEventListener; it is implied when using MessagePort.onmessage.)
    // messagePort.start();

  } else {
    log.innerHTML = 'Shared Web Workers not supported. Try with a modern browser. <br>';
  }

  function postMessage() {
    messagePort.postMessage(sendText.value);
    log.insertAdjacentHTML('beforeend', 'Message posted to worker: ' + sendText.value + ' <br>');
  }

  function onMessage(e) {
    log.insertAdjacentHTML('beforeend', 'Message received from worker: ' + e.data + ' <br>');
  }

  function onError() {
    log.insertAdjacentHTML('beforeend', 'There is an error with the shared worker! <br>');
  }

  function close() {
    // I think, calling close method is not required. Once all tabs are closed, shared worker will be released.
    messagePort.close();
  }

}());
