(function() {
  'use strict';

  angular
    .module('app.rest')
    .config(configure);

  /**
   * @ngdoc service
   * @name app.rest.configure
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
   * Router configuration for rest application.
   */
  /* @ngInject */
  function configure($stateProvider, $urlRouterProvider) {
    var state = 'rest';
    var config = {
      abstract: false,
      url: '/rest',
      templateUrl: 'app/rest/rest.html'
    };

    $urlRouterProvider.otherwise(state);
    $stateProvider.state(state, config);
  }
}());
