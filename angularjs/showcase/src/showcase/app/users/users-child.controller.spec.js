describe('app.users', function() {
  'use strict';

  var valueForChildControllers = {
    variable: 'This is a variable from UsersController',
    value: 'Hello child controller'
  };
  var usersController = {
    toBeCalledFromChildControllers: function() {
      return valueForChildControllers;
    }
  };
  var $rootScope;
  var $scope;
  var USERS;
  var UsersChildController;

  beforeEach(function() {
    module('app.users');

    inject(function($controller, _$rootScope_, _USERS_) {
      $rootScope = _$rootScope_;
      USERS = _USERS_;
      $scope = $rootScope.$new();

      $scope.usersController = usersController;
      spyOn($scope, '$emit');
      spyOn($rootScope, '$broadcast');
      jasmine.createSpy($scope, '$scope.$broadcast');
      spyOn($scope.usersController, 'toBeCalledFromChildControllers')
        .and.callThrough();
      UsersChildController = $controller('UsersChildController', {
        $rootScope: $rootScope,
        $scope: $scope,
        USERS: _USERS_
      });
    });
  });

  describe('UsersChildController', function () {

    it('should be created successfully', function () {
      expect(UsersChildController).toBeDefined();

      expect($scope.usersController.toBeCalledFromChildControllers).toHaveBeenCalled();
      expect(UsersChildController.valueForChildControllers).toEqual(valueForChildControllers);
    });

    it('should be called $scope.$emit', function () {
      var emitFact = {
        title: 'Snake and Scarlett',
        fact: 'it is canon'
      };

      UsersChildController.getEmit();

      expect($scope.$emit).toHaveBeenCalledWith(USERS.SCOPE.EMIT_FACT, emitFact);
    });

    it('should be assigned broadcastUser', function () {
      var rootScopeBroadcastUser = {
        name: 'Snake',
        lastName: 'Eyes',
        city: 'classified'
      };
      var event = {
        name: USERS.ROOTSCOPE.BROADCAST
      };

      UsersChildController.usersChildOnScopeBroadcast(event, rootScopeBroadcastUser);

      expect(UsersChildController.broadcastUser).toEqual(rootScopeBroadcastUser);
    });

    it('should be called $rootScope.$broadcast', function () {
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

      UsersChildController.broadcastToSencondChild();

      expect($rootScope.$broadcast).toHaveBeenCalledWith(
        USERS.ROOTSCOPE.BROADCAST_TO_SENCONDCHILD, rootScopeBroadcastToSecondChild);
      expect($scope.$broadcast).toHaveBeenCalledWith(
        USERS.SCOPE.BROADCAST_TO_SENCONDCHILD, scopeBroadcastToSecondChild);
    });

  });

});
