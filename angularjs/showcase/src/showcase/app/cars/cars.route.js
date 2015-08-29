(function() {
  'use strict';

  angular
    .module('app.cars')
    .config(configure);

  /**
   * @ngdoc service
   * @name app.cars.configure
   *
   * @requires $stateProvider
   * @requires $urlRouterProvider
   *
   * <p>
   * <br>
   * {@link http://angular-ui.github.io/ui-router/site/#/api/ui.router.state.$stateProvider $stateProvider} <br>
   * {@link http://angular-ui.github.io/ui-router/site/#/api/ui.router.router.$urlRouterProvider $urlRouterProvider}
   * </p>
   *
   *
   * @description
   * Router configuration for cars application.
   */
  /* @ngInject */
  function configure($stateProvider, $urlRouterProvider) {
    var state = 'cars';
    var config = {
      abstract: false,
      url: '/cars',
      templateUrl: 'app/cars/cars.html'
    };

    $urlRouterProvider.otherwise(state);
    $stateProvider.state(state, config);
  }
}());
