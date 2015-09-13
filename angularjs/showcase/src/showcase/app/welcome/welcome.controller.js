(function () {
  'use strict';

  angular
    .module('app.welcome')
    .controller('WelcomeController', WelcomeController);

  // When using <div ng-app="app" ng-strict-di> (strict mode) we must always
  // manually identify dependencies.
  // Instead I am going to use ngInject because it is cool :)
  // WelcomeController.$inject = ['$location'];

  /**
   * @ngdoc controller
   * @name app.welcome.controller:WelcomeController
   *
   * @requires $location
   *
   * <p>
   * <br>
   * {@link https://docs.angularjs.org/api/ng/service/$location $location}
   * </p>
   *
   * @description
   * WelcomeController controller.
   */
  /* @ngInject */
  function WelcomeController($location) {
    var vm = this;

    vm.hello = 'Hello World';
  }

})();
