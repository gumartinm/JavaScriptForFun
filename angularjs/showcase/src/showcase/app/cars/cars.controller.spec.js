describe('app.cars', function() {
  'use strict';

  var isSuccessCallBack = true;
  var onFulfilledValue = 'car1';
  var onRejectedValue = 'error';
  // Why the heck do I need this stupid object if it is going to be spied by means of Jasmine?
  var cars = {
    getAll: function() {
      return {};
    }
  };
  var Cars;
  var $q;

  beforeEach(function() {
    module('app.cars');

    inject(function($controller, $modal, $timeout, _$q_) {
      Cars = $controller('Cars', {
        $modal: $modal,
        $timeout: $timeout,
        cars: cars
      });
      $q = _$q_;
    });
  });

  describe('Cars controller', function () {

    it('should invoke GET all cars in service with success: old fashionable way', function () {

      spyOn(cars, 'getAll')
        .and.callFake(function() {
          return {
            then: function (successCallback, errorCallback) {
              if (isSuccessCallBack) {
                successCallback(onFulfilledValue);
              } else {
                errorCallback(onRejectedValue);
              }
            }
          };
        });

      Cars.getCars();

      expect(cars.getAll).toHaveBeenCalled();
      expect(Cars.cars).toEqual(onFulfilledValue);
    });
  });

});

describe('app.cars', function() {
  'use strict';

  var isSuccessCallBack = true;
  var onFulfilledValue = 'car1';
  var onRejectedValue = 'error';
  // With object already implementing the required spy :)
  var cars = {
    getAll: jasmine.createSpy('cars.getAll')
      .and.callFake(function() {
        return {
          then: function (successCallback, errorCallback) {
            if (isSuccessCallBack) {
              successCallback(onFulfilledValue);
            } else {
              errorCallback(onRejectedValue);
            }
          }
        };
      })
  };
  var Cars;
  var $q;

  beforeEach(function() {
    module('app.cars');

    inject(function($controller, $modal, $timeout, _$q_) {
      Cars = $controller('Cars', {
        $modal: $modal,
        $timeout: $timeout,
        cars: cars
      });
      $q = _$q_;
    });
  });

  describe('Cars controller', function () {

    it('should invoke GET all cars in service with success: alternative way', function () {

      Cars.getCars();

      expect(cars.getAll).toHaveBeenCalled();
      expect(Cars.cars).toEqual(onFulfilledValue);
    });

    it('should invoke GET all cars in service with error: alternative way', function () {

      isSuccessCallBack = false;
      spyOn(Cars, 'doModal')
        .and.callFake(function() {
          return {};
        });

      Cars.getCars();

      expect(cars.getAll).toHaveBeenCalled();
      expect(Cars.doModal).toHaveBeenCalled();
    });

  });

});
