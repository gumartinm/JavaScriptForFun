(function() {
  'use strict';

  angular
    .module('app')
    .config([
      '$stateProvider',
      '$urlRouterProvider',

      function($stateProvider, $urlRouterProvider) {
        var welcome = {
          url: '/welcome',
          templateUrl: 'app/welcome/welcome.html'
        };

        $urlRouterProvider.otherwise('app/welcome');
        $stateProvider.state('app.welcome', welcome);
      }
    ]);
}());