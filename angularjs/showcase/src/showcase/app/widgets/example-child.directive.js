(function () {
  'use strict';

  angular
    .module('app.widgets')
    .directive('parentDirective', parentDirective);

  /**
   * @ngdoc directive
   * @name app.widgets.directive:parentDirective
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
   * @element parent-directive
   *
   * @example
    <example name="controller-directive" module="app.widgets">
      <file name="index.html">
        <parent-directive>
      </file>
    </example>
   */
  function parentDirective() {
    return {
      restrict: 'EA',
      templateUrl: 'app/widgets/example-parent.directive.html',
      link: linkFunc,
      compile: function compile(element, attributes, transcludeFn) {
        console.log('PARENT-DIRECTIVE: compile');
        return {
          pre: function preLink(scope, element, attributes, controller, transcludeFn) {
            console.log('PARENT-DIRECTIVE: preLink');
          },
          post: function postLink(scope, element, attributes, controller, transcludeFn) {
            console.log('PARENT-DIRECTIVE: postLink');
          }
        };
      },
      controller: ExampleParentController,
      scope: {
        max: '='
      }
    };

    function linkFunc(scope, el, attr, ctrl) {
      console.log('PARENT-DIRECTIVE: linkFunc');
    }
  }

  /* @ngInject */
  function ExampleParentController($scope) {
    console.log('PARENT-DIRECTIVE: controller');

    $scope.min = 3;
  }

})();
