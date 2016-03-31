(function() {
  'use strict';

  angular
    .module('app.users')
    .config(route);

  /**
   * @ngdoc service
   * @name app.users.route
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
   * Router configuration for users application.
   */
  /* @ngInject */
  function route($stateProvider, $urlRouterProvider) {
    var state = 'users';
    var config = {
      abstract: false,
      url: '/users',
      templateUrl: 'app/users/users.html'
    };

    $urlRouterProvider.otherwise(state);
    $stateProvider.state(state, config);
  }
}());
