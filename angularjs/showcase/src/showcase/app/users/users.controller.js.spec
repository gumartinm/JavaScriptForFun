describe('app.users', function() {
  'use strict';

  var $rootScope;
  var $scope;
  var USERS;
  var UsersController;

  beforeEach(function() {
    module('app.users');

    inject(function($controller, _$rootScope_, _USERS_) {
      $rootScope = _$rootScope_;
      USERS = _USERS_;
      $scope = $rootScope.$new();

      spyOn($rootScope, '$broadcast');
      jasmine.createSpy($scope, '$scope.$broadcast');
      UsersController = $controller('UsersController', {
        $rootScope: $rootScope,
        $scope: $scope,
        USERS: _USERS_
      });
    });
  });

  describe('UsersController', function () {

    it('should be created successfully', function () {
      expect(UsersController).toBeDefined();
    });

    it('should be called $rootScope.$broadcast', function () {
      var rootScopeBroadcastUser = {
        name: 'Snake',
        lastName: 'Eyes',
        city: 'classified'
      };

      UsersController.getRootScopeBroadcast();

      expect($rootScope.$broadcast).toHaveBeenCalledWith(USERS.ROOTSCOPE.BROADCAST, rootScopeBroadcastUser);
    });

    it('should be called $scope.$broadcast', function () {
      var scopeBroadcastUser = {
        name: 'Shana',
        lastName: 'M. O\'Hara',
        city: 'Atlanta'
      };

      UsersController.getScopeBroadcast();

      expect($scope.$broadcast).toHaveBeenCalledWith(USERS.ROOTSCOPE.BROADCAST, scopeBroadcastUser);
    });

    it('should be assigned emitFact', function () {
      var emitFact = {
        title: 'Snake and Scarlett',
        fact: 'it is canon'
      };
      var event = {
        name: 'USERS_SCOPE_EMIT_FACT'
      };

      UsersController.usersOnEmitFact(event, emitFact);

      expect(UsersController.emitFact).toEqual(emitFact);
    });
  });

});
