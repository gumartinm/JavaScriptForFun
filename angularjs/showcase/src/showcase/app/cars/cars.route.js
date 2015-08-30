(function() {
  'use strict';

  angular
    .module('app.cars')
    .config(route);

  /**
   * @ngdoc service
   * @name app.cars.route
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
  function route($stateProvider, $urlRouterProvider) {
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
