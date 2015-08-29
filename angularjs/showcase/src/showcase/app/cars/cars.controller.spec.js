describe('app.cars', function() {
  'use strict';

  var Cars;
  var cars = {
    getAll: function() {
      return {};
    }
  };
  var $q;

  beforeEach(function() {
    module('app.cars');

    inject(function($controller, $location, _$q_) {
      Cars = $controller('Cars', {
        $location: $location,
        cars: cars
      });
      $q = _$q_;
    });
  });

  describe('Cars controller', function () {

    it('should invoke GET all cars in service', function () {

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
