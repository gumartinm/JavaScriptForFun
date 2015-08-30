(function () {

  'use strict';

  angular
    .module('app.stubs')
    .run('register', register);

  /* @ngInject */
  function register(carsStub) {
    carsStub.register();
  }

}());
