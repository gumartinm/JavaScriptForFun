(function () {

  'use strict';

  /**
   * @ngdoc overview
   * @name app
   *
   * @requires app.core
   * @requires app.welcome
   * @requires app.cars
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

    /* Feature areas */
    'app.users'
  ]);

}());
