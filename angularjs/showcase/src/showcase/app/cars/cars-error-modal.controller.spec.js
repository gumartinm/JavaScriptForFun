describe('app.cars', function() {
  'use strict';

  var cars = ['car1', 'car2', 'car3'];
  var $modalInstance = {
    close: jasmine.createSpy('modalInstance.close'),
    dismiss: jasmine.createSpy('modalInstance.dismiss')
  };
  var CarsErrorModal;

  beforeEach(function() {
    module('app.cars');

    inject(function($controller) {
      CarsErrorModal = $controller('CarsErrorModal', {
        $modalInstance: $modalInstance,
        cars: cars
      });
    });

  });

  describe('CarsErrorModal controller', function () {

    it('should invoke $modalInstance.close', function () {
      CarsErrorModal.ok();

      expect($modalInstance.close).toHaveBeenCalledWith('car1');
    });

    it('should invoke $modalInstance.dismiss', function () {
      CarsErrorModal.cancel();

      expect($modalInstance.dismiss).toHaveBeenCalledWith('cancel');
    });

  });

});
