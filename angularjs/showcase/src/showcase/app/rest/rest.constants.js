(function () {
  'use strict';

  var prefix = '/';

  angular
    .module('app.rest')
    .constant('API', {
      CARS: prefix + 'api/cars',
      CAR: prefix + 'api/cars/:carId'
    });

})();
