(function () {

  'use strict';

  /**
   * @ngdoc overview
   * @name app
   *
   * @requires app.core
   * @requires app.users
   *
   * @description
   * # app
   *
   * ## Main module for the current application
   * There are several sub-modules included with the app module.
   */
  angular.module('app', [
    /* Shared modules */
    'app.core',
    'app.widgets',

    /* Feature areas */
    'app.example'
  ]);

}());
