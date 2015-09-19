(function () {
  'use strict';

  angular
    .module('app.users')
    .controller('UsersSecondChildController', UsersSecondChildController);

  /**
   * @ngdoc controller
   * @name app.users.controller:UsersSecondChildController
   *
   * @requires $scope
   *
   * <p>
   * <br>
   * {@link https://docs.angularjs.org/api/ng/type/$rootScope.Scope $scope}
   * </p>
   *
   * @description
   * UsersSecondChildController controller.
   */
  /* @ngInject */
  function UsersSecondChildController($scope, USERS) {
    var vm = this;

    vm.usersSecondChildOnRootScopeBroadcast = function (events, rootScopeBroadcastUser) {
      vm.rootScopeBroadcastUser = rootScopeBroadcastUser;
      console.log('usersSecondChildOnRootScopeBroadcast, events.name: ' + events.name);
    };
    vm.usersSecondChildOnScopeBroadcast = function (events, scopeBroadcastUser) {
      vm.scopeBroadcastUser = scopeBroadcastUser;
      // You will never see this message because listening for $scope.$broadcast sent by
      // controllers in the same level does not work.
      console.log('usersSecondChildOnScopeBroadcast, events.name: ' + events.name);
    };

    $scope.$on(USERS.ROOTSCOPE.BROADCAST_TO_SENCONDCHILD, vm.usersSecondChildOnRootScopeBroadcast);

    $scope.$on(USERS.SCOPE.BROADCAST_TO_SENCONDCHILD, vm.usersSecondChildOnScopeBroadcast);

  }
})();
