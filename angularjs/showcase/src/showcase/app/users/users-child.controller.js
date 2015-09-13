(function () {
  'use strict';

  angular
    .module('app.users')
    .controller('UsersChildController', UsersChildController);

  /**
   * @ngdoc controller
   * @name app.users.controller:UsersChildController
   *
   * @requires $rootScope
   *
   * <p>
   * <br>
   * {@link https://docs.angularjs.org/api/ng/service/$rootScope $rootScope}
   * </p>
   *
   * @description
   * Users controller.
   */
  /* @ngInject */
  function UsersChildController($rootScope, $scope, USERS) {
    var vm = this;
    var emitFact = {
      title: 'Snake and Scarlett',
      fact: 'it is canon'
    };

    vm.getEmit = function () {
      $scope.$emit(USERS.SCOPE.EMIT_FACT, emitFact);
    };

    // NEVER USE $rootScope.$on IN CONTROLLER BECAUSE IT IS NOT DESTROYED EVEN IF CONTROLLER WAS DESTROYED!!!
    // YOU WILL END UP HAVING AS MANY EVENT LISTENERS AS TIMES THIS CONTROLLER IS CREATED!!!!
    // $rootScope.$on(USERS.ROOTSCOPE.BROADCAST, usersChildOnRootBroadcast);

    // LISTENING FOR EVENTS IN $scope IS THE RIGHT THING BECAUSE THESE EVENT LISTENERS ARE DESTROYED
    // AT THE SAME TIME AS THIS CONTROLLER :)
    $scope.$on(USERS.ROOTSCOPE.BROADCAST, usersChildOnScopeBroadcast);

    // function usersChildOnRootBroadcast(events, broadcastUser) {
    //   vm.broadcastUser = broadcastUser;
    //   console.log('usersChildOnRootBroadcast, events.name: ' + events.name);
    // }

    function usersChildOnScopeBroadcast(events, broadcastUser) {
      vm.broadcastUser = broadcastUser;
      console.log('usersChildOnScopeBroadcast, events.name: ' + events.name);
    }

  }
})();
