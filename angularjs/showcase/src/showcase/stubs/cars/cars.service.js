(function () {
  'use strict';

  angular
    .module('app.stubs')
    .factory('carsStub', carsStub);

  /* @ngInject */
  function carsStub($httpBackend, API) {
    return {
      register: register
    };

    function register() {
      $httpBackend.whenGET(API.CARS).respond(getAll);

      function getAll() {
        return [
          {id:1, content: 'Car: 1'},
          {id:2, content: 'Car: 2'},
          {id:3, content: 'Car: 3'}
        ];
      }
    }
  }

}());
