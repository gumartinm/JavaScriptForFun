(function() {
  'use strict';

  describe('welcomeAccountDirective', function() {
    var $compile;
    var $rootScope;
    var template;

    beforeEach(module('app.welcome'));

    beforeEach(inject(function(_$compile_, _$rootScope_) {
      $compile = _$compile_;
      $rootScope = _$rootScope_;
      template = '<welcome-account-directive full-name="example.fullName"></welcome-account-directive>';
    }));

    it('should assign min value 3', function() {
      var $scope = $rootScope.$new();
      var element;
      var account;
      $scope.example = {
        fullName: 'Snake Eyes'
      };

      element = $compile(template)($scope);
      $scope.$digest();
      account = element.find('div.account');

      expect(account.length).toBe(2);
      expect(account.eq(0).text()).toBe('fullName=Snake Eyes');
      expect(account.eq(1).text()).toBe('yourChoice=Snake Eyes / This field would be the user\'s choice');
    });
  });

}());
