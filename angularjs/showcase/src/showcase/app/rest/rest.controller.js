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
  function Rest($log, cars) {
    var vm = this;
    vm.example = {
      text: 'try to send data',
      word: /^\s*\w*\s*$/,
      singleModel: 1
    };
    vm.getCars = getCars;

    function getCars() {
      // ES6 way. success and error are deprecated because they are not following the ES6 way.
      cars.getAll().then(
        // Success
        function (value) {
          vm.cars = value;
        },
        // Error
        function(reason) {
          $log.debug('Rest controller error: ' + reason);
        }
      );
    }
  }

})();
