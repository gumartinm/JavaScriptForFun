(function () {
  'use strict';

  angular
    .module('app.widgets')
    .directive('controllerAsDirective', controllerAsDirective);

  /**
   * @ngdoc directive
   * @name app.widgets.directive:controllerAsDirective
   * @restrict EA
   * @requires $scope
   *
   * <p>
   * <br>
   * {@link https://docs.angularjs.org/api/ng/type/$rootScope.Scope $scope}
   * </p>
   *
   * @description
   * Controller as directive example.
   *
   * @element controller-as-directive
   *
   * @example
    <example name="controller-as-directive" module="app.widgets">
      <file name="index.html">
        <controller-as-directive>
      </file>
    </example>
   */
  function controllerAsDirective() {
    return {
      restrict: 'EA',
      templateUrl: 'app/widgets/example-controller-as.directive.html',
      link: linkFunc,
      controller: ExampleController,
      controllerAs: 'vm',
      scope: {},
      // Instead of defining the scope properties on scope, we declaratively define what properties are bound to the
      // component’s controller.
      // What means, max will become a property of this/vm and we could get rid of scope/$scope.
      // THIS WORKS ONLY WHEN USING controllerAs IN DIRECTIVES!!!
      bindToController: {
        max: '='
      }
    };

    function linkFunc(scope, el, attr, vm) {
      console.log('CONTROLLER-AS-DIRECTIVE LINK: scope doesn\'t contain the min, max and controller properties:');
      console.log('CONTROLLER-AS-DIRECTIVE LINK: min, because it was assigned to vm/this');
      console.log('CONTROLLER-AS-DIRECTIVE LINK: max, because we are using bindToController and max is a property of ' +
        'our controller (vm/this) instead of our scope.');
      console.log('CONTROLLER-AS-DIRECTIVE LINK: controller, because it was assigned to vm/this');
      console.log('CONTROLLER-AS-DIRECTIVE LINK: scope.min = %s *** should be undefined', scope.min);
      console.log('CONTROLLER-AS-DIRECTIVE LINK: scope.max = %s *** should be undefined', scope.max);
      console.log('CONTROLLER-AS-DIRECTIVE LINK: scope.controller = %s *** should be undefined', scope.controller);
      console.log('CONTROLLER-AS-DIRECTIVE LINK: min has the value assigned in our controller');
      console.log('CONTROLLER-AS-DIRECTIVE LINK: max is undefined because we didn\'t assign any value');
      console.log('CONTROLLER-AS-DIRECTIVE LINK: controller has the value assigned in our controller');
      console.log('CONTROLLER-AS-DIRECTIVE LINK: scope.vm.min = %s', scope.vm.min);
      console.log('CONTROLLER-AS-DIRECTIVE LINK: scope.vm.max = %s', scope.vm.max);
      console.log('CONTROLLER-AS-DIRECTIVE LINK: scope.vm.max = %s', scope.vm.controller);

      scope.vm.postlink = 'Value created in postlink';

      console.log('CONTROLLER-AS-DIRECTIVE LINK: because we are using \'controller as\' the fourth parameter is our ' +
        'controller\'s instance');
      console.log('CONTROLLER-AS-DIRECTIVE LINK: vm.min has the value assigned in our controller');
      console.log('CONTROLLER-AS-DIRECTIVE LINK: vm.max is undefined because we didn\'t assign any value');
      console.log('CONTROLLER-AS-DIRECTIVE LINK: vm.controller has the value assigned in our controller');
      console.log('CONTROLLER-AS-DIRECTIVE LINK: vm.min = %s', vm.min);
      console.log('CONTROLLER-AS-DIRECTIVE LINK: vm.max = %s', vm.max);
      console.log('CONTROLLER-AS-DIRECTIVE LINK: vm.controller = %s', vm.controller);
    }
  }

  /* @ngInject */
  function ExampleController($scope) {
    // Injecting $scope just for comparison
    var vm = this;

    vm.min = 3;

    console.log('CONTROLLER-AS-DIRECTIVE CTRL: $scope object contains vm. It doesn\'t contain max property because ' +
      'we are using bindToController. What means, max property will be assigned in our controller (vm/this) instead ' +
      'of our scope.');
    console.log('CONTROLLER-AS-DIRECTIVE CTRL: $scope.vm.min = %s', $scope.vm.min);
    console.log('CONTROLLER-AS-DIRECTIVE CTRL: $scope.vm.max = %s', $scope.vm.max);
    console.log('CONTROLLER-AS-DIRECTIVE CTRL: vm.min = %s', vm.min);
    console.log('CONTROLLER-AS-DIRECTIVE CTRL: vm.max = %s', vm.max);

    vm.controller = 'Value created in controller';
  }

})();
