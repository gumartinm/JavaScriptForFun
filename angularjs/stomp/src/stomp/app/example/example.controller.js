(function () {
  'use strict';

  angular
    .module('app.example')
    .controller('ExampleController', ExampleController);

  /**
   * @ngdoc controller
   * @name app.example.controller:ExampleController
   *
   * @requires $rootScope
   * @requires $scope
   *
   * <p>
   * <br>
   * {@link https://docs.angularjs.org/api/ng/service/$rootScope $rootScope}
   * {@link https://docs.angularjs.org/api/ng/type/$rootScope.Scope $scope}
   * </p>
   *
   * @description
   * ExampleController controller.
   */
  /* @ngInject */
  function ExampleController() {
    var vm = this;

    var client;
    var subscription;

    // vm.serverDestination = {};
    // vm.payload = {};
    // vm.headers = {};

    vm.connect = function () {
      // use SockJS implementation instead of the browser's native implementation
      var options = {
        debug: true,
        devel: true,
        //jscs:disable
        protocols_whitelist: ['websocket', 'xdr-streaming', 'xhr-streaming'],
        //jscs:enable
        transports: ['websocket', 'xdr-streaming', 'xhr-streaming']
      };
      var ws = new SockJS(vm.url, undefined, options);
      client = Stomp.over(ws);
      client.heartbeat.outgoing = 20000; // client will send heartbeats every 20000ms
      client.heartbeat.incoming = 0;     // client does not want to receive heartbeats from the server
      client.connect(vm.connectHeaders, connectCallback, errorCallback);
    };

    vm.subscribe = function () {
      subscription = client.subscribe(vm.clientDestination, subscribeCallback);
    };

    vm.unsubscribe = function () {
      subscription.unsubscribe();
    };

    vm.send = function () {
      client.send(vm.serverDestination, vm.headers, vm.payload);
    };

    vm.disconnect = function() {
      client.disconnect(disconnectCallback);
    };

    function connectCallback() {
      // called back after the client is connected and authenticated to the STOMP server
      alert('got connection');
    }

    function errorCallback(error) {
      // display the error's message header:
      alert(error.headers.message);
    }

    function subscribeCallback(message) {
      // called when the client receives a STOMP message from the server
      if (message.body) {
        alert('got message with body ' + message.body)
      } else {
        alert('got empty message');
      }
    }

    function disconnectCallback() {
      alert('See you next time!');
    }
  }

})();
