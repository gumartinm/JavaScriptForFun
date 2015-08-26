describe('app.rest', function() {
  'use strict';

  var Rest;
  var cars = {
    getAll: function() {
      return {};
    }
  };
  var $q;

  beforeEach(function() {
    module('app.rest');

    inject(function($controller, $location, _$q_) {
      Rest = $controller('Rest', {
        $location: $location,
        cars: cars
      });
      $q = _$q_;
    });
  });

  describe('Rest controller', function () {

    it('should invoke GET all cars in service', function () {

      spyOn(cars, 'getAll')
        .and.callFake(function() {
          var deferred = $q.defer();
          return deferred.promise;
        });

      Rest.getCars();

      expect(cars.getAll).toHaveBeenCalled();
    });
  });

});
