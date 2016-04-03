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

    // vm.connectHeaders = {};
    // vm.clientDestination = {};
    // vm.serverDestination = {};
    // vm.payload = {};
    // vm.headers = {};

    vm.connect = function () {
      // use SockJS implementation instead of the browser's native implementation
      var ws = new SockJS(vm.url);
      client = Stomp.over(ws);
      client.heartbeat.outgoing = 20000; // client will send heartbeats every 20000ms
      client.heartbeat.incoming = 0;     // client does not want to receive heartbeats from the server
      client.connect(vm.connectHeaders, connectCallback, errorCallback);
    };

    vm.subscribe = function () {
    };

    vm.send = function () {
    };

    vm.disconnect = function() {
      client.disconnect(function() {
        alert('See you next time!');
      });
    };

    function connectCallback() {
      // called back after the client is connected and authenticated to the STOMP server
    }

    function errorCallback(error) {
      // display the error's message header:
      alert(error.headers.message);
    }
  }

})();
