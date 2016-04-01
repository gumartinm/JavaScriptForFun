(function() {
  'use strict';

  angular
    .module('app.example')
    .config(route);

  /**
   * @ngdoc service
   * @name app.example.route
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
   * Router configuration for example application.
   */
  /* @ngInject */
  function route($stateProvider, $urlRouterProvider) {
    var state = 'example';
    var config = {
      abstract: false,
      url: '/example',
      templateUrl: 'app/example/example.html'
    };

    $urlRouterProvider.otherwise(state);
    $stateProvider.state(state, config);
  }
}());
