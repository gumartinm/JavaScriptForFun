describe('app.welcome', function() {
  'use strict';

  var controller;
  var scope;

  beforeEach(function() {
    module('app.welcome');

    inject(function($controller, _$rootScope_) {
      scope = _$rootScope_.$new();
      scope.hello = 'Hello World';
      controller = $controller('Welcome', {$scope: scope});
    });
  });

  describe('Welcome controller', function () {

    it('should be created successfully', function () {
      expect(controller).toBeDefined();
    });
  });

});
