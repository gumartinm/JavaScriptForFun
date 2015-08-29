describe('app.cars', function() {
  'use strict';

  describe('state', function() {
    var view = {
      cars: 'app/cars/cars.html'
    };
    var $state;

    beforeEach(function() {
      module('app.cars');

      inject(function(_$state_) {
        $state = _$state_;
      });
    });

    it('should map /cars route to cars View template', function() {
      expect($state.get('cars').templateUrl). toEqual(view.cars);
    });

  });

});
