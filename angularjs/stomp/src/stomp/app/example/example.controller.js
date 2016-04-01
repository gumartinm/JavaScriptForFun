(function () {
  'use strict';

  angular
    .module('app.users')
    .controller('ExampleController', ExampleController);

  /**
   * @ngdoc controller
   * @name app.example.controller:ExampleController
   *
   * @requires $rootScope
   * @requires $scope
   *
   * <p>
   * <br>
   * {@link https://docs.angularjs.org/api/ng/service/$rootScope $rootScope}
   * {@link https://docs.angularjs.org/api/ng/type/$rootScope.Scope $scope}
   * </p>
   *
   * @description
   * ExampleController controller.
   */
  /* @ngInject */
  function ExampleController() {
    var vm = this;

    vm.connectHeaders = {};
    vm.clientDestination = {};
    vm.serverDestination = {};
    vm.payload = {};
    vm.headers = {};

    vm.connect = function () {
    };

    vm.subscribe = function () {
    };

    vm.send = function () {
    };
  }

})();
