describe('app.cars', function() {
  'use strict';

  var cars = ['car1', 'car2', 'car3'];
  var $modalInstance = {
    close: jasmine.createSpy('modalInstance.close'),
    dismiss: jasmine.createSpy('modalInstance.dismiss')
  };
  var CarsErrorModalController;

  beforeEach(function() {
    module('app.cars');

    inject(function($controller) {
      CarsErrorModalController = $controller('CarsErrorModalController', {
        $modalInstance: $modalInstance,
        cars: cars
      });
    });

  });

  describe('CarsErrorModalController controller', function () {

    it('should invoke $modalInstance.close', function () {
      CarsErrorModalController.ok();

      expect($modalInstance.close).toHaveBeenCalledWith('car1');
    });

    it('should invoke $modalInstance.dismiss', function () {
      CarsErrorModalController.cancel();

      expect($modalInstance.dismiss).toHaveBeenCalledWith('cancel');
    });

  });

});
