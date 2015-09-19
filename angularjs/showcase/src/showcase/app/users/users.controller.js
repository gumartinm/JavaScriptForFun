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
   * @requires $scope
   *
   * <p>
   * <br>
   * {@link https://docs.angularjs.org/api/ng/service/$rootScope $rootScope}
   * {@link https://docs.angularjs.org/api/ng/type/$rootScope.Scope $scope}
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
    vm.usersOnEmitFact = function (events, emitFact) {
      vm.emitFact = emitFact;
      console.log('usersOnEmitFact, events.name: ' + events.name);
    };

    $scope.$on(USERS.SCOPE.EMIT_FACT, vm.usersOnEmitFact);
  }

})();
