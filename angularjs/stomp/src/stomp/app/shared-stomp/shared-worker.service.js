(function () {
  'use strict';

  angular
    .module('app.shared-stomp')
    .factory('sharedWorker', sharedWorker);

  /**
   * @ngdoc service
   * @name app.shared-stomp.sharedWorker
   *
   * @requires $window
   * @requires $location
   *
   * <p>
   * <br>
   * {@link https://docs.angularjs.org/api/ng/service/$window $window} <br>
   * {@link https://docs.angularjs.org/api/ng/service/$location $location}
   * </p>
   *
   * @description
   * sharedWorker service.
   */
  /* @ngInject */
  function sharedWorker($window, $location) {
    var _messagePort;
    var _connectSuccessCallback;
    var _connectErrorCallback;
    var _subscribeCallback;
    var _disconnectCallback;

    init();

    return {
      connect: connect,
      subscribe: subscribe,
      unSubscribe: unSubscribe,
      send: send,
      disconnect: disconnect
    };

    function init() {
      if (!$window.SharedWorker) {
        throw new Error('Shared Web Workers not supported. Try with a modern browser');
      }
      var sharedWorker = makeSharedWorker($window);
      _messagePort = sharedWorker.port;
      _messagePort.onmessage = onMessage;
    }

    /**
     * @ngdoc method
     * @name  connect
     * @methodOf app.shared-stomp.connect
     *
     * @description
     * Connects to back end.
     *
     * @param {string} url URL to connect.
     * @param {string} connectHeaders Connection headers.
     * @param {function} connectSuccessCallback Connection success call back.
     * @param {function} connectErrorCallback Connection error call back.
     *
     */
    function connect (url, connectHeaders, connectSuccessCallback, connectErrorCallback) {
      var message = {
        command: 'connect',
        url: url,
        urlImports: $location.protocol() + '://' + $location.host(),
        connectHeaders: connectHeaders
      };

      _connectSuccessCallback = connectSuccessCallback;
      _connectErrorCallback = connectErrorCallback;
      doPostMessage(message);
    }

    function subscribe(clientDestination, subscribeCallback, subscribeHeaders) {
      var message = {
        command: 'subscribe',
        clientDestination: clientDestination,
        subscribeHeaders: subscribeHeaders
      };

      _subscribeCallback = subscribeCallback;
      doPostMessage(message);
    }

    function unSubscribe() {
      var message = {
        command: 'unSubscribe'
      };

      doPostMessage(message);
    }

    function send(serverDestination, sendHeaders, payload) {
      var message = {
        command: 'send',
        serverDestination: serverDestination,
        sendHeaders: sendHeaders,
        payload: payload
      };

      doPostMessage(message);
    }

    function disconnect(disconnectCallback) {
      var message = {
        command: 'disconnect'
      };

      _disconnectCallback = disconnectCallback;
      doPostMessage(message);
    }

    function doPostMessage(message) {
      _messagePort.postMessage(JSON.stringify(message, null, 4));
    }

    function onMessage(event) {
      if (event.data.error) {
        // Error
      } else {
        callBack(JSON.parse(event.data));
      }
    }
    // var send {
    //     command:
    //     connectionHeaders:
    // }
    // var result {
    //     command:
    //     error:
    //     message:
    // };
    function callBack(data) {
      switch(data.command) {
        case 'connectSuccessCallback':
          _connectSuccessCallback();
          break;
        case 'connectErrorCallback':
          _connectErrorCallback(data.error);
          break;
        case 'subscribeCallback':
          _subscribeCallback(data.message);
          break;
        case 'disconnectCallback':
          _disconnectCallback();
          break;
        default:
          break;
      }

    }
  }

  function makeSharedWorker($window) {
    var sharedWorkerName = 'shared-stomp';
    var sharedWorker;

    //Make sure blob and create object URL are supported
    if (workers && $window.Blob && $window.URL.createObjectURL) {
      //worker's string was loaded successfully
      var blob = new Blob([workers['shared.js']], {type: 'application/javascript'});
      sharedWorker = new $window.SharedWorker($window.URL.createObjectURL(blob), sharedWorkerName);
    } else {
      //Fallback! Can be used for debugging purposes.
      sharedWorker = new $window.SharedWorker('scripts/workers/shared.js', sharedWorkerName);
    }

    return sharedWorker;
  }

}());
