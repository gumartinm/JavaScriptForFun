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
        // a) Using success and error from promise. They are deprecated. DO NOT USE THEM!!!
        //    https://github.com/angular/angular.js/commit/a8f7e9cfde82ed7eaba3a868d8acafdf57f2d76f
        // .success(successAlternative)
        // .error(errorAlternative)
        // b) Using then from promise
        .then(success, error, notify)
        // catch will be called when there is no error function. In this case it will never be called
        // because we already have the error function.
        .catch(failed);
      // BE CAREFUL!!! If you use error function or catch, when there are errors the success method in the upper layer
      // (my Rest controller) will be ALWAYS called. It is as if because we caught errors in this layer they won't be
      // seen by the upper layers using this service :(
      // Alternative: return $q.reject from errors in this layer?

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
        return resp.data;
      }

      // DO NOT USE IT!!! This way has been deprecated.
      function successAlternative(data, status, headers, config) {
        $log.debug('XHR SuccessAlternative for getAll. SuccessAlternative, data: ' + data);
        $log.debug('XHR SuccessAlternative for getAll. SuccessAlternative, status: ' + status);
        $log.debug('XHR SuccessAlternative for getAll. SuccessAlternative, headers (it is a function): ' + headers);
        $log.debug('XHR SuccessAlternative for getAll. SuccessAlternative, config: ' + config);
      }

      function error(resp) {
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
        $log.debug('XHR Error for getAll. Error: ' + resp.data);

        // Should I return $q.reject instead? Right now, the success method in upper layers will always be called. :(
        return resp.data;
      }

      // DO NOT USE IT!!! This way has been deprecated.
      function errorAlternative(data, status, headers, config) {
        $log.debug('XHR ErrorAlternative for getAll. ErrorAlternative, data: ' + data);
        $log.debug('XHR ErrorAlternative for getAll. ErrorAlternative, status: ' + status);
        $log.debug('XHR ErrorAlternative for getAll. ErrorAlternative, headers (it is a function): ' + headers);
        $log.debug('XHR ErrorAlternative for getAll. ErrorAlternative, config: ' + config);
      }

      function notify(notification) {
        $log.debug('XHR Notification for getAll. Notification: ' + notification);
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
        $log.debug('XHR Failed for getAll. Reason: ' + reason);

        return reason.data;
      }
    }
  }

}());
