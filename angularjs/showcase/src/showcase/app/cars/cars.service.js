(function () {
  'use strict';

  angular
    .module('app.cars')
    .factory('cars', cars);

  /**
   * @ngdoc service
   * @name app.cars.cars
   *
   * @requires $http
   * @requires $q
   *
   * <p>
   * <br>
   * {@link https://docs.angularjs.org/api/ng/service/$http $http} <br>
   * {@link https://docs.angularjs.org/api/ng/service/$q $q}
   * </p>
   *
   * @description
   * cars service.
   */
  /* @ngInject */
  function cars($http, $q, API) {
    return {
      getAll: getAll
    };

    /**
     * @ngdoc method
     * @name  getAll
     * @methodOf app.cars.cars
     *
     * @description
     * Get cars from API REST.
     */
    function getAll() {
      return $http.get(API.CARS)
        // a) Using success and error from promise. They are deprecated because it is not the ES6 way. DO NOT USE THEM!
        //    https://github.com/angular/angular.js/commit/a8f7e9cfde82ed7eaba3a868d8acafdf57f2d76f
        // .success(successAlternative)
        // .error(errorAlternative)
        // b) Using then from promise. ES6 way.
        .then(success, error, notify)
        // Pattern: either use error callback or catch but not both of them as the same time!!!!
        // .catch(failed)
        .finally(finalizer);

      function success(resp) {
        /**
         * resp, object containing:
         *
         * config: Object
         *   headers: Object
         *     Accept: "application/json, text/plain, *!/!*"
         *   method: "GET"
         *   paramSerializer: ngParamSerializer(params)
         *   transformRequest: Array[1]
         *   transformResponse: Array[1]
         *   url: "/api/cars"
         * data: Array[3]
         *   0: Object
         *     content: "Car: 1"
         *     id: 4
         *   1: Object
         *     content: "Car: 2"
         *     id: 5
         *   length: 2
         * headers: function(name)
         * status: 200
         * statusText: "OK"
         */

        // In this way, then next chained promise will use just its success callback. :(
        // What means, promise will be resolved immediately!!! If it is what you want go ahead.
        // return resp.data;

        // Better return promise. :) Two options:

        // a) ES6 way (it doesn't have notify :(
        // return $q(function(resolve) {
        //  resolve(resp.data);
        // })

        // b) The CommonJS Promise way. It has the notify method (which I am not using here)
        var deferred = $q.defer();
        deferred.resolve(resp.data);
        return deferred.promise;
      }

      // DO NOT USE IT!!! This way has been deprecated because it is not the ES6 way.
      function successAlternative(data, status, headers, config) {
        console.log('XHR SuccessAlternative for getAll. SuccessAlternative, data: ' + data);
        console.log('XHR SuccessAlternative for getAll. SuccessAlternative, status: ' + status);
        console.log('XHR SuccessAlternative for getAll. SuccessAlternative, headers (it is a function): ' + headers);
        console.log('XHR SuccessAlternative for getAll. SuccessAlternative, config: ' + config);
      }

      function error(reason) {
        /**
         * resp, object containing:
         *
         * config: Object
         *   headers: Object
         *     Accept: "application/json, text/plain, *!/!*"
         *   method: "GET"
         *   paramSerializer: ngParamSerializer(params)
         *   transformRequest: Array[1]
         *   transformResponse: Array[1]
         *   url: "/api/cars"
         * data: "Error: connect ECONNREFUSED"
         * headers: function(name)
         * status: 500
         * statusText: "Internal Server Error"
         */
        console.log('XHR Error for getAll. Error: ' + reason.data);

        // In this way, then next chained promise will use just its success callback. :(
        // What means, promise will be resolved immediately!!! If it is what you want go ahead.
        // return reason.data;

        // Better return promise. :) Three options:

        // a) ES6 way, it doesn't have notify :(
        // return $q(function(resolve, reject) {
        //  reject(reason.data);
        // })

        // b) The CommonJS Promise way. It has the notify method (which I am not using here)
        // var deferred = $q.defer();
        // deferred.reject(reason.data);
        // return deferred.promise;

        // c) The CommonJS Promise way. The same as b) but with less code :)
        return $q.reject(reason.data);
      }

      // DO NOT USE IT!!! This way has been deprecated because it is not the ES6 way.
      function errorAlternative(data, status, headers, config) {
        console.log('XHR ErrorAlternative for getAll. ErrorAlternative, data: ' + data);
        console.log('XHR ErrorAlternative for getAll. ErrorAlternative, status: ' + status);
        console.log('XHR ErrorAlternative for getAll. ErrorAlternative, headers (it is a function): ' + headers);
        console.log('XHR ErrorAlternative for getAll. ErrorAlternative, config: ' + config);
      }

      function notify(notification) {
        console.log('XHR Notification for getAll. Notification: ' + notification);
      }

      function failed(reason) {
        /**
         * reason, object containing (the same as resp object for error function):
         *
         * config: Object
         *   headers: Object
         *     Accept: "application/json, text/plain, *!/!*"
         *   method: "GET"
         *   paramSerializer: ngParamSerializer(params)
         *   transformRequest: Array[1]
         *   transformResponse: Array[1]
         *   url: "/api/cars"
         * data: "Error: connect ECONNREFUSED"
         * headers: function(name)
         * status: 500
         * statusText: "Internal Server Error"
         */
        console.log('XHR Failed for getAll. Reason: ' + reason);

        // In this way, then next chained promise will use just its success callback.
        // What means, promise will be resolved immediately!!! If it is what you want go ahead.
        // return reason.data;

        // Better return promise. :) Three options:

        // a) ES6 way, it doesn't have notify :(
        // return $q(function(resolve, reject) {
        //  reject(reason.data);
        // })

        // b) The CommonJS Promise way. It has the notify method (which I am not using here)
        // var deferred = $q.defer();
        // deferred.reject(reason.data);
        // return deferred.promise;

        // c) The CommonJS Promise way. The same as b) but with less code :)
        return $q.reject(reason.data);

      }

      function finalizer() {
        // This callback doesn't have any input parameter :(
        console.log('XHR Finalizer for getAll.');
      }
    }
  }

}());
