(function () {
  'use strict';

  angular
    .module('app.cars')
    .controller('CarsErrorModalController', CarsErrorModalController);

  /**
   * @ngdoc controller
   * @name app.cars.controller:CarsErrorModalController
   *
   * @requires $modalInstance
   * @requires app.cars.cars
   *
   * <p>
   * <br>
   * {@link http://angular-ui.github.io/bootstrap/#/modal $modalInstance}
   * </p>
   *
   * @description
   * Controller for error modal in cars application.
   */
  /* @ngInject */
  function CarsErrorModalController($modalInstance, cars) {
    var vm = this;

    vm.cars = cars;
    vm.selected = {
      car: vm.cars[0]
    };

    vm.ok = function () {
      var isAllowedEvent = $modalInstance.close(vm.selected.car);
      console.log('close: broadcasted event to the modal scope before the modal closes. ' +
        'Was it allowed? ' + isAllowedEvent);
    };

    vm.cancel = function () {
      var isAllowedEvent = $modalInstance.dismiss('cancel');
      console.log('dismiss: broadcasted event to the modal scope before the modal closes. ' +
        'Was it allowed? ' + isAllowedEvent);
    };
  }

})();
