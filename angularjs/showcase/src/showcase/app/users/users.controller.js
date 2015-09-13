(function () {
  'use strict';

  angular
    .module('app.users')
    .controller('UsersController', UsersController);

  /**
   * @ngdoc controller
   * @name app.users.controller:UsersController
   *
   * @requires $rootScope
   *
   * <p>
   * <br>
   * {@link https://docs.angularjs.org/api/ng/service/$rootScope $rootScope}
   * </p>
   *
   * @description
   * UsersController controller.
   */
  /* @ngInject */
  function UsersController($rootScope, $scope, USERS) {
    var vm = this;
    var rootScopeBroadcastUser = {
      name: 'Snake',
      lastName: 'Eyes',
      city: 'classified'
    };
    var scopeBroadcastUser = {
      name: 'Shana',
      lastName: 'M. O\'Hara',
      city: 'Atlanta'
    };

    vm.getRootScopeBroadcast = function () {
      $rootScope.$broadcast(USERS.ROOTSCOPE.BROADCAST, rootScopeBroadcastUser);
    };
    vm.getScopeBroadcast = function () {
      $scope.$broadcast(USERS.ROOTSCOPE.BROADCAST, scopeBroadcastUser);
    };

    $scope.$on(USERS.SCOPE.EMIT_FACT, usersOnEmitFact);

    function usersOnEmitFact(events, emitFact) {
      vm.emitFact = emitFact;
      console.log('usersOnEmitFact, events.name: ' + events.name);
    }
  }

})();
