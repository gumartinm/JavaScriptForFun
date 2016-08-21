describe('app.welcome', function() {
  'use strict';

  var WelcomeController;
  var $scope;

  beforeEach(function() {
    module('app.welcome');

    inject(function($controller, _$rootScope_) {
      $scope = _$rootScope_.$new();
      $scope.hello = 'Hello World';
      WelcomeController = $controller('WelcomeController', {$scope: $scope});
    });
  });

  describe('WelcomeController', function () {

    it('should be created successfully', function () {
      expect(WelcomeController).toBeDefined();
    });
  });

});
