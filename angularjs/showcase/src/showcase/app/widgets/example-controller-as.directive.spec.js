(function() {
  'use strict';

  describe('exampleControllerAsDirective', function() {
    var $compile;
    var $rootScope;
    var template;

    beforeEach(module('app.widgets'));

    beforeEach(inject(function(_$compile_, _$rootScope_) {
      $compile = _$compile_;
      $rootScope = _$rootScope_;
      template = '<controller-as-directive>';
    }));

    it('should assign min value 3', function() {
      var $scope;
      var element;
      var vm;

      $scope = $rootScope.$new();
      // IN THE REAL WORLD, BETTER DECLARE THE CONTROLLER RELATED TO MY DIRECTIVE IN A DIFFERENT FILE AND
      // TEST THE CONTROLLER WITH ITS OWN SPEC!!!!!
      // see: http://stackoverflow.com/a/15314876
      element = $compile(template)($scope);
      $scope.$digest();

      vm = element.controller('controllerAsDirective');

      expect(vm.min).toEqual(3);

    });

  });

}());
