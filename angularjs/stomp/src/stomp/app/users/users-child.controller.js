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
   * @requires $scope
   *
   * <p>
   * <br>
   * {@link https://docs.angularjs.org/api/ng/service/$rootScope $rootScope}
   * {@link https://docs.angularjs.org/api/ng/type/$rootScope.Scope $scope}
   * </p>
   *
   * @description
   * UsersChildController controller.
   */
  /* @ngInject */
  function UsersChildController($rootScope, $scope, USERS) {
    var vm = this;

    var emitFact = {
      title: 'Snake and Scarlett',
      fact: 'it is canon'
    };
    var scopeBroadcastToSecondChild = {
      name: 'UsersChild To UsersSecondChild',
      lastName: 'scope broadcasting to UsersSecondChild from UserChild',
      city: 'UserChild'
    };
    var rootScopeBroadcastToSecondChild = {
      name: 'UsersChild To UsersSecondChild',
      lastName: 'rootscope broadcasting to UsersSecondChild from UserChild',
      city: 'UserChild'
    };

    // This is the right way for accessing to a parent controller from a child one when using the "Controller as" way.
    // Problem: we need to name our controllers with something different to the "vm standard", otherwise
    // here we wouldn't be able to access to the parent controller because it would have the same name as our child
    // controller (vm). So, we need different names for parent and child controllers.
    vm.valueForChildControllers = $scope.usersController.toBeCalledFromChildControllers();

    vm.getEmit = function () {
      $scope.$emit(USERS.SCOPE.EMIT_FACT, emitFact);
    };
    vm.broadcastToSencondChild = function () {
      // $scope.$broadcast will never be seen by controllers in the same level as this controller. :(
      $scope.$broadcast(USERS.SCOPE.BROADCAST_TO_SENCONDCHILD, scopeBroadcastToSecondChild);
      // The only way is either using $rootScope or creating a new controllers hierarchy where
      // UsersSecondChildController would be in a lower level than UsersChildController.
      $rootScope.$broadcast(USERS.ROOTSCOPE.BROADCAST_TO_SENCONDCHILD, rootScopeBroadcastToSecondChild);
    };
    vm.usersChildOnScopeBroadcast = function (events, broadcastUser) {
      vm.broadcastUser = broadcastUser;
      console.log('usersChildOnScopeBroadcast, events.name: ' + events.name);
    };

    // NEVER USE $rootScope.$on IN CONTROLLER BECAUSE IT IS NOT DESTROYED EVEN IF CONTROLLER WAS DESTROYED!!!
    // YOU WILL END UP HAVING AS MANY EVENT LISTENERS AS TIMES THIS CONTROLLER IS CREATED!!!!
    // $rootScope.$on(USERS.ROOTSCOPE.BROADCAST, usersChildOnRootBroadcast);

    // LISTENING FOR EVENTS IN $scope IS THE RIGHT THING BECAUSE THESE EVENT LISTENERS ARE DESTROYED
    // AT THE SAME TIME AS THIS CONTROLLER :)
    $scope.$on(USERS.ROOTSCOPE.BROADCAST, vm.usersChildOnScopeBroadcast);

    // function usersChildOnRootBroadcast(events, broadcastUser) {
    //   vm.broadcastUser = broadcastUser;
    //   console.log('usersChildOnRootBroadcast, events.name: ' + events.name);
    // }

  }
})();
