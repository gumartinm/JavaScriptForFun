(function () {
  'use strict';

  angular
    .module('app.rest')
    .factory('cars', cars);

  /**
   * @ngdoc service
   * @name app.rest.cars
   *
   * @requires $http
   * @requires $log
   *
   * <p>
   * <br>
   * {@link https://docs.angularjs.org/api/ng/service/$http $http} <br>
   * {@link https://docs.angularjs.org/api/ng/service/$log $log}
   * </p>
   *
   * @description
   * Rest service.
   */
  /* @ngInject */
  function cars($http, $log, API) {
    return {
      getAll: getAll
    };

    /**
     * @ngdoc method
     * @name  getAll
     * @methodOf app.rest.cars
     *
     * @description
     * Get cars from API REST.
     */
    function getAll() {
      return $http.get(API.CARS)
        .then(getAllCompleted)
        .catch(getAllFailed);

      function getAllCompleted(response) {
        return response.data.results;
      }

      function getAllFailed(error) {
        $log.debug('XHR Failed for sendData.' + error.data);
      }
    }
  }

}());
