(function () {
  'use strict';

  angular
    .module('app.example')
    .controller('ExampleController', ExampleController);

  /**
   * @ngdoc controller
   * @name app.example.controller:ExampleController
   *
   * @requires $location
   *
   * <p>
   * <br>
   * {@link https://docs.angularjs.org/api/ng/service/$location $location}
   * </p>
   *
   * @description
   * ExampleController controller.
   */
  /* @ngInject */
  function ExampleController($location) {
    var vm = this;
    var client;
    var subscription;

    vm.endpointSimple = $location.protocol() + '://' + $location.host() + '/spring-stomp-server-simple/portfolio';
    vm.endpointFull = $location.protocol() + '://' + $location.host() + '/spring-stomp-server-full/fullportfolio';
    vm.url = vm.endpointSimple;
    vm.clientDestination = '/topic/greeting';
    vm.serverDestination = '/app/greeting';
    vm.connectHeaders = JSON.stringify({
      login: 'mylogin',
      passcode: 'mypasscode',
      //  User defined headers
      'client-id': 'gumartin-id'
    }, null, 4);
    //  User defined headers
    vm.sendHeaders = JSON.stringify({
      priority: 9
    }, null, 4);
    //  User defined headers
    vm.subscribeHeaders = JSON.stringify({
      id: 123456
    }, null, 4);



    vm.connect = function () {
      vm.debugLog = '';
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
      client.heartbeat.incoming = 20000; // server will send heartbeats every 20000ms
      client.debug = stompClientDebug;
      client.connect(JSON.parse(vm.connectHeaders), connectCallback, errorCallback);
    };

    vm.subscribe = function () {
      subscription = client.subscribe(vm.clientDestination, subscribeCallback, JSON.parse(vm.subscribeHeaders));
    };

    vm.unsubscribe = function () {
      subscription.unsubscribe();
    };

    vm.send = function () {
      client.send(vm.serverDestination, JSON.parse(vm.sendHeaders), vm.payload);
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
      if (error.headers) {
        alert(error.headers.message);
      } else {
        alert(error);
      }
    }

    function subscribeCallback(message) {
      // called when the client receives a STOMP message from the server
      if (message.body) {
        alert('got message with body ' + message.body);
      } else {
        alert('got empty message');
      }
    }

    function disconnectCallback() {
      alert('See you next time!');
    }

    function stompClientDebug(string) {
        vm.debugLog = vm.debugLog + string + '\n';
    }
  }

})();
