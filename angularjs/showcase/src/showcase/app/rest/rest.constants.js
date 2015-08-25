(function () {
  'use strict';

  var prefix = 'http://localhost:8080/';

  angular
    .module('app.rest')
    .constant('API', {
      CARS: prefix + 'api/cars',
      CAR: prefix + 'api/cars/:carId'
    });

})();
