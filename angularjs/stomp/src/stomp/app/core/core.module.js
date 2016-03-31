(function() {
  'use strict';

  /**
   * @ngdoc overview
   * @name app.core
   *
   * @requires ui.router
   * @requires ui.bootstrap
   * @requires ui.bootstrap.modal
   *
   * @description
   * # app.core
   *
   * ## core module for the current application
   * Shared modules across the whole application will be located in the app.core module.
   */
  angular.module('app.core', [
    /* 3rd-party modules */
    'ui.router',
    'ui.bootstrap',
    'ui.bootstrap.modal'
  ]);

})();
