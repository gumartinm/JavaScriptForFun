(function () {
  'use strict';

  angular
    .module('app.shared-stomp')
    .controller('SharedStompController', SharedStompController);

  /**
   * @ngdoc controller
   * @name app.shared-stomp.controller:SharedStompController
   *
   * @requires $location
   * @requires app.shared-stomp.sharedWorker
   *
   * <p>
   * <br>
   * {@link https://docs.angularjs.org/api/ng/service/$location $location}
   * </p>
   *
   * @description
   * SharedStompController controller.
   */
  /* @ngInject */
  function SharedStompController($location, sharedWorker) {
    var vm = this;

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
      sharedWorker.connect(vm.url, JSON.parse(vm.connectHeaders), connectSuccessCallback, connectErrorCallback);
    };

    vm.subscribe = function () {
      sharedWorker.subscribe(vm.clientDestination, subscribeCallback, JSON.parse(vm.subscribeHeaders));
    };

    vm.unSubscribe = function () {
      sharedWorker.unSubscribe();
    };

    vm.send = function () {
      sharedWorker.send(vm.serverDestination, JSON.parse(vm.sendHeaders), vm.payload);
    };

    vm.disconnect = function() {
      sharedWorker.disconnect(disconnectCallback);
    };

    function connectSuccessCallback() {
      // called back after the client is connected and authenticated to the STOMP server
      alert('got connection');
    }

    function connectErrorCallback(error) {
      // display the error's message header:
      alert('error call back: \n' + JSON.stringify(error, null, 4));
    }

    function subscribeCallback(message) {
      // called when the client receives a STOMP message from the server
      alert('subscribe message: \n' + JSON.stringify(message, null, 4));
    }

    function disconnectCallback() {
      alert('See you next time!');
    }
  }

})();
