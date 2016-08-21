describe('app.welcome', function() {
  'use strict';

  beforeEach(function() {
    module('app.welcome');
  });

  describe('WelcomeAccountController', function () {

    it('should fill yourChoice field', function () {
      var fullName = 'Gustavo Martin';
      var expected = fullName + ' / ' + 'This field would be the user\'s choice';
      var birthDate = {
        city: 'classified',
        birthDate: 'private'
      };
      var WelcomeAccountController;

      inject(function(_$rootScope_, $controller) {
        var $scope = _$rootScope_.$new();
        WelcomeAccountController = $controller(
          'WelcomeAccountController',
          {$scope: $scope},
          {fullName: fullName}
        );
      });

      // Jasmine toEqual code:
      //getJasmineRequireObj().toEqual = function() {
      //
      //  function toEqual(util, customEqualityTesters) {
      //    customEqualityTesters = customEqualityTesters || [];
      //
      //    return {
      //      compare: function(actual, expected) {
      //        var result = {
      //          pass: false
      //        };
      //
      //        result.pass = util.equals(actual, expected, customEqualityTesters);
      //
      //        return result;
      //      }
      //    };
      //  }
      expect(expected).toEqual(WelcomeAccountController.yourChoice);

      // toBe works because I am testing strings and it seems as if the virtual machine
      // is using the same pointer for strings which are the same. Even if they are created from
      // other strings? I looks like that. Because in this spec I have constant strings but in WelcomeAccountController
      // I don't have a constant string and toBe keeps working...
      // toBe is the same as testing: object === someOtherObject

      // Jasmine toBe code:
      //getJasmineRequireObj().toBe = function() {
      //  function toBe() {
      //    return {
      //      compare: function(actual, expected) {
      //        return {
      //          pass: actual === expected
      //        };
      //      }
      //    };
      //  }
      expect(expected).toBe(WelcomeAccountController.yourChoice);

      expect(birthDate).toEqual(WelcomeAccountController.birthDate);
      // toBe in this case doesn't work because I am testing objects and they have different pointers.
      expect(birthDate).not.toBe(WelcomeAccountController.birthDate);
    });

  });

});
