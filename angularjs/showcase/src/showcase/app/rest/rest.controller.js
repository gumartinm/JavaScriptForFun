(function () {
  'use strict';

  angular
    .module('app.rest')
    .controller('Rest', Rest);

  /**
   * @ngdoc controller
   * @name app.rest.controller:Rest
   *
   * @requires $modal
   * @requires $timeout
   * @requires app.rest.rest
   *
   * <p>
   * <br>
   * {@link http://angular-ui.github.io/bootstrap/#/modal $modal}
   * {@link https://docs.angularjs.org/api/ng/service/$timeout $timeout}
   * </p>
   *
   * @description
   * Rest controller.
   */
  /* @ngInject */
  function Rest($modal, $timeout, rest) {
    var vm = this;
    vm.example = {
      text: 'try to send data',
      word: /^\s*\w*\s*$/,
      singleModel: 1
    };
    vm.getCars = getCars;

    function getCars() {
      // ES6 way. success and error are deprecated because they are not following the ES6 way.
      rest.getAll().then(
        // Success
        function (value) {
          vm.cars = value;
        },
        // Error
        function(reason) {
          console.log('Rest controller error: ' + reason);
          doModal('lg');
        }
      );
    }

    function doModal(size) {
      var cars = ['car1', 'car2', 'car3'];
      var modalInstance = $modal.open({
        animation: true,
        templateUrl: 'app/rest/rest-error-modal.html',
        controller: 'RestErrorModal as vm',
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
        vm.selected = selectedItem;
      }, function (reason) {
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

      $timeout(modalInstance.close('closed by tiemout'), 5000);

      $timeout(modalInstance.dismiss('closed by tiemout'), 10000);
    }
  }

})();
