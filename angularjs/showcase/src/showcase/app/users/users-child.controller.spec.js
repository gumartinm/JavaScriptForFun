describe('app.users', function() {
  'use strict';

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

      spyOn($scope, '$emit');
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
        name: 'USERS.ROOTSCOPE.BROADCAST'
      };

      UsersChildController.usersChildOnScopeBroadcast(event, rootScopeBroadcastUser);

      expect(UsersChildController.broadcastUser).toEqual(rootScopeBroadcastUser);
    });
  });

});
