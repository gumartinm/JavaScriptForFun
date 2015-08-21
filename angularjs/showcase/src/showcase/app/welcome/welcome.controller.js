(function () {
  'use strict';

  angular
    .module('app.welcome')
    .controller('Welcome', Welcome);

  // When using <div ng-app="app" ng-strict-di> (strict mode) we must always
  // manually identify dependencies.
  // Instead I am going to use ngInject because it is cool :)
  // Welcome.$inject = ['$location'];

  /**
   * @ngdoc object
   * @name app.welcome.$Welcome
   *
   * @requires $location
   *
   * @description
   * Welcome controller.
   */
  /* @ngInject */
  function Welcome($location) {
    var vm = this;

    vm.hello = 'Hello World';
  }

})();
