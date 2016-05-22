(function() {
  'use strict';

  angular
    .module('app.shared-stomp')
    .config(route);

  /**
   * @ngdoc service
   * @name app.shared-stomp.route
   *
   * @requires $stateProvider
   *
   * <p>
   * <br>
   * {@link http://angular-ui.github.io/ui-router/site/#/api/ui.router.state.$stateProvider $stateProvider} <br>
   * </p>
   *
   *
   * @description
   * Router configuration for Shared Worker STOMP application.
   */
  /* @ngInject */
  function route($stateProvider) {
    var state = 'shared-stomp';
    var config = {
      abstract: false,
      url: '/shared-stomp',
      templateUrl: 'app/shared-stomp/shared-stomp.html'
    };

    $stateProvider.state(state, config);
  }
}());
