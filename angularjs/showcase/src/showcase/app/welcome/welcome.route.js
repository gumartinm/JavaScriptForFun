(function() {
  'use strict';

  angular
    .module('app.welcome')
    .config(configure);

  /**
   * @ngdoc service
   * @name app.welcome.configure
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
  function configure($stateProvider, $urlRouterProvider) {
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
