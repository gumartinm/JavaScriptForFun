(function() {
  'use strict';

  angular
    .module('app.welcome')
    .config(route);

  /**
   * @ngdoc service
   * @name app.welcome.route
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
   * Router configuration for welcome application.
   */
  /* @ngInject */
  function route($stateProvider, $urlRouterProvider) {
    var state = 'welcome';
    var config = {
      abstract: false,
      url: '/welcome',
      templateUrl: 'app/welcome/welcome.html'
    };

    $urlRouterProvider.otherwise(state);
    $stateProvider.state(state, config);
  }
}());
