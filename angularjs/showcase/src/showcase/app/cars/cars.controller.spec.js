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
  var CarsController;
  var $q;

  beforeEach(function() {
    module('app.cars');

    inject(function($controller, $modal, $timeout, _$q_) {
      CarsController = $controller('CarsController', {
        $modal: $modal,
        $timeout: $timeout,
        cars: cars
      });
      $q = _$q_;
    });
  });

  describe('CarsController', function () {

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

      CarsController.getCars();

      expect(cars.getAll).toHaveBeenCalled();
      expect(CarsController.cars).toEqual(onFulfilledValue);
    });
  });

});

// I AM BEGINNING TO DISLIKE THIS WAY OF TESTING thenables.
// I PREFER THE WAY USING $scope.$apply/$scope.$digest/$rootScope.$apply
// SEE AT THE END THE WAY I THINK IS THE NICEST. THERE IS WAY LESS CODE AND IT IS MORE READEABLE!!!

// GO TO THE END WHERE THERE ARE TESTS USING $scope.$apply() THEY ARE BETTER TESTS THAN THE ONES
// HERE MOCKING THE then METHOD. THIS WAY REQUIRES TOO MUCH CODE AND IT IS NOT READEABLE :(
// GO TO THE BOTTOM FOR THE COOL WAY OF TESTING THIS STUFF :)
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
  var $modalInstance = {
    close: jasmine.createSpy('$modalInstance.close'),
    dismiss: jasmine.createSpy('$modalInstance.dismiss'),
    result: {
      then: jasmine.createSpy('$modalInstance.result.then')
        .and.callFake(function(successCallback, errorCallback) {
          if (isSuccessCallBack) {
            successCallback(onFulfilledValue);
          } else {
            errorCallback(onRejectedValue);
          }
        })
    },
    opened: {
      then: jasmine.createSpy('$modalInstance.opened.then')
        .and.callFake(function(successCallback, errorCallback) {
          if (isSuccessCallBack) {
            successCallback(onFulfilledValue);
          } else {
            errorCallback(onRejectedValue);
          }
        })
    },
    rendered: {
      then: jasmine.createSpy('$modalInstance.rendered.then')
        .and.callFake(function(successCallback, errorCallback) {
          if (isSuccessCallBack) {
            successCallback(onFulfilledValue);
          } else {
            errorCallback(onRejectedValue);
          }
        })
    }
  };
  var $modal = {
    open: jasmine.createSpy('$modal.open')
      .and.callFake(function() {
        return $modalInstance;
      })
  };
  var $timeout;
  var CarsController;
  var $q;

  beforeEach(function() {
    module('app.cars');

    inject(function($controller, _$timeout_, _$q_) {
      CarsController = $controller('CarsController', {
        $modal: $modal,
        $timeout: _$timeout_,
        cars: cars
      });
      $q = _$q_;
      $timeout = _$timeout_;
    });
  });

  describe('CarsController', function () {

    it('should invoke GET all cars in service with success: alternative way', function () {

      CarsController.getCars();

      expect(cars.getAll).toHaveBeenCalled();
      expect(CarsController.cars).toEqual(onFulfilledValue);
    });

    it('should invoke GET all cars in service with error: alternative way', function () {
      isSuccessCallBack = false;
      spyOn(CarsController, 'doModal')
        .and.callFake(function() {
          return {};
        });

      CarsController.getCars();

      expect(cars.getAll).toHaveBeenCalled();
      expect(CarsController.doModal).toHaveBeenCalled();

      isSuccessCallBack = true;
    });

    it('should invoke $modal.open', function () {

      CarsController.doModal('lg');

      expect($modal.open).toHaveBeenCalled();
    });

    it('should invoke $modalInstance.result with success', function () {

      CarsController.doModal('lg');

      expect($modalInstance.result.then).toHaveBeenCalled();
      expect(CarsController.selected).toEqual(onFulfilledValue);
    });

    it('should invoke $modalInstance.result with error', function () {
      isSuccessCallBack = false;

      CarsController.doModal('lg');

      expect($modalInstance.result.then).toHaveBeenCalled();

      isSuccessCallBack = true;
    });

    it('should invoke $modalInstance.opened with success', function () {

      CarsController.doModal('lg');

      expect($modalInstance.opened.then).toHaveBeenCalled();

    });

    it('should invoke $modalInstance.opened with error', function () {
      isSuccessCallBack = false;

      CarsController.doModal('lg');

      expect($modalInstance.opened.then).toHaveBeenCalled();

      isSuccessCallBack = true;
    });

    it('should invoke $modalInstance.rendered with success', function () {

      CarsController.doModal('lg');

      expect($modalInstance.rendered.then).toHaveBeenCalled();

    });

    it('should invoke $modalInstance.rendered with error', function () {
      isSuccessCallBack = false;

      CarsController.doModal('lg');

      expect($modalInstance.rendered.then).toHaveBeenCalled();

      isSuccessCallBack = true;
    });

    it('should invoke $modalInstance.close because of timeout', function () {

      CarsController.doModal('lg');
      $timeout.flush();

      expect($modalInstance.close).toHaveBeenCalledWith('closed by timeout');

    });

    it('should invoke $modalInstance.dismiss because of timeout', function () {

      CarsController.doModal('lg');
      $timeout.flush();

      expect($modalInstance.dismiss).toHaveBeenCalledWith('dismissed by timeout');

    });

  });

});

describe('app.cars', function() {
  'use strict';

  var $rootScope;
  var $scope;
  var $q;
  var reason = 'error';
  var value = 'car1';
  var cars = {
    getAll: function() {
      return {};
    }
  };
  var CarsController;

  beforeEach(function() {
    module('app.cars');

    inject(function($controller, $modal, $timeout, _$q_, _$rootScope_) {
      CarsController = $controller('CarsController', {
        $modal: $modal,
        $timeout: $timeout,
        cars: cars
      });
      $rootScope = _$rootScope_;
      $q = _$q_;
      $scope = $rootScope.$new();
    });
  });

  describe('CarsController', function () {

    it('should invoke GET all cars in service with success: using digest/apply', function () {
      spyOn(cars, 'getAll')
        .and.returnValue($q.resolve(value));

      CarsController.getCars();

      $scope.$apply();

      expect(cars.getAll).toHaveBeenCalled();
      expect(CarsController.cars).toEqual(value);
    });

    it('should invoke GET all cars in service with error: using digest/apply', function () {
      spyOn(cars, 'getAll')
        .and.returnValue($q.reject(reason));
      spyOn(CarsController, 'doModal')
        .and.callFake(function() {
          return {};
        });

      CarsController.getCars();

      $scope.$apply();

      expect(cars.getAll).toHaveBeenCalled();
      expect(CarsController.doModal).toHaveBeenCalled();
    });

  });

});
