(function() {
  'use strict';

  angular
    .module('app')
    .config([
      '$stateProvider',
      '$urlRouterProvider',

      function($stateProvider, $urlRouterProvider) {
        var welcome = {
          abstract: false,
          url: '/welcome',
          templateUrl: 'app/welcome/welcome.html'
        };

        $urlRouterProvider.otherwise('welcome');
        $stateProvider.state('welcome', welcome);
      }
    ]);
}());