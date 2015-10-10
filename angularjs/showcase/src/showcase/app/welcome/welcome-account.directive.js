(function () {
  'use strict';

  angular
    .module('app.welcome')
    .directive('welcomeAccountDirective', welcomeAccountDirective);

  /**
   * @ngdoc directive
   * @name app.welcome.directive:welcomeAccountDirective
   * @restrict EA
   *
   * @description
   * Welcome account directive
   *
   * @element welcome-account-directive
   *
   * @example
    <example name="welcome-account-directive" module="app.welcome">
      <file name="index.html">
        <welcome-account-directive>
      </file>
    </example>
   */
  function welcomeAccountDirective() {
    return {
      restrict: 'EA',
      templateUrl: 'app/welcome/welcome-account.directive.html',
      controller: 'WelcomeAccountController',
      controllerAs: 'vm',
      scope: {},
      bindToController: {
        fullName: '='
      }
    };
  }

})();
