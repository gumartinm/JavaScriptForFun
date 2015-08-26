(function () {
  'use strict';

  angular
    .module('app.rest')
    .controller('Rest', Rest);

  /**
   * @ngdoc controller
   * @name app.rest.controller:Rest
   *
   * @requires $location
   * @requires app.rest.cars
   *
   * <p>
   * <br>
   * {@link https://docs.angularjs.org/api/ng/service/$location $location}
   * </p>
   *
   * @description
   * Rest controller.
   */
  /* @ngInject */
  function Rest($location, cars) {
    var vm = this;
    vm.example = {
      text: 'try to send data',
      word: /^\s*\w*\s*$/,
      singleModel: 1
    };
    vm.getCars = getCars;
    vm.cars = undefined;

    function getCars() {
      cars.getAll().then(function (data) {
        // Because cars service swallows errors my success function will always be called even when error.
        // Alternative: using $q.reject when errors in cars service?
        vm.cars = data;
      });
    }
  }

})();
