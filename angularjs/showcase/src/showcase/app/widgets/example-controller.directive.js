(function () {
  'use strict';

  angular
    .module('app.widgets')
    .directive('controllerDirective', controllerDirective);

  /**
   * @ngdoc directive
   * @name app.widgets.directive:controllerDirective
   * @restrict EA
   * @requires $scope
   *
   * <p>
   * <br>
   * {@link https://docs.angularjs.org/api/ng/type/$rootScope.Scope $scope}
   * </p>
   *
   * @description
   * Controller directive example.
   *
   * @element controller-directive
   *
   * @example
    <example name="controller-directive" module="app.widgets">
      <file name="index.html">
        <controller-directive>
      </file>
    </example>
   */
  function controllerDirective() {
    return {
      restrict: 'EA',
      templateUrl: 'app/widgets/example-controller.directive.html',
      link: linkFunc,
      controller: ExampleController,
      scope: {
        max: '='
      }
    };

    function linkFunc(scope, el, attr, ctrl) {
      console.log('CONTROLLER-DIRECTIVE LINK: scope contains the min, max and controller properties:');
      console.log('CONTROLLER-DIRECTIVE LINK: scope.min = %s', scope.min);
      console.log('CONTROLLER-DIRECTIVE LINK: scope.max = %s *** should be undefined', scope.max);
      console.log('CONTROLLER-DIRECTIVE LINK: scope.controller = %s', scope.controller);

      scope.postlink = 'Value created in postlink';

      console.log('CONTROLLER-DIRECTIVE LINK: because we are NOT using \'controller as\' the fourth parameter is our ' +
        'controller\'s instance but it doesn\'t have anything interesting!!!!');
      console.log('CONTROLLER-DIRECTIVE LINK: ctrl.min = %s *** should be undefined', ctrl.min);
      console.log('CONTROLLER-DIRECTIVE LINK: ctrl.max = %s *** should be undefined', ctrl.max);
      console.log('CONTROLLER-DIRECTIVE LINK: ctrl.controller = %s *** should be undefined', ctrl.controller);
    }
  }

  /* @ngInject */
  function ExampleController($scope) {

    $scope.min = 3;

    console.log('CONTROLLER-DIRECTIVE CTRL: $scope.min = %s', $scope.min);
    console.log('CONTROLLER-DIRECTIVE CTRL: $scope.max = %s', $scope.max);

    $scope.controller = 'Value created in controller';
  }

})();
