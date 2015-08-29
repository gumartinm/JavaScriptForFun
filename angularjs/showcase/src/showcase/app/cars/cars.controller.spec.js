describe('app.cars', function() {
  'use strict';

  var Cars;
  // Why the heck do I need this stupid object if it is going to be spied by means of Jasmine?
  var cars = {
    getAll: function() {
      return {};
    }
  };
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

    it('should invoke GET all cars in service: old fashionable way', function () {

      spyOn(cars, 'getAll')
        .and.callFake(function() {
          var deferred = $q.defer();
          return deferred.promise;
        });

      Cars.getCars();

      expect(cars.getAll).toHaveBeenCalled();
    });
  });

});

describe('app.cars', function() {
  'use strict';

  var Cars;
  // With object already implementing the required spy :)
  var cars = {
    getAll: jasmine.createSpy('cars.getAll').and.callFake(function() {
      return $q(function(resolve) {
        resolve();
      });
    })
  };
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

    it('should invoke GET all cars in service: alternative way', function () {

      Cars.getCars();

      expect(cars.getAll).toHaveBeenCalled();
    });
  });

});
