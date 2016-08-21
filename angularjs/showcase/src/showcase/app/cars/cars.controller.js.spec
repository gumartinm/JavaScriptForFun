describe('app.cars', function() {
  'use strict';

  var isSuccessCallBack = true;
  var onFulfilledValue = 'car1';
  var onRejectedValue = 'error';
  // Why the heck do I need this stupid object if it is going to be spied by means of Jasmine?
  // This is completely stupid and you will never see me doing something like this again!!!
  // In this case, IMHO it is better to inject the real service (using the inject function, see below)
  // and create as many spies as needed (and when there are required)
  var cars = {
    getAll: function() {
      return {};
    }
  };
  var CarsController;
  var $q;

  beforeEach(function() {
    module('app.cars');

    inject(function($controller, $uibModal, $timeout, _$q_) {
      CarsController = $controller('CarsController', {
        $uibModal: $uibModal,
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
  var $uibModal = {
    open: jasmine.createSpy('$uibModal.open')
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
        $uibModal: $uibModal,
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

      expect($uibModal.open).toHaveBeenCalled();
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

  // I have to inject cars service in CarsController. Declaring here the cars variable enables me to use
  // spies for this service in my tests. I do not create any stub, instead I will use the injected service by Jasmine
  // (see just below)
  var cars;

  var CarsController;
  var reason = 'error';
  var value = 'car1';

  beforeEach(function() {
    module('app.cars');

    inject(function($controller, $uibModal, $timeout, _$q_, _$rootScope_, _cars_) {
      cars = _cars_;
      CarsController = $controller('CarsController', {
        $uibModal: $uibModal,
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
