(function() {
  'use strict';

  angular
    .module('app.welcome')
    .config(configure);

  /**
   * @ngdoc object
   * @name app.welcome.$configure
   *
   * @requires $stateProvider
   * @requires $urlRouterProvider
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
