(function () {
  'use strict';

  angular
    .module('app.cars')
    .controller('Cars', Cars);

  /**
   * @ngdoc controller
   * @name app.cars.controller:Cars
   *
   * @requires $modal
   * @requires $timeout
   * @requires app.cars.cars
   *
   * <p>
   * <br>
   * {@link http://angular-ui.github.io/bootstrap/#/modal $modal} <br>
   * {@link https://docs.angularjs.org/api/ng/service/$timeout $timeout}
   * </p>
   *
   * @description
   * Cars controller.
   */
  /* @ngInject */
  function Cars($modal, $timeout, cars) {
    var vm = this;

    vm.example = {
      text: 'try to send data',
      word: /^\s*\w*\s*$/,
      singleModel: 1
    };
    vm.getCars = function () {
      // ES6 way. success and error are deprecated because they are not following the ES6 way.
      cars.getAll().then(
        // Success
        function (value) {
          vm.cars = value;
        },
        // Error
        function(reason) {
          console.log('Cars controller error: ' + reason);
          vm.doModal('lg');
        }
      );
    };

    // How to test "private" methods in controllers?
    // Two options:
    // a) Extracting the logic of the "private" method to some service. The service could be
    //    called ModalService and it could be used by any module. Does that ring a bell? :D
    // b) The one I am using here. Attaching to vm/this because AngularJS is performing new MyController().
    vm.doModal = function (size) {
      var cars = ['car1', 'car2', 'car3'];
      // The modalInstance object will be seen from here and it will also be injected in CarsErrorModal controller
      var modalInstance = $modal.open({
        animation: true,
        templateUrl: 'app/cars/cars-error-modal.html',
        controller: 'CarsErrorModal as vm',
        size: size,
        backdrop: 'static',
        keyboard: false,
        resolve: {
          cars: function () {
            return cars;
          }
        }
      });

      modalInstance.result.then(function (selectedItem) {
        // following this path after calling modalInstance.close from either this controller or
        // CarsErrorModal controller.
        vm.selected = selectedItem;
      }, function (reason) {
        // following this path after calling modalInstance.dismiss from either this controller or
        // CarsErrorModal controller.
        if (reason === '$uibUnscheduledDestruction') {
          console.log('Modal\'s scope destroyed by unexpected mechanism');
        }
        console.log('Modal dismissed at: ' + new Date());
        console.log('Modal dismissed reason: ' + reason);
      });

      modalInstance.opened.then(function(value) {
        console.log('Modal opened success at: ' + new Date());
        console.log('Modal opened success value: ' + value);
      }, function(reason) {
        console.log('Modal opened error at: ' + new Date());
        console.log('Modal opened error value: ' + reason);
      });

      modalInstance.rendered.then(function(value) {
        console.log('Modal rendered success at: ' + new Date());
        console.log('Modal rendered success value: ' + value);
      }, function(reason) {
        console.log('Modal rendered error at: ' + new Date());
        console.log('Modal rendered error value: ' + reason);
      });

      $timeout(function() {
        console.log('closed by timeout at: ' + new Date());
        modalInstance.close('closed by timeout');
      }, 5000);

      $timeout(function() {
        console.log('dismissed by timeout at: ' + new Date());
        modalInstance.dismiss('dismissed by timeout');
      }, 10000);
    };
  }

})();
