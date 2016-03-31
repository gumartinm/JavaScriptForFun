describe('app.users', function() {
  'use strict';

  var $rootScope;
  var $scope;
  var USERS;
  var UsersSecondChildController;

  beforeEach(function() {
    module('app.users');

    inject(function($controller, _$rootScope_, _USERS_) {
      $rootScope = _$rootScope_;
      USERS = _USERS_;
      $scope = $rootScope.$new();

      spyOn($scope, '$emit');
      UsersSecondChildController = $controller('UsersSecondChildController', {
        $rootScope: $rootScope,
        $scope: $scope,
        USERS: _USERS_
      });
    });
  });

  describe('UsersSecondChildController', function () {

    it('should be created successfully', function () {
      expect(UsersSecondChildController).toBeDefined();
    });

    it('should be assigned rootScopeBroadcastUser', function () {
      var rootScopeBroadcastUser = {
        name: 'UsersChild To UsersSecondChild',
        lastName: 'rootscope broadcasting to UsersSecondChild from UserChild',
        city: 'UserChild'
      };
      var event = {
        name: USERS.ROOTSCOPE.BROADCAST_TO_SENCONDCHILD
      };

      UsersSecondChildController.usersSecondChildOnRootScopeBroadcast(event, rootScopeBroadcastUser);

      expect(UsersSecondChildController.rootScopeBroadcastUser).toEqual(rootScopeBroadcastUser);
    });

    it('should be assigned broadcastUser', function () {
      var scopeBroadcastUser = {
        name: 'UsersChild To UsersSecondChild',
        lastName: 'rootscope broadcasting to UsersSecondChild from UserChild',
        city: 'UserChild'
      };
      var event = {
        name: USERS.SCOPE.BROADCAST_TO_SENCONDCHILD
      };

      UsersSecondChildController.usersSecondChildOnScopeBroadcast(event, scopeBroadcastUser);

      expect(UsersSecondChildController.scopeBroadcastUser).toEqual(scopeBroadcastUser);
    });
  });

});
