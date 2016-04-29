(function () {
  'use strict';

  angular
    .module('app.widgets')
    .directive('autoHeight', autoHeight);

  /**
   * @ngdoc directive
   * @name app.widgets.directive:autoHeight
   * @restrict EA
   *
   *
   * @description
   * Controller child directive example.
   *
   * @element auto-height-directive
   *
   * @example
   <example name="auto-height" module="app.widgets">
   <file name="index.html">
   <textarea auto-height> </textarea>
   </file>
   </example>
   */
  function autoHeight() {
    return {
      restrict: 'EA',
      link: linkFunc,
      scope: {}
    };

    function linkFunc(scope, el, attr, ctrl) {
      var height = (el[0].scrollHeight < 30) ? 80 : el[0].scrollHeight;

      height = height + 80;
      el[0].style.height = height + 'px';
    }
  }

})();
