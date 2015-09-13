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
   * Controller parent directive example.
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

      // BE CAREFUL, THE LOADING ORDER IS DIFFERENT WHEN USING templateUrl TO WHEN USING template!!!

      // ****** console output when using templateUrl in parent and child directives: ******
      //XHR finished loading: GET "http://localhost:9000/app/widgets/example-parent.directive.html"
      //example-parent.directive.js:67 PARENT-DIRECTIVE: compile
      //example-parent.directive.js:91 PARENT-DIRECTIVE: controller
      //example-parent.directive.js:70 PARENT-DIRECTIVE: preLink
      //example-parent.directive.js:73 PARENT-DIRECTIVE: postLink
      //XHR finished loading: GET "http://localhost:9000/app/widgets/example-child.directive.html".
      //example-child.directive.js:63 CHILD-DIRECTIVE: compile
      //example-child.directive.js:87 CHILD-DIRECTIVE: controller
      //example-child.directive.js:66 CHILD-DIRECTIVE: preLink
      //example-child.directive.js:69 CHILD-DIRECTIVE: postLink

      // ****** console output when using template in parent and child directives: ******
      //example-parent.directive.js:67 PARENT-DIRECTIVE: compile
      //example-child.directive.js:63 CHILD-DIRECTIVE: compile
      //example-parent.directive.js:91 PARENT-DIRECTIVE: controller
      //example-parent.directive.js:70 PARENT-DIRECTIVE: preLink
      //example-child.directive.js:87 CHILD-DIRECTIVE: controller
      //example-child.directive.js:66 CHILD-DIRECTIVE: preLink
      //example-child.directive.js:69 CHILD-DIRECTIVE: postLink
      //example-parent.directive.js:73 PARENT-DIRECTIVE: postLink

      //template: '' +
      //'<div>parent directive html template</div>' +
      //'<label>child directive:</label>' +
      //'<child-directive>' +
      //'</child-directive>',
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
      // This function will never be used because we are implementing the compile attribute.
      console.log('PARENT-DIRECTIVE: linkFunc');
    }
  }

  /* @ngInject */
  function ExampleParentController($scope) {
    console.log('PARENT-DIRECTIVE: controller');

    $scope.min = 3;
  }

})();
