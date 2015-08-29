(function () {
  'use strict';

  var prefix = '/';

  angular
    .module('app.cars')
    .constant('API', {
      CARS: prefix + 'api/cars',
      CAR: prefix + 'api/cars/:carId'
    });

})();
