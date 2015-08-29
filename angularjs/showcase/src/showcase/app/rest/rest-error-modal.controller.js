(function () {
  'use strict';

  angular
    .module('app.rest')
    .controller('RestErrorModal', RestErrorModal);

  /**
   * @ngdoc controller
   * @name app.rest.controller:RestErrorModal
   *
   * @description
   * Controller for error modal in rest application.
   */
  /* @ngInject */
  function RestErrorModal($modalInstance, cars) {
    var vm = this;

    vm.cars = cars;
    vm.selected = {
      car: vm.cars[0]
    };

    vm.ok = function () {
      var isAllowedEvent = $modalInstance.close(vm.selected.car);
      console.log('close: broadcasted event to the modal scope before the modal closes. ' +
        'Was it allowed?' + isAllowedEvent);
    };

    vm.cancel = function () {
      var isAllowedEvent = $modalInstance.dismiss('cancel');
      console.log('dismiss: broadcasted event to the modal scope before the modal closes. ' +
        'Was it allowed?' + isAllowedEvent);
    };
  }

})();
